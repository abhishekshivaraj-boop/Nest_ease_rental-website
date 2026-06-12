const products = [
  { name: 'Queen Bed Frame', cat: 'bedroom', emoji: '🛏️', bg: '#F5EEFA', price: 799, label: 'Bedroom' },
  { name: 'Memory Foam Mattress', cat: 'bedroom', emoji: '😴', bg: '#EDF4EE', price: 649, label: 'Bedroom' },
  { name: 'Wardrobe (3-door)', cat: 'bedroom', emoji: '🚪', bg: '#FDF1E8', price: 599, label: 'Bedroom' },
  { name: '3-Seater Sofa', cat: 'living', emoji: '🛋️', bg: '#EEF2FD', price: 899, label: 'Living Room' },
  { name: 'Coffee Table', cat: 'living', emoji: '☕', bg: '#FDF1E8', price: 299, label: 'Living Room' },
  { name: 'TV Unit', cat: 'living', emoji: '📺', bg: '#EDF4EE', price: 449, label: 'Living Room' },
  { name: 'Refrigerator (250L)', cat: 'kitchen', emoji: '🧊', bg: '#EEF2FD', price: 749, label: 'Kitchen' },
  { name: 'Microwave Oven', cat: 'kitchen', emoji: '🔥', bg: '#FDF1E8', price: 349, label: 'Kitchen' },
  { name: 'Washing Machine', cat: 'appliances', emoji: '🫧', bg: '#EDF4EE', price: 849, label: 'Appliance' },
  { name: 'Air Conditioner (1.5T)', cat: 'appliances', emoji: '❄️', bg: '#EEF2FD', price: 1199, label: 'Appliance' },
  { name: 'Study Desk', cat: 'study', emoji: '📐', bg: '#F5EEFA', price: 349, label: 'Study' },
  { name: 'Ergonomic Chair', cat: 'study', emoji: '🪑', bg: '#FDF1E8', price: 449, label: 'Study' },
];

function renderProducts(filter) {
  const grid = document.getElementById('productGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img" style="background:${p.bg};">${p.emoji}</div>
      <div class="product-body">
        <div class="cat">${p.label}</div>
        <h4>${p.name}</h4>
        <div class="product-footer">
          <div class="product-price">₹${p.price}<span>/mo</span></div>
          <button class="add-btn" onclick="sendPrompt('Tell me more about renting the ${p.name} on NestEase')" aria-label="Add ${p.name}">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterProducts(cat, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(cat);
}

const calcData = {
  studio: { rent: '₹2,499', buy: '₹1.4L', save: '₹94K' },
  '1bhk': { rent: '₹4,299', buy: '₹2.1L', save: '₹1.6L' },
  '2bhk': { rent: '₹6,999', buy: '₹3.4L', save: '₹2.7L' },
  '3bhk': { rent: '₹9,499', buy: '₹4.9L', save: '₹4.1L' },
};

function calcUpdate(type, btn) {
  document.querySelectorAll('.calc-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const d = calcData[type];
  document.getElementById('calcRent').textContent = d.rent;
  document.getElementById('calcBuy').textContent = d.buy;
  document.getElementById('calcSave').textContent = d.save;
}

// Fallback for standalone use outside the Claude artifact environment
if (typeof sendPrompt === 'undefined') {
  window.sendPrompt = function(text) {
    console.log('sendPrompt called:', text);
  };
}

function scrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

renderProducts('all');