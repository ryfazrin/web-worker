const iterateCount = 1000;

this.addEventListener("message", event => {
  // console.log(event.data);
  const start =  performance.now();
  // console.log('start:', start);

  const counts = [];
  for (let i = 0; i < iterateCount; i++) {
    counts.push(i);
    console.log(i);
  }
  
  const duration = performance.now() - start;
  // console.log(performance.now());
  // console.log(duration);
  this.postMessage({duration: duration.toFixed(1), counts});
});