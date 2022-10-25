(() => {
  const PARTYTOWN_RESULT = document.getElementById('partytownResult');
  const RESULTS = document.getElementById('results');
  const OUTPUT = document.getElementById('output');

  // PARTYTOWN_INFO_ID.innerHTML += `<li>This tag code execute by worker partytown. non-blocking code.</li>`;

  const timeBetween = 20;
  const iterateCount = 1000;
  const runCount = 10;
  const runs = [];

  const test = (i) => {
    const outer = document.createElement('div');
    outer.setAttribute('attr', i);
    outer.removeAttribute('attr');
    outer.className = 'c' + i;
    OUTPUT.appendChild(outer);

    const inner = document.createElement('span');
    inner.textContent = i;
    inner.id = 'i' + i;
    inner.classList.add('a');
    inner.style.color = 'red';
    inner.tabIndex = i;
    outer.appendChild(inner);

    inner.style.color;
  };

  const run = () => {
    PARTYTOWN_RESULT.textContent = 'Running...';
    const start = performance.now();
    for (let i = 0; i < iterateCount; i++) {
      test(i);
    }
    const duration = performance.now() - start;
    runs.push(duration);

    const runId = runs.length;

    OUTPUT.textContent = '';

    const resultTr = document.createElement('tr');
    const resultTh = document.createElement('th');
    resultTh.textContent = runId;
    const resultTd = document.createElement('td');
    resultTd.textContent = `${duration.toFixed(1)}ms`;
    resultTr.appendChild(resultTh);
    resultTr.appendChild(resultTd);
    RESULTS.appendChild(resultTr);

    if (runId < runCount) {
      setTimeout(() => run(), timeBetween);
    } else {
      const total = runs.reduce((t, dur) => {
        t += dur;
        return t;
      }, 0);
      const ave = total / runCount;
      PARTYTOWN_RESULT.textContent = `${ave.toFixed(1)}ms`;
      PARTYTOWN_RESULT.classList.add('completed');
    }
  };
  
  
  setTimeout(() => run(), timeBetween);
})();