// backend/agents/agent4.js (Final Response Generator)
import openai from '../utils/openai.js';

async function finalResponseGenerator(originalQuestion, draft, verifications) {
  let verificationsText = '';
  for (const [question, answer] of Object.entries(verifications)) {
    verificationsText += `${question}: ${answer}\n`;
  }

  const prompt = `
Original Question: ${originalQuestion}

Draft Response: ${draft}

Verified Facts:
${verificationsText}

Task: Rewrite the response using only verified facts. Correct or remove any inconsistencies. Add correct information if needed. Keep the format similar to the draft.

Examples:
- If draft has wrong birthplaces, replace with correct ones from verifications.
- Output only the final corrected response.
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a response synthesizer.' },
      { role: 'user', content: prompt },
    ],
  });

  return response.choices[0].message.content.trim();
}

export default finalResponseGenerator;