import { html, render } from 'lit';

const searchInput = document.getElementById(
  'search'
) as HTMLInputElement | null;

type Product = {
  id: number;
  name: string;
  image: string;
};

const renderProduct = (product: Product) => {
  const template = html`<a href="/products/${product.id}" class="product">
    <img
      src="${product.image}"
      alt="${product.name}"
      class="rounded object-cover shadow-sm"
    />
    <span class="block text-slate-950 font-semibold">${product.name}</span>
  </a>`;

  const element = render(template, document.createElement('div'));

  return element.parentNode;
};

/**
 * Renders a list of products and adds them to the page.
 */
const renderProducts = (products: Product[]) => {
  const productsList = document.getElementById('products');

  if (!productsList) return;

  productsList.innerHTML = '';
  productsList.append(...products.map(renderProduct));
};

/**
 * Updates the `#search-term` element with the current search term.
 */
const updateSearch = (search: string) => {
  const searchTerm = document.getElementById('search-term');

  if (!searchTerm) return;

  if (search) {
    searchTerm.innerHTML = `matching "${search}".`;
  } else {
    searchTerm.innerHTML = 'we have.';
  }
};

searchInput?.addEventListener('input', async () => {
  const search = searchInput.value;
  const response = await fetch(`/api/products?search=${search}`);
  const data = await response.json();

  window.history.replaceState({ search }, '', `?search=${search}`);

  renderProducts(data.products);
  updateSearch(search);
});
