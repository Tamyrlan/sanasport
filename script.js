const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const storageKey = 'sana-sport-content';
const defaultContent = {
  heroTitle: 'Sana Sport — Семейный\nспортивный центр',
  heroDescription: 'Более 20 кружков спорта, творчества и образования\nна 10 000 м². Один центр — весь день ребёнка.',
  address: 'г. Астана, ул. Кажымукана, 5',
  phone: '+7 (747) 094 71 97',
  heroImage: '',
  aboutImage: ''
};

menuToggle.addEventListener('click', () => nav.classList.toggle('is-open'));
document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('is-open')));

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelector('.tab.is-active').classList.remove('is-active');
    tab.classList.add('is-active');
  });
});

document.querySelector('.contact form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = document.querySelector('.form-status');
  status.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
  event.currentTarget.reset();
});

const adminPanel = document.querySelector('#admin-panel');
const adminForm = document.querySelector('#admin-form');
const adminStatus = document.querySelector('#admin-status');
if (adminForm) {
let content = { ...defaultContent, ...JSON.parse(localStorage.getItem(storageKey) || '{}') };

function applyContent() {
  document.querySelector('#hero-title').innerHTML = content.heroTitle.replace(/\n/g, '<br>');
  document.querySelector('#hero-description').innerHTML = content.heroDescription.replace(/\n/g, '<br>');
  document.querySelector('#site-address').textContent = content.address;
  const phone = document.querySelector('#site-phone');
  phone.textContent = content.phone;
  phone.href = `tel:${content.phone.replace(/[^\d+]/g, '')}`;
  document.querySelector('.visual--building').style.backgroundImage = content.heroImage ? `url("${content.heroImage}")` : '';
  document.querySelector('.visual--lounge').style.backgroundImage = content.aboutImage ? `url("${content.aboutImage}")` : '';
}

function fillAdminForm() {
  Object.entries(content).forEach(([key, value]) => {
    const field = adminForm.elements[key];
    if (field && field.type !== 'file') field.value = value;
  });
}

function setAdminOpen(isOpen) {
  adminPanel.classList.toggle('is-open', isOpen);
  adminPanel.setAttribute('aria-hidden', String(!isOpen));
  if (isOpen) fillAdminForm();
}

function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(1, 1600 / image.width, 1200 / image.height);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

document.querySelector('#admin-open').addEventListener('click', () => setAdminOpen(true));
document.querySelector('#admin-close').addEventListener('click', () => setAdminOpen(false));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setAdminOpen(false);
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'a') setAdminOpen(true);
});

adminForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(adminForm);
  content.heroTitle = formData.get('heroTitle').trim();
  content.heroDescription = formData.get('heroDescription').trim();
  content.address = formData.get('address').trim();
  content.phone = formData.get('phone').trim();
  for (const imageName of ['heroImage', 'aboutImage']) {
    const file = formData.get(imageName);
    if (file && file.size) content[imageName] = await resizeImage(file);
  }
  localStorage.setItem(storageKey, JSON.stringify(content));
  applyContent();
  adminStatus.textContent = 'Изменения сохранены';
  setTimeout(() => { adminStatus.textContent = ''; }, 2500);
});

document.querySelectorAll('.admin-remove').forEach((button) => {
  button.addEventListener('click', () => {
    content[button.dataset.image] = '';
    localStorage.setItem(storageKey, JSON.stringify(content));
    applyContent();
    fillAdminForm();
  });
});

document.querySelector('#admin-reset').addEventListener('click', () => {
  content = { ...defaultContent };
  localStorage.removeItem(storageKey);
  applyContent();
  fillAdminForm();
  adminStatus.textContent = 'Восстановлены исходные данные';
});

applyContent();
}

const directionTabs = document.querySelectorAll('.direction-tab');
const directionCards = document.querySelectorAll('.direction-card');
const directionModal = document.querySelector('#direction-modal');

directionTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    directionTabs.forEach((item) => item.classList.remove('is-active'));
    tab.classList.add('is-active');
    directionCards.forEach((card) => card.classList.toggle('is-hidden', card.dataset.category !== tab.dataset.directionFilter));
  });
});

function closeDirectionModal() {
  if (!directionModal) return;
  directionModal.classList.remove('is-open');
  directionModal.setAttribute('aria-hidden', 'true');
}

directionCards.forEach((card) => {
  card.querySelector('.choose-direction').addEventListener('click', () => {
    document.querySelector('#modal-title').textContent = card.dataset.name;
    document.querySelector('#modal-age').textContent = card.dataset.age;
    document.querySelector('#modal-description').textContent = card.dataset.description;
    document.querySelector('#modal-image').style.backgroundImage = `url("${card.dataset.image}")`;
    directionModal.classList.add('is-open');
    directionModal.setAttribute('aria-hidden', 'false');
  });
});

