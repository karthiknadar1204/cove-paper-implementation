// backend/agents/agent2.js (Verification Planner)
import openai from '../utils/openai.js';

async function verificationPlanner(question, draft) {
  const prompt = `
Original Question: ${question}

Draft Response: ${draft}

Task: Analyze the draft and generate a list of specific, short verification questions to fact-check the key factual claims. Make questions direct and independent.

Examples:
- If draft says "Politicians born in NYC: Hillary Clinton, Donald Trump", questions: "Where was Hillary Clinton born?", "Where was Donald Trump born?"
- If draft is a biography with dates, questions: "When was [person] born?", "What year did [event] happen?"

Output only a numbered list of questions, nothing else.
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a fact-checking planner.' },
      { role: 'user', content: prompt },
    ],
  });

  const questionsText = response.choices[0].message.content.trim();
  return questionsText.split('\n').map(q => q.replace(/^\d+\.\s*/, '').trim()).filter(q => q);
}

export default verificationPlanner;