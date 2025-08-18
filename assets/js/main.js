const API = 'https://pokeapi.co/api/v2/pokemon';
const grid = document.getElementById('grid');
const searchInput = document.getElementById('search');
const modal = document.getElementById('pokeModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');

let offset = 0;
const limit = 24;
let busy = false;
let finished = false;

/* ========= Helpers ========= */

function padId(n) {
  return String(n).padStart(4, '0');
}

function el(tag, attrs={}, children=[]) {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v]) => {
    if (k === 'class') e.className = v;
    else if (k === 'dataset') Object.entries(v).forEach(([dk, dv]) => e.dataset[dk] = dv);
    else if (k === 'html') e.innerHTML = v;
    else e.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).filter(Boolean).forEach(c => {
    if (typeof c === 'string') e.appendChild(document.createTextNode(c));
    else e.appendChild(c);
  });
  return e;
}

/* ========= Render ========= */

function renderCard(p) {
  const img =
    p.sprites?.other?.['official-artwork']?.front_default ||
    p.sprites?.front_default || '';

  const card = el('article', {
    class: 'card',
    dataset: { name: p.name.toLowerCase(), id: p.id }
  }, [
    el('img', { src: img, alt: p.name, loading: 'lazy' }),
    el('div', { class: 'id' }, `#${padId(p.id)}`),
    el('strong', {}, p.name),
  ]);

  card.addEventListener('click', () => openModal(p));

  grid.appendChild(card);
}

/* ========= Data Loading ========= */

async function fetchPage() {
  const res = await fetch(`${API}?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error('Falha ao carregar lista');
  return res.json();
}

async function fetchDetails(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error('Falha ao carregar detalhes');
  return r.json();
}

async function loadMore() {
  if (busy || finished) return;
  busy = true;
  grid.setAttribute('aria-busy', 'true');

  try {
    const page = await fetchPage();
    if (!page.results?.length) {
      finished = true;
      return;
    }

    const details = await Promise.all(page.results.map(p => fetchDetails(p.url)));
    details.forEach(renderCard);

    offset += limit;
  } catch (e) {
    console.error(e);
    alert('Erro ao carregar Pokémon. Tente novamente.');
    finished = true;
  } finally {
    busy = false;
    grid.setAttribute('aria-busy', 'false');
  }
}

/* ========= Busca (client-side) ========= */

function debounce(fn, ms = 250) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

const applyFilter = debounce(() => {
  const q = (searchInput.value || '').trim().toLowerCase();
  for (const card of grid.children) {
    const name = card.dataset.name;
    const id = card.dataset.id;
    const show = name.includes(q) || `#${id}`.includes(q) || id.includes(q);
    card.style.display = show ? '' : 'none';
  }
}, 200);

searchInput.addEventListener('input', applyFilter);

/* ========= Infinite Scroll ========= */

const io = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) loadMore();
}, { rootMargin: '200px' });

io.observe(document.getElementById('sentinel'));

/* ========= Modal ========= */

function typeBadges(pokemon) {
  const wrap = el('div', { class: 'type-badges' });
  pokemon.types?.forEach(t => {
    wrap.appendChild(el('span', { class: 'badge' }, t.type.name));
  });
  return wrap;
}

function statsGrid(pokemon) {
  const g = el('div', { class: 'stats' });
  pokemon.stats?.forEach(s => {
    const box = el('div', { class: 'stat' }, [
      el('strong', {}, s.stat.name),
      el('span', {}, String(s.base_stat)),
    ]);
    g.appendChild(box);
  });
  return g;
}

function openModal(pokemon) {
  const img =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default || '';

  modalTitle.textContent = `${pokemon.name}  (#${padId(pokemon.id)})`;
  modalContent.innerHTML = '';
  modalContent.appendChild(el('div', { class: 'modal-top' }, [
    el('img', { src: img, alt: pokemon.name }),
    el('div', {}, [
      el('div', {}, typeBadges(pokemon)),
      el('p', {}, `Altura: ${pokemon.height / 10} m  ·  Peso: ${pokemon.weight / 10} kg`)
    ])
  ]));
  modalContent.appendChild(statsGrid(pokemon));

  modal.showModal();
}

document.getElementById('modalClose')?.addEventListener('click', () => modal.close());

/* ========= Boot ========= */
loadMore();
