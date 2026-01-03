// backend/agents/agent1.js (Baseline Generator)
import openai from '../utils/openai.js';

async function baselineGenerator(question) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a helpful assistant. Provide a direct answer to the question.' },
      { role: 'user', content: question },
    ],
  });
  return response.choices[0].message.content.trim();
}

export default { baselineGenerator };