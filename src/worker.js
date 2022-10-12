this.addEventListener("message", event => {
  const d = event.data;
  for (let i = 0; i < 10e8; i += 1) {}
  for (let i = 0; i < 10e8; i += 1) {}
  this.postMessage(new Date().getTime() - d);
});