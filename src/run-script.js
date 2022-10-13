const SYNC = document.getElementById('sync');
const ASYNC = document.getElementById('async');
const WORKER = document.getElementById('worker');

const SYNC_RUN = document.getElementById('syncRun');
const ASYNC_RUN = document.getElementById('asyncRun');
const WORKER_RUN = document.getElementById('workerRun');

const SYNC_INFO_ID = document.getElementById('syncInfo');
const ASYNC_INFO_ID = document.getElementById('asyncInfo');
const WORKER_INFO_ID = document.getElementById('workerInfo');

const OUTPUT = document.getElementById('output');

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

const runSync = (tableId) => {
  const start = performance.now();
  console.log('start: ', start);
  for (let i = 0; i < iterateCount; i++) {
    test(i);
  }
  const duration = performance.now() - start;
  console.log('end: ', performance.now());
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
    SYNC.textContent = `${ave.toFixed(1)}ms`;
    SYNC.classList.add('completed');
    // document.title = h1.textContent;
    // reset runs length
    runs.length = 0;
  }
};

const runAsync = (tableId) => {
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
    setTimeout(() => runAsync(ASYNC_INFO_ID), timeBetween);
  } else {
    const total = runs.reduce((t, dur) => {
      t += dur;
      return t;
    }, 0);
    const ave = total / runCount;
    ASYNC.textContent = `${ave.toFixed(1)}ms`;
    ASYNC.classList.add('completed');

    // reset runs length
    runs.length = 0;
  }
};

const worker = new Worker("src/worker.js");

const runWorker = (tableId) => {
  const sendData = 'anything';
  worker.postMessage(sendData);

  function workerJob (resolve, reject) {
    worker.addEventListener("message", event => {
      const duration = event.data.duration;
      
      runs.push(Number(duration));
      const runId = runs.length;
  
      OUTPUT.textContent = '';
  
      const resultTr = document.createElement('tr');
      const resultTh = document.createElement('th');
      resultTh.textContent = runId;
      const resultTd = document.createElement('td');
      resultTd.textContent = `${duration}ms`;
      resultTr.appendChild(resultTh);
      resultTr.appendChild(resultTd);
      tableId.appendChild(resultTr);
  
      const testCount = event.data.counts;
      testCount.forEach(item => {
        test(item);
      });
  
      OUTPUT.textContent = '';

      if (event !== null) {
        resolve(runId);
      } else {
        reject('Error run worker');
      }
    });
  }

  const workerPromise = new Promise(workerJob);

  workerPromise.then(runId => {
    if (runId < runCount) {
      runWorker(WORKER_INFO_ID);
    }  else {
      const total = runs.reduce((t, dur) => {
        t += dur;
        return t;
      }, 0);
      const ave = total / runCount;
      WORKER.textContent = `${ave.toFixed(1)}ms`;
      WORKER.classList.add('completed');
  
      // reset runs length
      runs.length = 0;
    }
  });
}