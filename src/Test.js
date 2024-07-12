import React, { useEffect } from 'react';
import { ChatOpenAI } from '@langchain/openai';
import { ConversationChain } from 'langchain/chains';

const apiKey = 'api key';
const chatModel = new ChatOpenAI({ openAIApiKey: apiKey });

const conversationChain = new ConversationChain({
  llm: chatModel,
  verbose: true,
});

const messages = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: '오늘 날씨 어때?' },
];

export default function Test() {
  useEffect(() => {
    async function runConversation() {
      for (const message of messages) {
        try {
          const response = await conversationChain.call(message);
          console.log(`User: ${message.content}`);
          console.log(`Assistant: ${response.content}`);
        } catch (error) {
          console.error(error);
        }
      }
    }

    runConversation();
  }, []);

  return (
    <div>
      <h1>LangChain Conversation</h1>
      <p>Check the console for the conversation log.</p>
    </div>
  );
}
