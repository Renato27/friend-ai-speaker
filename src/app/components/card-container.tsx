'use client';
import { Card } from 'antd';
import Image from 'next/image';
import RecordingButton from './record-button';
import './card-container.css';
import { useState } from 'react';
import AIIntegration from './ai-integration';

const CardContainer = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [textToAnswer, setTextToAnswer] = useState('');

  return (
    <div className='card-container'>
      <Card
        styles={{ header: { padding: 0, overflow: 'hidden', position: 'relative' } }}
        title={
          <div className='image-container'>
            <Image src="/images/avatar18.gif" alt="Avatar" layout="fill" objectFit='cover' />
          </div>
        }
        bordered={false}
      >
        <p>{isRecording ? 'Recording...' : 'Pressione o botão para iniciar a gravação.'}</p>
        <RecordingButton setIsRecording={setIsRecording} setTextToAnswer={setTextToAnswer}/>
        <AIIntegration textToAnswer={textToAnswer}/>
      </Card>
    </div>

  );
}

export default CardContainer;