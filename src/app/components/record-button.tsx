import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './record-button.css';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';

interface RecordingButtonProps {
  setIsRecording: (isRecording: boolean) => void;
  setTextToAnswer: (text: string) => void;
}

const RecordingButton: React.FC<RecordingButtonProps> = ({setIsRecording, setTextToAnswer}) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [isBrowserSupported, setIsBrowserSupported] = useState(false);
  const [time, setTime] = useState(0);

  const startListening = () => SpeechRecognition.startListening({
    continuous: true,
    language: 'en-US'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if(listening){
        setTime(time + 1);
      }
    }, 1000);

    console.log('Time:', time);

    if(time >= 5 && !listening){
      console.log('Speech has stopped by timeout');
      SpeechRecognition.stopListening();
      setTextToAnswer(transcript);
      resetTranscript();
      setIsRecording(false);
    }

    return () => clearInterval(interval);
  });

  useEffect(() => {
    setIsBrowserSupported(browserSupportsSpeechRecognition);

    if (browserSupportsSpeechRecognition) {
      const recognition = SpeechRecognition.getRecognition();

      if (!recognition) return;
    
      recognition.onspeechend = () => {
        console.log('Speech has stopped being detected');
        SpeechRecognition.stopListening();
        setTextToAnswer(transcript);
        resetTranscript();
        setIsRecording(false);
      };
    
      recognition.onspeechstart = () => {
        console.log('Speech has been detected');
        setIsRecording(true);
      };
    }


  }, [browserSupportsSpeechRecognition, resetTranscript, setIsRecording, setTextToAnswer, transcript]);

  if (!isBrowserSupported) {
    return <span>Your browser does not support voice</span>;
  }

  return (
    <>
      <div>
        <button
          className={`recordingButton ${listening ? 'recording' : ''}`}
          onClick={startListening}>
        </button>
      </div>
      <TextArea rows={10} cols={50} value={`\n${transcript}`} />
    </>


  );
};

export default RecordingButton;