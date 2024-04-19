import React, { use, useEffect, useState } from "react";

interface ISpeechSynthesisComponentProps {
    textToSpeak: string;
}

const AISpeech: React.FC<ISpeechSynthesisComponentProps> = ({ textToSpeak }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {

        const speak = (text: string) => {
            if(speechSynthesis.speaking){
                console.log('Already speaking...');
                return;
            }

            if(text !== ''){
                const speechUtterance = new SpeechSynthesisUtterance(text);
                speechUtterance.onend = () => {
                    setIsSpeaking(false);
                    console.log('Speech has ended...');
                };
                speechUtterance.onerror = (error) => {
                    setIsSpeaking(false);
                    console.error('Error occurred while speaking...', error);
                };
                setIsSpeaking(true);
                speechUtterance.lang = 'en-US';
                speechSynthesis.speak(speechUtterance);
            }
        };

        if(textToSpeak){
            speak(textToSpeak);
        
        }
    }, [textToSpeak]);

    return (
        <div>
            {isSpeaking ? <p>Speaking...</p> : <p>Waiting...</p>}
        </div>
    )
};

export default AISpeech;