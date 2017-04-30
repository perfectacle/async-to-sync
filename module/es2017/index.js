const promise = cb => new Promise(res => cb(res));
const ats = (arrCallback, fallback) => {
  (async() => {
    try {
      for(const cb of arrCallback) await promise(cb)
    } catch(e) {
      if(typeof fallback !== 'function') return console.error('Error:', e);
      fallback();
    }
  })();
};
export default ats;