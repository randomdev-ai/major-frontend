import { useEffect, useMemo, useState } from 'react';

interface VoiceInputHook {
  transcript: string;
  isListening: boolean;
  supported: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export const useVoiceInput = (): VoiceInputHook => {
  const SpeechRecognition = (window as typeof window & { webkitSpeechRecognition?: typeof SpeechRecognition })
    .webkitSpeechRecognition;
  const supported = Boolean(SpeechRecognition);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  const recognition = useMemo(() => {
    if (!supported) return null;
    const instance = new SpeechRecognition();
    instance.continuous = true;
    instance.interimResults = true;
    instance.lang = 'en-US';
    return instance;
  }, [supported, SpeechRecognition]);

  useEffect(() => {
    if (!recognition) return undefined;

    const handleResult = (event: SpeechRecognitionEvent) => {
      const full = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' ');
      setTranscript(full);
    };

    const handleEnd = () => setIsListening(false);

    recognition.addEventListener('result', handleResult);
    recognition.addEventListener('end', handleEnd);

    return () => {
      recognition.removeEventListener('result', handleResult);
      recognition.removeEventListener('end', handleEnd);
      recognition.stop();
    };
  }, [recognition]);

  const start = () => {
    if (!recognition) return;
    recognition.start();
    setIsListening(true);
  };

  const stop = () => {
    if (!recognition) return;
    recognition.stop();
    setIsListening(false);
  };

  const reset = () => setTranscript('');

  return { transcript, isListening, supported, start, stop, reset };
};