document.querySelector('#modal-close')?.addEventListener('click', closeDirectionModal);
directionModal?.addEventListener('click', (event) => {
  if (event.target === directionModal) closeDirectionModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeDirectionModal();
});

const shopFilters = document.querySelectorAll('.shop-filter');
const shopGroups = document.querySelectorAll('.shop-group');
const productCards = document.querySelectorAll('.product-card');
const shopModal = document.querySelector('#shop-modal');

shopFilters.forEach((filter) => {
  filter.addEventListener('click', () => {
    shopFilters.forEach((item) => item.classList.remove('is-active'));
    filter.classList.add('is-active');
    const category = filter.dataset.shopFilter;
    shopGroups.forEach((group) => group.classList.toggle('is-hidden', category !== 'all' && group.dataset.shopGroup !== category));
  });
});

function closeShopModal() {
  if (!shopModal) return;
  shopModal.classList.remove('is-open');
  shopModal.setAttribute('aria-hidden', 'true');
}

productCards.forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelector('#shop-modal-title').textContent = card.dataset.product;
    document.querySelector('#shop-modal-price').textContent = card.dataset.price;
    document.querySelector('#shop-modal-image').className = `shop-modal__image ${card.querySelector('.product-image').className.replace('product-image', '')}`;
    const sizeSelect = document.querySelector('#shop-modal-size');
    sizeSelect.innerHTML = `<option>${card.dataset.size}</option><option>Уточнить размер</option>`;
    shopModal.classList.add('is-open');
    shopModal.setAttribute('aria-hidden', 'false');
  });
});

document.querySelector('#shop-modal-close')?.addEventListener('click', closeShopModal);
shopModal?.addEventListener('click', (event) => {
  if (event.target === shopModal) closeShopModal();
});

const newsCards = document.querySelectorAll('.news-card');
const newsModal = document.querySelector('#news-modal');

function closeNewsModal() {
  if (!newsModal) return;
  newsModal.classList.remove('is-open');
  newsModal.setAttribute('aria-hidden', 'true');
}

newsCards.forEach((card) => {
  card.querySelector('.news-read').addEventListener('click', () => {
    document.querySelector('#news-modal-date').textContent = card.dataset.newsDate;
    document.querySelector('#news-modal-title').textContent = card.dataset.newsTitle;
    document.querySelector('#news-modal-text').textContent = card.dataset.newsText;
    document.querySelector('#news-modal-image').style.backgroundImage = `url("${card.dataset.newsImage}")`;
    newsModal.classList.add('is-open');
    newsModal.setAttribute('aria-hidden', 'false');
  });
});

document.querySelector('#news-modal-close')?.addEventListener('click', closeNewsModal);
newsModal?.addEventListener('click', (event) => {
  if (event.target === newsModal) closeNewsModal();
});

const parentArticles = document.querySelectorAll('.parent-article');
const parentModal = document.querySelector('#parent-modal');

function closeParentModal() {
  if (!parentModal) return;
  parentModal.classList.remove('is-open');
  parentModal.setAttribute('aria-hidden', 'true');
}

parentArticles.forEach((article) => {
  article.querySelector('.parent-more').addEventListener('click', () => {
    document.querySelector('#parent-modal-title').textContent = article.dataset.parentTitle;
    document.querySelector('#parent-modal-text').textContent = article.dataset.parentText;
    document.querySelector('#parent-modal-image').style.backgroundImage = `url("${article.dataset.parentImage}")`;
    parentModal.classList.add('is-open');
    parentModal.setAttribute('aria-hidden', 'false');
  });
});

document.querySelector('#parent-modal-close')?.addEventListener('click', closeParentModal);
parentModal?.addEventListener('click', (event) => {
  if (event.target === parentModal) closeParentModal();
});

const mapSearchButton = document.querySelector('#map-search-button');
const mapAddressInput = document.querySelector('#map-address');
const contactMap = document.querySelector('#contact-map');
const mapExternal = document.querySelector('#map-external');
const mapStatus = document.querySelector('#map-status');

mapSearchButton?.addEventListener('click', () => {
  const address = mapAddressInput.value.trim();
  if (!address) {
    mapStatus.textContent = 'Введите адрес для поиска';
    return;
  }
  const encodedAddress = encodeURIComponent(address);
  contactMap.src = `https://yandex.ru/map-widget/v1/?text=${encodedAddress}&z=16`;
  mapExternal.href = `https://yandex.ru/maps/?text=${encodedAddress}`;
  mapStatus.textContent = 'Карта обновлена';
});