const ats = (cbs, fb) => {
  const promise = cb => new Promise(res => cb(res));
  (async() => {
    try {
      for(const cb of cbs) await promise(cb)
    } catch(e) {
      if(typeof fb !== 'function') return console.error('Error:', e);
      fb();
    }
  })();
};