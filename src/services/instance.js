function createInstance(BASE_URL) {
  return (url, options) => {
    return fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export const instance = createInstance('https://openmind-api.vercel.app/21-4/')
