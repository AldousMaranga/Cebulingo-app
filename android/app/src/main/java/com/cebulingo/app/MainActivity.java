package com.cebulingo.app;

import android.Manifest;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.speech.tts.TextToSpeech;
import android.text.TextUtils;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;
import java.util.ArrayList;
import java.util.Locale;
import org.json.JSONObject;

public class MainActivity extends BridgeActivity implements TextToSpeech.OnInitListener {
    private ActivityResultLauncher<String> audioPermissionLauncher;
    private ActivityResultLauncher<Intent> speechRecognizerLauncher;
    private String pendingSpeechSessionId;
    private String pendingSpeechLanguage = "fil-PH";
    private TextToSpeech textToSpeech;
    private boolean isTextToSpeechReady = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        audioPermissionLauncher = registerForActivityResult(
            new ActivityResultContracts.RequestPermission(),
            isGranted -> {
                if (isGranted) {
                    launchSpeechRecognizerIntent();
                } else {
                    dispatchSpeechEvent("error", pendingSpeechSessionId, "", "Microphone permission was denied.");
                }
            }
        );

        speechRecognizerLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getResultCode() == Activity.RESULT_OK && result.getData() != null) {
                    ArrayList<String> matches = result.getData().getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    String transcript = (matches != null && !matches.isEmpty()) ? matches.get(0) : "";

                    if (TextUtils.isEmpty(transcript)) {
                        dispatchSpeechEvent("error", pendingSpeechSessionId, "", "No speech was detected. Please try again.");
                    } else {
                        dispatchSpeechEvent("result", pendingSpeechSessionId, transcript, "");
                    }
                } else {
                    dispatchSpeechEvent("error", pendingSpeechSessionId, "", "Listening was cancelled.");
                }
            }
        );

        super.onCreate(savedInstanceState);

        textToSpeech = new TextToSpeech(this, this);

        if (getBridge() != null && getBridge().getWebView() != null) {
            WebSettings settings = getBridge().getWebView().getSettings();
            settings.setMediaPlaybackRequiresUserGesture(false);
            getBridge().getWebView().addJavascriptInterface(new NativeSpeechBridge(), "NativeSpeech");
            getBridge().getWebView().addJavascriptInterface(new NativeTtsBridge(), "NativeTTS");
        }
    }

    @Override
    public void onInit(int status) {
        isTextToSpeechReady = status == TextToSpeech.SUCCESS;
    }

    @Override
    public void onDestroy() {
        if (textToSpeech != null) {
            textToSpeech.stop();
            textToSpeech.shutdown();
            textToSpeech = null;
        }

        super.onDestroy();
    }

    private void startNativeSpeechRecognition(String sessionId, String languageTag) {
        pendingSpeechSessionId = sessionId;
        pendingSpeechLanguage = TextUtils.isEmpty(languageTag) ? "fil-PH" : languageTag;

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED) {
            launchSpeechRecognizerIntent();
        } else {
            audioPermissionLauncher.launch(Manifest.permission.RECORD_AUDIO);
        }
    }

    private void launchSpeechRecognizerIntent() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, pendingSpeechLanguage);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, pendingSpeechLanguage);
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Speak your Bisaya answer");

        try {
            speechRecognizerLauncher.launch(intent);
        } catch (ActivityNotFoundException error) {
            dispatchSpeechEvent("error", pendingSpeechSessionId, "", "Speech recognition is not available on this Android device.");
        }
    }

    private void dispatchSpeechEvent(String type, String sessionId, String transcript, String message) {
        final String safeSessionId = sessionId == null ? "" : sessionId;
        final String safeTranscript = transcript == null ? "" : transcript;
        final String safeMessage = message == null ? "" : message;

        pendingSpeechSessionId = null;

        runOnUiThread(() -> {
            if (getBridge() == null || getBridge().getWebView() == null) {
                return;
            }

            String detail = String.format(
                Locale.US,
                "{type:%s,sessionId:%s,transcript:%s,message:%s}",
                JSONObject.quote(type),
                JSONObject.quote(safeSessionId),
                JSONObject.quote(safeTranscript),
                JSONObject.quote(safeMessage)
            );
            String js = "window.dispatchEvent(new CustomEvent('cebulingo-native-speech',{detail:" + detail + "}));";
            getBridge().getWebView().evaluateJavascript(js, null);
        });
    }

    public class NativeSpeechBridge {
        @JavascriptInterface
        public boolean isAvailable() {
            Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
            return intent.resolveActivity(getPackageManager()) != null;
        }

        @JavascriptInterface
        public void startListening(String sessionId, String languageTag) {
            runOnUiThread(() -> startNativeSpeechRecognition(sessionId, languageTag));
        }

        @JavascriptInterface
        public void cancel() {
            dispatchSpeechEvent("error", pendingSpeechSessionId, "", "Listening was cancelled.");
        }
    }

    public class NativeTtsBridge {
        @JavascriptInterface
        public boolean isAvailable() {
            return isTextToSpeechReady && textToSpeech != null;
        }

        @JavascriptInterface
        public void speak(String text, String languageTag) {
            if (!isTextToSpeechReady || textToSpeech == null || TextUtils.isEmpty(text)) {
                return;
            }

            Locale locale = TextUtils.isEmpty(languageTag)
                ? Locale.forLanguageTag("fil-PH")
                : Locale.forLanguageTag(languageTag);

            try {
                int languageResult = textToSpeech.setLanguage(locale);
                if (languageResult == TextToSpeech.LANG_MISSING_DATA || languageResult == TextToSpeech.LANG_NOT_SUPPORTED) {
                    textToSpeech.setLanguage(Locale.getDefault());
                }
            } catch (Exception ignored) {
                textToSpeech.setLanguage(Locale.getDefault());
            }

            textToSpeech.stop();
            textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, null, "cebulingo-tts");
        }

        @JavascriptInterface
        public void stop() {
            if (textToSpeech != null) {
                textToSpeech.stop();
            }
        }
    }
}
