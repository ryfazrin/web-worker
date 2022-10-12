(function () {
  const PARTYTOWN_TIME = document.getElementById('partytownTime');
  const PARTYTOWN_RUN = document.getElementById('partytownRun');
  const PARTYTOWN_INFO_ID = document.getElementById('partytownInfo');

  PARTYTOWN_INFO_ID.innerHTML += `<li>This tag code execute by worker partytown. non-blocking code.</li>`

  const partytownInfo = [];

  PARTYTOWN_RUN.addEventListener('click', _ => {
    runPartytownTest();
  });

  const runPartytownTest = () => {
    const d = new Date().getTime();
    PARTYTOWN_TIME.innerHTML = "Waiting for the response ...";
    partytownInfo.push("Waiting");

    for (let i = 0; i < 10e8; i += 1) { }
    for (let i = 0; i < 10e8; i += 1) { }
    // setSyncTime("Received the result ...");
    partytownInfo.push("Receiving");

    PARTYTOWN_TIME.innerHTML = new Date().getTime() - d + " ms";

    partytownInfo.forEach(info => {
      PARTYTOWN_INFO_ID.innerHTML += `<li>${info}</li>`
    });
  };
  // console.log(partytownInfo);
  
})();