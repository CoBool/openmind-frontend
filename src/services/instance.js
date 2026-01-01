// src/services/instance.js
function createInstance(BASE_URL) {
  return async (url, options = {}) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(text || `HTTP ${res.status}`);
    }

    return res.json().catch(() => null);
  };
}

export const instance = createInstance(
  'https://openmind-api.vercel.app/api/21-4/'
);
