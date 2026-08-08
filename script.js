/* =====================================
   JUSTINE HUB OS v3
   Developed by JUSTINE I. ROMERO
===================================== */

'use strict';

/* ---------- Boot screen ---------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    const boot = document.getElementById('bootScreen');
    if (boot) boot.classList.add('hidden');
  }, 1800);
});

/* ---------- Navigation ---------- */
const pages = document.querySelectorAll('.page');
const navButtons = document.querySelectorAll('.nav-btn');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const page = btn.dataset.page;
    pages.forEach(p => p.classList.remove('active-page'));
    document.getElementById(page).classList.add('active-page');
  });
});

/* ---------- Theme ---------- */
const themeToggle = document.getElementById('themeToggle');
const toggleThemeSetting = document.getElementById('toggleThemeSetting');

function applyTheme(theme){
  document.body.classList.toggle('light', theme === 'light');
  localStorage.setItem('jh_theme', theme);
}

const savedTheme = localStorage.getItem('jh_theme') || 'dark';
applyTheme(savedTheme);

function toggleTheme(){
  applyTheme(document.body.classList.contains('light') ? 'dark' : 'light');
}

themeToggle?.addEventListener('click', toggleTheme);
toggleThemeSetting?.addEventListener('click', toggleTheme);

/* ---------- Wallpaper upload ---------- */
const wallpaperUpload = document.getElementById('wallpaperUpload');
const uploadWallpaperBtn = document.getElementById('uploadWallpaperBtn');

uploadWallpaperBtn?.addEventListener('click', () => wallpaperUpload.click());

wallpaperUpload?.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    document.body.style.background = `url(${reader.result}) center/cover fixed`;
    localStorage.setItem('jh_wallpaper', reader.result);
    notify('Wallpaper updated');
  };
  reader.readAsDataURL(file);
});

const savedWallpaper = localStorage.getItem('jh_wallpaper');
if (savedWallpaper){
  document.body.style.background = `url(${savedWallpaper}) center/cover fixed`;
}

/* ---------- Theme gallery ---------- */
document.querySelectorAll('.theme-card').forEach(card => {
  card.addEventListener('click', () => {
    const theme = card.dataset.theme;
    switch(theme){
      case 'gaming':
        document.body.style.background = 'linear-gradient(135deg,#0f172a,#312e81,#06b6d4)';
        break;
      case 'anime':
        document.body.style.background = 'linear-gradient(135deg,#ec4899,#8b5cf6,#2563eb)';
        break;
      case 'nature':
        document.body.style.background = 'linear-gradient(135deg,#14532d,#16a34a,#84cc16)';
        break;
      case 'minimal':
        document.body.style.background = 'linear-gradient(135deg,#334155,#64748b,#cbd5e1)';
        break;
      case 'gradient':
        document.body.style.background = 'linear-gradient(135deg,#7c3aed,#2563eb,#06b6d4)';
        break;
      case 'animated':
        document.body.style.background = 'linear-gradient(270deg,#7c3aed,#2563eb,#06b6d4)';
        document.body.style.backgroundSize = '300% 300%';
        break;
    }
    notify(`${theme} theme applied`);
  });
});

