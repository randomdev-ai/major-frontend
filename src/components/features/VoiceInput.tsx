import React, { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { useVoiceInput } from '../../hooks/useVoiceInput';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript }) => {
  const { transcript, isListening, supported, start, stop } = useVoiceInput();
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(transcript);
    onTranscript(transcript);
  }, [transcript, onTranscript]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-800">Voice input</p>
          <p className="text-xs text-slate-500">
            {supported ? 'Allow microphone access to dictate symptoms.' : 'Voice input not supported.'}
          </p>
        </div>
        {supported && (
          <Button variant={isListening ? 'secondary' : 'ghost'} onClick={isListening ? stop : start}>
            {isListening ? 'Stop' : 'Start'}
          </Button>
        )}
      </div>
      <textarea
        className="mt-3 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"
        rows={3}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          onTranscript(event.target.value);
        }}
        placeholder="Voice transcript appears here..."
      />
    </div>
  );
};

export default VoiceInput;
