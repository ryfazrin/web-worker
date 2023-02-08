const iterateCount = 1000;

this.addEventListener("message", event => {
  const start =  performance.now();

  for (let i = 0; i < iterateCount; i++) {
    this.postMessage({num: i});
  }
  
  const duration = performance.now() - start;
  this.postMessage({duration: duration.toFixed(1)});
});