/* ---------- Clock & date ---------- */
function updateClock(){
  const now = new Date();
  const clock = document.getElementById('clock');
  const date = document.getElementById('date');

  if (clock){
    clock.textContent = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  if (date){
    date.textContent = now.toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

setInterval(updateClock, 1000);
updateClock();

/* ---------- Weather placeholder ---------- */
document.getElementById('weatherTemp').textContent = '28°C';
document.getElementById('weatherLocation').textContent = 'Diliman, Quezon City';

/* ---------- Battery ---------- */
if ('getBattery' in navigator){
  navigator.getBattery().then(battery => {
    function updateBattery(){
      document.getElementById('batteryLevel').textContent =
        Math.round(battery.level * 100) + '%';
      document.getElementById('batteryStatus').textContent =
        battery.charging ? 'Charging' : 'Not charging';
    }

    updateBattery();
    battery.addEventListener('levelchange', updateBattery);
    battery.addEventListener('chargingchange', updateBattery);
  });
} else {
  document.getElementById('batteryLevel').textContent = 'N/A';
  document.getElementById('batteryStatus').textContent = 'Unsupported';
}

/* ---------- Storage ---------- */
document.getElementById('storageUsed').textContent = '32 GB';
document.getElementById('storageFree').textContent = '96 GB free';

/* ---------- Apps ---------- */
const apps = [
  { name: 'YouTube', icon: '▶️' },
  { name: 'Facebook', icon: '📘' },
  { name: 'Messenger', icon: '💬' },
  { name: 'Telegram', icon: '✈️' },
  { name: 'ChatGPT', icon: '🤖' },
  { name: 'Canva', icon: '🎨' },
  { name: 'Google Drive', icon: '☁️' },
  { name: 'TikTok', icon: '🎵' },
  { name: 'Games', icon: '🎮' },
  { name: 'File Manager', icon: '📁' },
  { name: 'QR Scanner', icon: '📷' },
  { name: 'VPN', icon: '🛡️' }
];

const appGrid = document.getElementById('appGrid');
const favoriteApps = document.getElementById('favoriteApps');
const recentApps = document.getElementById('recentApps');

function createAppIcon(app){
  const el = document.createElement('div');
  el.className = 'app-icon';
  el.innerHTML = `
    <div class='icon'>${app.icon}</div>
    <div class='name'>${app.name}</div>
  `;
  el.addEventListener('click', () => {
    openApp(app);
  });
  return el;
}

function renderApps(){
  appGrid.innerHTML = '';
  favoriteApps.innerHTML = '';

  apps.forEach((app, index) => {
    appGrid.appendChild(createAppIcon(app));
    if (index < 4){
      favoriteApps.appendChild(createAppIcon(app));
    }
  });
}

renderApps();

function openApp(app){
  const item = document.createElement('div');
  item.className = 'app-icon';
  item.innerHTML = `
    <div class='icon'>${app.icon}</div>
    <div class='name'>${app.name}</div>
  `;

  recentApps.prepend(item);

  while (recentApps.children.length > 6){
    recentApps.removeChild(recentApps.lastChild);
  }

  notify(`${app.name} opened`);
}

/* ---------- Search ---------- */
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();

  appGrid.querySelectorAll('.app-icon').forEach(icon => {
    const name = icon.querySelector('.name').textContent.toLowerCase();
    icon.style.display = name.includes(q) ? 'block' : 'none';
  });
});

/* ---------- Notes ---------- */
const notesArea = document.getElementById('notesArea');

notesArea.value = localStorage.getItem('jh_notes') || '';

notesArea.addEventListener('input', () => {
  localStorage.setItem('jh_notes', notesArea.value);
});

/* ---------- Bookmarks ---------- */
const bookmarkList = document.getElementById('bookmarkList');
const bookmarkName = document.getElementById('bookmarkName');
const bookmarkUrl = document.getElementById('bookmarkUrl');
const addBookmarkBtn = document.getElementById('addBookmarkBtn');

let bookmarks = JSON.parse(localStorage.getItem('jh_bookmarks') || '[]');

function renderBookmarks(){
  bookmarkList.innerHTML = '';

  bookmarks.forEach((b, index) => {
    const item = document.createElement('div');
    item.className = 'bookmark-item';
    item.innerHTML = `
      <div>
        <strong>${b.name}</strong>
        <div>${b.url}</div>
      </div>
      <button data-index='${index}'>Delete</button>
    `;

    item.querySelector('button').addEventListener('click', () => {
      bookmarks.splice(index, 1);
      saveBookmarks();
    });

    bookmarkList.appendChild(item);
  });
}

function saveBookmarks(){
  localStorage.setItem('jh_bookmarks', JSON.stringify(bookmarks));
  renderBookmarks();
}

addBookmarkBtn.addEventListener('click', () => {
  const name = bookmarkName.value.trim();
  const url = bookmarkUrl.value.trim();

  if (!name || !url) return;

  bookmarks.push({ name, url });
  bookmarkName.value = '';
  bookmarkUrl.value = '';
  saveBookmarks();
  notify('Bookmark added');
});

renderBookmarks();

/* ---------- APK Center ---------- */
const apkGrid = document.getElementById('apkGrid');

const apkApps = [
  { name: 'Facebook', version: '520.0', icon: '📘', category: 'social' },
  { name: 'Messenger', version: '510.2', icon: '💬', category: 'social' },
  { name: 'Telegram', version: '12.1', icon: '✈️', category: 'social' },
  { name: 'YouTube', version: '21.30', icon: '▶️', category: 'video' },
  { name: 'TikTok', version: '42.3', icon: '🎵', category: 'video' },
  { name: 'ChatGPT', version: '1.2026', icon: '🤖', category: 'productivity' },
  { name: 'Canva', version: '3.5', icon: '🎨', category: 'productivity' },
  { name: 'Google Drive', version: '2.25', icon: '☁️', category: 'productivity' },
  { name: 'File Manager', version: '8.0', icon: '📁', category: 'tools' },
  { name: 'VPN', version: '5.1', icon: '🛡️', category: 'tools' },
  { name: 'QR Scanner', version: '4.2', icon: '📷', category: 'tools' },
  { name: 'Games', version: '1.0', icon: '🎮', category: 'games' }
];

function renderAPK(category = 'social'){
  apkGrid.innerHTML = '';

  apkApps
    .filter(app => app.category === category)
    .forEach(app => {
      const card = document.createElement('div');
      card.className = 'apk-card';
      card.innerHTML = `
        <div class='apk-header'>
          <div class='apk-icon'>${app.icon}</div>
          <div>
            <div class='apk-name'>${app.name}</div>
            <div class='apk-version'>Version ${app.version}</div>
          </div>
        </div>
        <div class='apk-info'>Latest APK package</div>
        <button>Download APK</button>
      `;

      card.querySelector('button').addEventListener('click', () => {
        notify(`Download ${app.name} APK`);
      });

      apkGrid.appendChild(card);
    });
}

renderAPK();

document.querySelectorAll('.apk-category').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.apk-category').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderAPK(btn.dataset.category);
  });
});

