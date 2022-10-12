const SYNC = document.getElementById('sync');
const ASYNC = document.getElementById('async');
const WORKER = document.getElementById('worker');

const SYNC_RUN = document.getElementById('syncRun');
const ASYNC_RUN = document.getElementById('asyncRun');
const WORKER_RUN = document.getElementById('workerRun');

const SYNC_INFO_ID = document.getElementById('syncInfo');
const ASYNC_INFO_ID = document.getElementById('asyncInfo');
const WORKER_INFO_ID = document.getElementById('workerInfo');

const syncInfo = [];
const asyncInfo = [];
const workerInfo = [];

SYNC_RUN.addEventListener('click', event => {
  console.log(syncInfo);
  runSyncTest();
  syncInfo.forEach(info => {
    SYNC_INFO_ID.innerHTML += `<li>${info}</li>`
  });
});

ASYNC_RUN.addEventListener('click', () => {
  runAsyncTest();
});

WORKER_RUN.addEventListener('click', _ => {
  runWorkerTest();
});

const runSyncTest = () => {
  const d = new Date().getTime();
  // setSyncTime("Waiting for the response ...");
  SYNC.innerHTML = "Waiting for the response ...";
  syncInfo.push("Waiting");


  for (let i = 0; i < 10e8; i += 1) { }
  for (let i = 0; i < 10e8; i += 1) { }
  // setSyncTime("Received the result ...");
  syncInfo.push("Receiving");

  SYNC.innerHTML = new Date().getTime() - d + " ms";
};

const runAsyncTest = () => {
  const d = new Date().getTime();
  setTimeout(() => {
    ASYNC.innerHTML = "Waiting for the response ...";
    asyncInfo.push("Waiting");
    for (let i = 0; i < 10e8; i += 1) { }
  });

  setTimeout(() => {
    for (let i = 0; i < 10e8; i += 1) { }
    ASYNC.innerHTML = "Received the result ...";
    asyncInfo.push("Receiving");
    ASYNC.innerHTML = new Date().getTime() - d + " ms";

    asyncInfo.forEach(info => {
      console.log(info);
      ASYNC_INFO_ID.innerHTML += `<li>${info}</li>`
    });
  });
}

const runWorkerTest = () => {
  const d = new Date().getTime();

  const worker = new Worker("src/worker.js");

  WORKER.innerHTML = "Waiting for the response ...";
  workerInfo.push("Waiting");

  worker.postMessage(d);
  worker.addEventListener("message", event => {
    WORKER.innerHTML = "Received the result ...";
    workerInfo.push("Receiving");
    WORKER.innerHTML = event.data + " ms";
    
    workerInfo.forEach(info => {
      console.log(info);
      WORKER_INFO_ID.innerHTML = `<li>${info}</li>`
    });
  });

  WORKER.innerHTML = "Worker does not block your code";
  workerInfo.push("Non-blocking");
  // worker.terminate();
  workerInfo.forEach(info => {
    console.log(info);
    WORKER_INFO_ID.innerHTML += `<li>${info}</li>`
  });
}