import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env['NEXT_PUBLIC_OPEN_AI_TOKEN'] || '',
  });

const prompt = `Imagine you are an approachable English teacher who is also a friend. 
You are conversing with a student who is practicing their English skills. 
Provide friendly guidance, correct any mistakes, and offer explanations in a supportive and encouraging tone. 
When the student sends you a message, respond as if you are having a casual yet educational conversation, 
helping them to improve their English in a relaxed and friendly manner.
`;

export default async function getAwnsers(req: NextApiRequest, res: NextApiResponse) {
    try {
        const text = req.body.textToAnswer;

        const response = await client.chat.completions.create({
            model: 'gpt-4',
            temperature: 0.7,
            messages: [
                {
                    role: 'system',
                    content: prompt
                },
                {
                    role: 'user',
                    content: text
                }
            ]
        });

        if(response.choices.length < 0) res.status(400).json('Sorry, I could not understand you. Please try again.');

        const content = response.choices[0].message.content;
        res.status(200).json(content);
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: 'Error communicating with OpenAI' });
    }
}
