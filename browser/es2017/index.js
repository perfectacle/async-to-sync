const ats = (arrCallback, fallback) => {
  const promise = cb => new Promise(res => cb(res));
  (async() => {
    try {
      for(const cb of arrCallback) await promise(cb)
    } catch(e) {
      if(typeof fallback !== 'function') return console.error('Error:', e);
      fallback();
    }
  })();
};