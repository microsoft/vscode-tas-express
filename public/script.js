Date.prototype.addHours = function(h) {    
  this.setTime(this.getTime() + (h*60*60*1000)); 
  return this;   
}
function timeTo(ts) {
  var date = new Date(); 
  var now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  const t = Date.parse(ts) - Date.parse(new Date(now_utc));
  const minutes = Math.floor(t / 1000 / 60);
  const seconds = (t - minutes * 60 * 1000) / 1000;

  return {
    minutes,
    seconds
  };
}

function timeToString(ts) {
  const rec = timeTo(ts);
  return `${rec.minutes}`; // minutes`; // ${rec.seconds} sec`;
}

setInterval(() => {
  const el = document.getElementById('timeLeft');
  el.textContent = timeToString(expiryTime);
}, 1000);

document.addEventListener('DOMContentLoaded', () => {
  // set up the clone URLs.
  // const clone = document.getElementById('clone');
  // clone.setAttribute(
  //   'href',
  //   'vscode://vscode.git/clone?url=' + encodeURIComponent(env.gitUrl)
  // );

  // const cloneInsiders = document.getElementById('clone-insiders');
  // cloneInsiders.setAttribute(
  //   'href',
  //   'vscode-insiders://vscode.git/clone?url=' + encodeURIComponent(env.gitUrl)
  // );

  // const host = document.getElementById('host');
  // host.textContent = document.location.href;

  const creds = document.getElementById('creds');
  if (navigator.platform === 'Win32') {
    creds.textContent = env.gitUrl;
  } else {
    creds.textContent = env.bashGitUrl;
  }
  const showCreds = document.getElementById('show-creds');
  showCreds.addEventListener('click', function(e) {
    e.preventDefault();
    creds.setAttribute('style', '');
  });
});