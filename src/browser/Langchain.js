import { OpenAI } from '@langchain/openai';

async function getChatChain() {
  const { ConversationChain } = await import('langchain/chains');

  const openai = new OpenAI({
    apiKey: 'api key',
    model: 'gpt-3.5-turbo',
  });

  const chain = new ConversationChain({
    llm: openai,
    system: "You are a helpful assistant.",
    user: async (finalAnswers, currentDate) => {
      try {
        if (finalAnswers.length < 3) {
          throw new Error("Insufficient answers provided.");
        }
    
        const plan = {
          Plan: {
            Title: `${finalAnswers[0]} 학습 계획`,
            start_date: currentDate,
            PlanDetail: []
          }
        };
    
        const studyHours = parseInt(finalAnswers[2], 10);
        const totalDays = parseInt(finalAnswers[1], 10);
    
        for (let i = 1; i <= totalDays; i++) {
          const activities = [];
          for (let j = 1; j <= studyHours; j++) {
            activities.push({ Act: `Step ${j} 내용 for ${finalAnswers[0]} on day ${i}` });
          }
    
          plan.Plan.PlanDetail.push({
            ActDay: i,
            ActDate: new Date(new Date(currentDate).setDate(new Date(currentDate).getDate() + (i - 1))).toISOString().split('T')[0],
            Topics: finalAnswers[0],
            Activity: activities
          });
        }
    
        return JSON.stringify(plan); // JSON 문자열로 반환
      } catch (error) {
        console.error("Error in user function: ", error);
        return JSON.stringify({ error: error.message }); // 오류 메시지를 포함한 JSON 반환
      }
    },
  });

  return chain;
}

export default getChatChain;
