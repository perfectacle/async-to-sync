const promise = cb => new Promise(res => cb(res));
const ats = (arrCallback, fb) => {
  (async() => {
    try {
      for(const cb of arrCallback) await promise(cb)
    } catch(e) {
      if(typeof fb !== 'function') return console.error('Error:', e);
      fb();
    }
  })();
};
export default ats;