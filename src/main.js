SYNC_RUN.addEventListener('click', _ => {
  runSync(SYNC_INFO_ID);
});

ASYNC_RUN.addEventListener('click', _ => {
  setTimeout(() => runAsync(ASYNC_INFO_ID), timeBetween);
});

WORKER_RUN.addEventListener('click', _ => {
  WORKER_INFO_ID.innerHTML += `<li>Item Count in Console.log.</li>`;
  runWorker(WORKER_INFO_ID);
});
