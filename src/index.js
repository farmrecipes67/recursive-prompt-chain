/**
 * recursive-prompt-chain
 * Chain recursive AI prompts with accumulated context across OpenAI, Claude, or Gemini.
 * @module recursive-prompt-chain
 */

class RecursivePromptChain {
  constructor(options = {}) {
    this.provider = options.provider || 'openai';
    this.model = options.model || 'gpt-4';
    this.maxDepth = options.maxDepth || 10;
    this.contextWindow = options.contextWindow || 12000;
    this.apiKey = options.apiKey;
    this.onStep = options.onStep || null;
  }

  async run(steps, initialContext = '') {
    let accumulated = initialContext;
    const results = [];

    for (let i = 0; i < steps.length && i < this.maxDepth; i++) {
      const step = typeof steps[i] === 'function' ? steps[i](accumulated, results) : steps[i];
      const trimmedContext = accumulated.length > this.contextWindow
        ? accumulated.substring(accumulated.length - this.contextWindow)
        : accumulated;

      const prompt = step.prompt + '\n\nPRIOR CONTEXT:\n' + trimmedContext;
      const response = await this._call(prompt, step.systemPrompt || '');

      results.push({ step: i, content: response });
      accumulated += '\n\n' + response;

      if (this.onStep) await this.onStep(i, response, accumulated);
      if (step.stopIf && step.stopIf(response)) break;
    }

    return { results, fullContext: accumulated };
  }

  async _call(prompt, systemPrompt) {
    switch (this.provider) {
      case 'openai': return this._callOpenAI(prompt, systemPrompt);
      case 'claude': return this._callClaude(prompt, systemPrompt);
      case 'gemini': return this._callGemini(prompt, systemPrompt);
      default: throw new Error('Unknown provider: ' + this.provider);
    }
  }

  async _callOpenAI(prompt, systemPrompt) {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.apiKey },
      body: JSON.stringify({
        model: this.model,
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: prompt }
        ]
      })
    });
    const data = await resp.json();
    return data.choices[0].message.content;
  }

  async _callClaude(prompt, systemPrompt) {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 4096,
        system: systemPrompt || '',
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await resp.json();
    return data.content[0].text;
  }

  async _callGemini(prompt, systemPrompt) {
    const fullPrompt = systemPrompt ? systemPrompt + '\n\n' + prompt : prompt;
    const resp = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/' + this.model + ':generateContent?key=' + this.apiKey,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }]
        })
      }
    );
    const data = await resp.json();
    return data.candidates[0].content.parts[0].text;
  }
}

module.exports = RecursivePromptChain;