const iterateCount = 1000;

this.addEventListener("message", event => {
  const start =  performance.now();

  const counts = [];
  for (let i = 0; i < iterateCount; i++) {
    counts.push(i);
    this.postMessage({num: i});
  }
  
  const duration = performance.now() - start;
  this.postMessage({duration: duration.toFixed(1), counts});
});