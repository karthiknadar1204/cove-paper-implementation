// backend/agents/agent3.js (Verification Executor - Factored Variant)
import openai from '../utils/openai.js';

async function verificationExecutor(questions) {
  const verifications = {};

  // Factored: Parallel independent calls for each question
  await Promise.all(questions.map(async (question, index) => {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a factual assistant. Answer the question accurately and concisely based on knowledge.' },
        { role: 'user', content: question },
      ],
    });
    verifications[question] = response.choices[0].message.content.trim();
  }));

  return verifications;
}

export default { verificationExecutor };