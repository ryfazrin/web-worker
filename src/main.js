SYNC_RUN.addEventListener('click', _ => {
  runSync(SYNC_INFO_ID);
});

ASYNC_RUN.addEventListener('click', _ => {
  setTimeout(() => runAsync(ASYNC_INFO_ID), timeBetween);
});

WORKER_INFO_ID.innerHTML += `
<li>'Execute renning' item run in <b>Console.log</b></li>
<li>
If you want to see the actual execution time. Turn on <b>Inspect Devtools</b>.
In chrome <b>Ctrl + Shift + i</b>. Then visit the tab <b>console</b>.
</li>
`;
WORKER_RUN.addEventListener('click', _ => {
  runWorker(WORKER_INFO_ID);
});
