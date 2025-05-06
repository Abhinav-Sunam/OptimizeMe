// globals
let healthX        = 0;
let totalStorage   = 0;
let usedStorage    = 0;
let availableStorage = 0;

// load data.txt
fetch('data.txt')
  .then(r => { if(!r.ok) throw new Error(r.status); return r.text(); })
  .then(txt => {
    txt.trim().split('\n').forEach(l => {
      const [k, ...rest] = l.split('=');
      if(!k||rest.length===0) return;
      const v = rest.join('=').trim();
      switch(k.trim()){
        case 'healthX':
          healthX = parseFloat(v) || 0; break;
        case 'totalStorage':
          totalStorage = parseFloat(v) || 0; break;
        case 'usedStorage':
          usedStorage = parseFloat(v) || 0; break;
        case 'availableStorage':
          availableStorage = parseFloat(v) || (totalStorage-usedStorage);
          break;
        case 'cpuName':
          document.querySelector('.CPUname').textContent = v; break;
      }
    });
    if(isNaN(availableStorage)) availableStorage = totalStorage - usedStorage;
    updateHealthCircle(healthX);
    updateStorageCircle(totalStorage, usedStorage);
  })
  .catch(e => {
    console.error(e);
    updateHealthCircle(0);
    updateStorageCircle(0,0);
    document.querySelector('.CPUname').textContent = 'Error';
  });

// Eco Health
function updateHealthCircle(h){
  const circle = document.querySelector('.progress-bar');
  const label  = document.querySelector('.progress-text');
  if(!circle||!label) return;
  h = Math.max(0,Math.min(100,h));
  const offset = 408 * (1 - h/100);
  circle.style.strokeDashoffset = offset;
  label.textContent = `${Math.round(h)}%`;
}

// Storage with dynamic color
function updateStorageCircle(total, used){
  const slice = document.querySelector('.progress-bar-used');
  const text  = document.querySelector('.progress-text-storage');
  if(!slice||!text) return;
  total = Math.max(0,total);
  used  = Math.max(0,Math.min(total,used));
  const pct  = total>0 ? used/total : 0;
  // 1) animate the fill
  slice.style.strokeDashoffset = 408 * (1 - pct);
  // 2) choose color
  let col = '#4caf50';        // green
  if(pct > 0.75) col = '#ff6347'; // red
  else if(pct > 0.50) col = '#4682b4'; // blue
  slice.style.stroke = col;
  // 3) update text
  const avail = total - used;
  text.innerHTML = `
    <p>Total: ${total.toFixed(2)}GB</p>
    <p>Used: ${used.toFixed(2)}GB</p>
    <p>Available: ${avail.toFixed(2)}GB</p>
  `;
}
