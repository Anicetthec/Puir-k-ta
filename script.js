const products = [
  {name:'Modèle 7', type:'Chaussure élégante', image:'ch8.jpeg', badge:'À la une'},
  {name:'Modèle 02', type:'Chaussure de ville', image:'ch3.jpeg', badge:'Nouveau'},
  {name:'Modèle 03', type:'Mocassin classique', image:'ch4.jpeg'},
  {name:'Modèle 04', type:'Sneaker premium', image:'ch5.jpeg', badge:'Best-seller'},
  {name:'Modèle 05', type:'Chaussure en cuir', image:'ch6.jpeg'},
  {name:'Modèle 06', type:'Chaussure classique', image:'ch2.jpeg'},
  {name:'Modèle 08', type:'Chaussure casual', image:'ch9.jpeg'},
  {name:'Modèle 09', type:'Chaussure légère', image:'ch10.jpeg'},
  {name:'Modèle 10', type:'Sneaker confort', image:'ch12.jpeg'},
  {name:'Modèle 11', type:'Chaussure caractère', image:'ch13.jpeg'},
  {name:'Modèle 12', type:'Chaussure habillée', image:'ch14.jpeg'},
  {name:'Modèle 13', type:'Chaussure quotidienne', image:'ch15.jpeg'},
  {name:'Modèle 14', type:'Chaussure signature', image:'ch16.jpeg'},
  {name:'Modèle 15', type:'Chaussure urbaine', image:'ch17.jpeg'},
  {name:'Modèle 16', type:'Mocassin confort', image:'ch18.jpeg'},
  {name:'Modèle 17', type:'Chaussure premium', image:'ch19.jpeg'},
  {name:'Modèle 18', type:'Chaussure casual', image:'ch21.jpeg'},
  {name:'Modèle 19', type:'Chaussure de ville', image:'ch22.jpeg'},
  {name:'Modèle 20', type:'Collection signature', image:'ch23.jpeg'},
  {name:'Modèle 21', type:'Chaussure élégante', image:'ch24.jpeg'},
  {name:'Modèle 22', type:'Chaussure moderne', image:'ch25.jpeg'},
  {name:'Modèle 23', type:'Chaussure classique', image:'20.jpeg'},
  {name:'Modèle 24', type:'Édition signature', image:'chosure.jpeg'}
];
let cart = [];
const grid = document.querySelector('#product-grid');

function renderProducts() {
  grid.innerHTML = products.map((product, index) => `
    <article class="product-card reveal">
      <div class="product-image">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <img src="assets/${product.image}" alt="${product.name}" loading="lazy">
        <button class="quick-add" aria-label="Ajouter ${product.name}" data-add="${index}">+</button>
      </div>
      <div class="product-info"><h3>${product.name}</h3><p>${product.type}</p><span class="product-arrow">↗</span></div>
    </article>`).join('');
  grid.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => addToCart(Number(button.dataset.add))));
  observeReveals();
}

function addToCart(index) {
  const product = products[index];
  if (!cart.some(item => item.name === product.name)) cart.push(product);
  renderCart();
  drawer.classList.add('open');
  document.querySelector('#drawer-overlay').classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  document.querySelector('#toast').classList.add('show');
  setTimeout(() => document.querySelector('#toast').classList.remove('show'), 1800);
}

function renderCart() {
  const items = document.querySelector('#cart-items');
  items.innerHTML = cart.length ? cart.map((item, index) => `
    <div class="cart-line"><img src="assets/${item.image}" alt=""><div><strong>${item.name}</strong><span>${item.type}</span></div><button class="remove-line" aria-label="Retirer ${item.name}" data-remove="${index}">×</button></div>`).join('') : '<p class="empty-cart">Votre sélection est vide.<br>Ajoutez une paire pour commencer.</p>';
  const order = document.querySelector('#cart-order');
  order.classList.toggle('disabled', !cart.length);
  if (cart.length) {
    const list = cart.map(item => `• ${item.name} — ${item.type}`).join('%0A');
    order.href = `https://wa.me/22654592853?text=Bonjour%20Puir-k%C3%A8ta%20Fashion%2C%20je%20souhaite%20commander%20%3A%0A${list}%0A%0AMerci%20de%20m%27indiquer%20les%20d%C3%A9tails%20et%20la%20disponibilit%C3%A9.`;
  } else order.href = '#';
  items.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => { cart.splice(Number(button.dataset.remove), 1); renderCart(); }));
}

const drawer = document.querySelector('#cart-drawer');
const heroVisual = document.querySelector('.hero-visual');
heroVisual.addEventListener('pointermove', event => {
  const bounds = heroVisual.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
  const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
  heroVisual.style.setProperty('--tilt-x', (x * 2.5).toFixed(2));
  heroVisual.style.setProperty('--tilt-y', (y * -2.5).toFixed(2));
});
heroVisual.addEventListener('pointerleave', () => {
  heroVisual.style.setProperty('--tilt-x', '0');
  heroVisual.style.setProperty('--tilt-y', '0');
});
document.querySelector('.header-whatsapp').addEventListener('click', event => { event.preventDefault(); drawer.classList.add('open'); document.querySelector('#drawer-overlay').classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); });
document.querySelector('.close-cart').addEventListener('click', closeCart);
document.querySelector('#drawer-overlay').addEventListener('click', closeCart);
function closeCart() { drawer.classList.remove('open'); document.querySelector('#drawer-overlay').classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); }
document.querySelector('.menu-button').addEventListener('click', () => document.querySelector('.main-nav').classList.toggle('mobile-open'));
const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 }) : null;
function observeReveals() {
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(element => {
    if (revealObserver) revealObserver.observe(element);
    else element.classList.add('is-visible');
  });
}
document.querySelectorAll('.trust-strip>div,.story-copy,.story-image,.order-banner>div').forEach(element => element.classList.add('reveal'));
renderProducts();
observeReveals();
