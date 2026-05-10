const LOCAL_PHOTOS_DIR = 'photos/students';
const PHOTO_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

function slugifyName(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join('');
}

function setAvatarFallback(container, initials) {
  container.classList.add('photo-fallback');
  container.setAttribute('data-initials', initials);
}

function attachLocalPhoto(container, name, initials) {
  const baseName = slugifyName(name);
  const img = document.createElement('img');
  img.className = 'student-photo';
  img.alt = `${name} photo`;
  img.loading = 'lazy';
  img.decoding = 'async';

  let extIndex = 0;
  const tryNext = () => {
    if (extIndex >= PHOTO_EXTENSIONS.length) {
      img.remove();
      setAvatarFallback(container, initials);
      return;
    }

    const ext = PHOTO_EXTENSIONS[extIndex];
    extIndex += 1;
    img.src = `${LOCAL_PHOTOS_DIR}/${baseName}.${ext}`;
  };

  img.addEventListener('error', tryNext);
  img.addEventListener('load', () => {
    container.classList.remove('photo-fallback');
    container.removeAttribute('data-initials');
  });

  container.appendChild(img);
  tryNext();
}

function hydrateHeroTopperPhotos() {
  document.querySelectorAll('.topper-card').forEach(card => {
    const name = card.querySelector('.topper-name')?.textContent?.trim();
    const avatar = card.querySelector('.topper-avatar');
    if (!name || !avatar) return;

    const initials = getInitials(name);
    const rankBadge = avatar.querySelector('.rank-badge')?.cloneNode(true);

    avatar.innerHTML = '';
    attachLocalPhoto(avatar, name, initials);
    if (rankBadge) avatar.appendChild(rankBadge);
  });
}

function hydrateResultPhotos() {
  document.querySelectorAll('.result-card').forEach(card => {
    const name = card.querySelector('.r-name')?.textContent?.trim();
    const avatar = card.querySelector('.avatar');
    if (!name || !avatar) return;

    const initials = getInitials(name);
    avatar.innerHTML = '';
    attachLocalPhoto(avatar, name, initials);
  });
}

function showYear(year) {
  // Update tabs
  document.querySelectorAll('.year-tab').forEach(t => t.classList.remove('active'));
  if (window.event?.target) {
    window.event.target.classList.add('active');
  }

  // Update panels
  document.querySelectorAll('.results-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('panel-' + year);
  if (panel) panel.classList.add('active');

  // Scroll to results
  document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', () => {
  hydrateHeroTopperPhotos();
  hydrateResultPhotos();
});
