// Globals
let healthX = 0;
let totalStorage = 0;
let usedStorage = 0;
let availableStorage = 0;
let cpuName = '';
let cpuCores = [];
let RAM = 0;

// Load data.txt
fetch('data.txt')
  .then(r => {
    if (!r.ok) throw new Error(`Failed to load data.txt: ${r.status}`);
    return r.text();
  })
  .then(txt => {
    txt.trim().split('\n').forEach(l => {
      const [k, ...rest] = l.split('=');
      if (!k || rest.length === 0) return;
      const v = rest.join('=').trim();
      switch (k.trim()) {
        case 'healthX':
          healthX = parseFloat(v) || 0;
          break;
        case 'totalStorage':
          totalStorage = parseFloat(v) || 0;
          break;
        case 'usedStorage':
          usedStorage = parseFloat(v) || 0;
          break;
        case 'cpuName':
          cpuName = v;
          break;
        case 'RAM':
          RAM = parseFloat(v) || 0;
          break;
        case 'cpuCore1':
        case 'cpuCore2':
        case 'cpuCore3':
          cpuCores.push(v);
          break;
      }
    });

    if (isNaN(availableStorage)) availableStorage = totalStorage - usedStorage;

    // Update UI
    updateHealthCircle(healthX);
    updateStorageCircle(totalStorage, usedStorage);
    updateCpuInfo(cpuName, cpuCores);
    updateRAM(RAM);
  })
  .catch(e => {
    console.error('Error:', e);
    updateHealthCircle(0);
    updateStorageCircle(0, 0);
    updateCpuInfo('Error loading CPU info', []);
    updateRAM(0);
  });

// Eco Health
function updateHealthCircle(h) {
  const circle = document.querySelector('.progress-bar');
  const label = document.querySelector('.progress-text');
  if (!circle || !label) return;
  h = Math.max(0, Math.min(100, h));
  const offset = 408 * (1 - h / 100);
  circle.style.strokeDashoffset = offset;
  label.textContent = `${Math.round(h)}%`;
}

// Storage
function updateStorageCircle(total, used) {
  const slice = document.querySelector('.progress-bar-used');
  const text = document.querySelector('.progress-text-storage');
  if (!slice || !text) return;
  total = Math.max(0, total);
  used = Math.max(0, Math.min(total, used));
  const pct = total > 0 ? used / total : 0;
  slice.style.strokeDashoffset = 408 * (1 - pct);
  let col = '#4caf50';
  if (pct > 0.75) col = '#ff6347';
  else if (pct > 0.50) col = '#4682b4';
  slice.style.stroke = col;
  const avail = total - used;
  text.innerHTML = `
    <p>Total: ${total.toFixed(2)}GB</p>
    <p>Used: ${used.toFixed(2)}GB</p>
    <p>Available: ${avail.toFixed(2)}GB</p>
  `;
}

// CPU Info
function updateCpuInfo(name, cores) {
  const cpuDetailsContainer = document.querySelector('.cpu-details');
  if (!cpuDetailsContainer) {
    console.error('Error: .cpu-details container not found');
    return;
  }
  const cpuInfoHTML = `
    <p><strong>${name}</strong></p>
    ${cores.map(core => `<p>${core}</p>`).join('')}
  `;
  cpuDetailsContainer.innerHTML = cpuInfoHTML;
}

// RAM Info
function updateRAM(ram) {
  const ramContainer = document.querySelector('.ram-details');
  if (!ramContainer) {
    console.error('Error: .ram-details container not found');
    return;
  }
  ramContainer.innerHTML = `<p><strong>RAM:</strong> ${ram.toFixed(2)} GB</p>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.ai-input');

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && input.value.trim() !== '') {
      // Simulate submitting the user message
      const message = input.value.trim();
      input.value = ''; // Clear the input field

      // Create a new message container for the user
      const userMessage = document.createElement('div');
      userMessage.classList.add('ai-message');
      userMessage.innerHTML = `<p><strong>You:</strong> ${message}</p>`;

      // Append the user message to the messages container
      const messagesContainer = document.querySelector('.ai-messages');
      messagesContainer.appendChild(userMessage);

      // Scroll to the bottom of the messages container
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });
});