/* ---------- Notifications ---------- */
const notificationPanel = document.getElementById('notificationPanel');
const notificationList = document.getElementById('notificationList');
const notificationBtn = document.getElementById('notificationBtn');
const clearNotifications = document.getElementById('clearNotifications');

notificationBtn.addEventListener('click', () => {
  notificationPanel.classList.toggle('hidden');
});

clearNotifications.addEventListener('click', () => {
  notificationList.innerHTML = '';
});

function notify(message){
  const item = document.createElement('div');
  item.className = 'notification-item';
  item.textContent = message;
  notificationList.prepend(item);
}

/* ---------- Quick settings ---------- */
const quickSettings = document.getElementById('quickSettings');
const quickSettingsBtn = document.getElementById('quickSettingsBtn');
const closeQuickSettings = document.getElementById('closeQuickSettings');

quickSettingsBtn.addEventListener('click', () => {
  quickSettings.classList.remove('hidden');
});

closeQuickSettings.addEventListener('click', () => {
  quickSettings.classList.add('hidden');
});

/* ---------- AI Assistant ---------- */
document.getElementById('aiAssistant').addEventListener('click', () => {
  notify('AI Assistant activated');
  alert('JUSTINE AI is ready.');
});

/* ---------- PWA ---------- */
let deferredPrompt;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
});

document.getElementById('installBtn').addEventListener('click', async () => {
  if (!deferredPrompt){
    notify('Install prompt not available');
    return;
  }

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
});

/* ---------- Backup ---------- */
document.getElementById('backupBtn').addEventListener('click', () => {
  const data = {
    notes: localStorage.getItem('jh_notes'),
    bookmarks,
    theme: localStorage.getItem('jh_theme')
  };

  const blob = new Blob([JSON.stringify(data)], {
    type: 'application/json'
  });

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'justine_hub_backup.json';
  a.click();

  notify('Backup created');
});

/* ---------- Welcome ---------- */
notify('Welcome to JUSTINE HUB OS v3');
notify('Developed by JUSTINE I. ROMERO');