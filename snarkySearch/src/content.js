const apiKey = 'YOUR_API_KEY_HERE';

function getSearchQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('q') || 'something';
}

async function getSarcasticResponse(query) {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: { text: 'You are extremely sarcastic, witty, and brief. Respond in 1-2 sentences max.' }
        },
        contents: { parts: { text: `The user searched for: "${query}". Give a sarcastic, funny response.` } }
      })
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('API Error:', error);
    return `Oh, you searched for "${query}". How... thrilling. Also enter the API key to get custom responses.`;
  }
}

async function injectResponse() {
  console.log('Injection function called');
  const query = getSearchQuery();
  console.log('Query:', query);
  
  const sarcasticResponse = await getSarcasticResponse(query);
  console.log('Response:', sarcasticResponse);
  
  const centerCol = document.getElementById('center_col');
  console.log('Center col found:', centerCol ? 'yes' : 'no');
  
  if (centerCol) {
    const injectedBox = document.createElement('div');
    injectedBox.innerHTML = `
      <div style="background-color: #000000ff; border: 4px solid red; border-radius: 8px; padding: 16px; margin-bottom: 16px; font-size: 18px; font-weight: bold;">
        <p>💬 Sarcasm Mode Activated:</p>
        <p>${sarcasticResponse}</p>
      </div>
    `;
    centerCol.insertBefore(injectedBox.firstElementChild, centerCol.firstChild);
    console.log('Injected successfully');
  }
}

injectResponse();