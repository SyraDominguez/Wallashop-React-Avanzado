Object.defineProperty(global, 'importMeta', {
  value: {
    env: {
      VITE_API_URLBASE: 'http://localhost:3001'
    }
  },
  writable: true
});
