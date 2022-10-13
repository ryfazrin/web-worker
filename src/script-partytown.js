(function () {
  const PARTYTOWN_TIME = document.getElementById('partytownTime');
  const PARTYTOWN_RUN = document.getElementById('partytownRun');
  const PARTYTOWN_INFO_ID = document.getElementById('partytownInfo');
  const OUTPUT = document.getElementById('output');

  PARTYTOWN_INFO_ID.innerHTML += `<li>This tag code execute by worker partytown. non-blocking code.</li>`;

  // const timeBetween = 20;
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

  const runSync = (tableId) => {
    PARTYTOWN_TIME.textContent = 'Running...';
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
    tableId.appendChild(resultTr);

    if (runId < runCount) {
      runSync(tableId);
    } else {
      const total = runs.reduce((t, dur) => {
        t += dur;
        return t;
      }, 0);
      const ave = total / runCount;
      PARTYTOWN_TIME.textContent = `${ave.toFixed(1)}ms`;
      PARTYTOWN_TIME.classList.add('completed');

      // reset runs length
      runs.length = 0;
    }
  };
  
  PARTYTOWN_RUN.addEventListener('click', _ => {
    runSync(PARTYTOWN_INFO_ID);
  });
})();