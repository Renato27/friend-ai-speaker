import React, { useEffect, useState } from "react";
import AISpeech from "./ai-speech";
import TextArea from "antd/es/input/TextArea";

interface AIIntegrationProps {
    textToAnswer: string;
}

const AIIntegration: React.FC<AIIntegrationProps> = ({ textToAnswer }) => {
    const [textToSpeak, setTextToSpeak] = useState('');

    useEffect(() => {
        if (textToAnswer) {
            const handleSendMessage = async () => {
                const response = await fetch('/api/openai-integration', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ textToAnswer }),
                });
        
                if (!response.ok) {
                    setTextToSpeak('Sorry, I could not understand you. Please try again.');
                    return;
                }
        
                const data = await response.json();
                console.log(data);
                setTextToSpeak(data);
            };

            handleSendMessage();
        }
    }, [textToAnswer]);


    return (
        <div>
            <TextArea
                rows={10}
                cols={50}
                value={textToSpeak}
            />
            <AISpeech textToSpeak={textToSpeak} />
        </div>
    );
};

export default AIIntegration;