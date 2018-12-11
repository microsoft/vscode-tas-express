function timeTo(ts) {
  const minutes = Math.floor(ts / 60);
  const seconds = (ts % 60);

  return {
    minutes,
    seconds
  };
}

function getTASData() {
  fetch('/api/metadata')
  .then(res => res.json())
  .then(data =>  {
    env.timeLeft = data.timeLeft;
  // set up the clone URLs.
  const clone = document.getElementById('clone');
  clone.setAttribute(
    'href',
    'vscode://vscode.git/clone?url=' + encodeURIComponent(data.gitUrl)
  );
  const creds = document.getElementById('creds');
  if (navigator.platform === 'Win32') {
    creds.textContent = data.gitUrl;
  } else {
    creds.textContent = data.bashGitUrl;
  }
 })
    .catch(function(error) {
    // If there is any error you will catch them here
 });
}   

function timeToString(ts) {
  const rec = timeTo(ts);
  return `${rec.minutes}`; 
}

setInterval(() => {
  const el = document.getElementById('timeLeft');
  if (!isNaN(env.timeLeft) && env.timeLeft > 0)
  {
    env.timeLeft -=3;
    el.textContent = timeToString(env.timeLeft);
  }
}, 3000);

document.addEventListener('DOMContentLoaded', () => {
  const host = document.getElementById('host');
  host.textContent = document.location.href;
  host.setAttribute(
    'href',
    document.location.href
  );

  const showCreds = document.getElementById('show-creds');
  showCreds.addEventListener('click', function(e) {
    e.preventDefault();
    creds.setAttribute('style', '');
  });
});
