import './CatalogFilters.scss';

import { Link } from 'react-router-dom';

export default function CatalogFilters({
  products,
  categories,
  brands,
  selectedCategory,
  filters,
  setFilters,
}) {
  const updatePrice = (key, value) => {
    if (value !== '' && (!Number.isFinite(Number(value)) || Number(value) < 0)) {
      return;
    }

    setFilters((prev) => {
      const nextValue = value === '' ? '' : Number(value);
      const next = { ...prev, [key]: nextValue };

      if (
        next.priceFrom !== '' &&
        next.priceTo !== '' &&
        next.priceFrom > next.priceTo
      ) {
        if (key === 'priceFrom') {
          next.priceTo = next.priceFrom;
        } else {
          next.priceFrom = next.priceTo;
        }
      }

      return next;
    });
  };

  const toggleBrand = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((item) => item !== brand)
        : [...prev.brands, brand],
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceFrom: '',
      priceTo: '',
      brands: [],
    });
  };

  return (
    <aside className="catalog-filters">
      <section className="catalog-filter">
        <h2 className="catalog-filter__title">CATEGORIES</h2>

        <div className="catalog-filter__options">
          <Link
            className={!selectedCategory ? 'is-active' : ''}
            to="/catalog"
          >
            All products
          </Link>

          {categories.map((category) => (
            <Link
              key={category}
              className={selectedCategory === category ? 'is-active' : ''}
              to={`/catalog/${category}`}
            >
              {category.replaceAll('-', ' ')}
            </Link>
          ))}
        </div>
      </section>

      <section className="catalog-filter">
        <h2 className="catalog-filter__title">FILTER BY PRICE</h2>

        <div className="catalog-filter__price-inputs">
          <label>
            <span>$</span>
            <input
              type="number"
              min="0"
              placeholder="From"
              value={filters.priceFrom}
              onChange={(event) =>
                updatePrice('priceFrom', event.target.value)
              }
            />
          </label>

          <label>
            <span>$</span>
            <input
              type="number"
              min="0"
              placeholder="To"
              value={filters.priceTo}
              onChange={(event) =>
                updatePrice('priceTo', event.target.value)
              }
            />
          </label>
        </div>
      </section>

      <section className="catalog-filter">
        <h2 className="catalog-filter__title">BRANDS</h2>

        <div className="catalog-filter__options catalog-filter__brands">
          {brands.map((brand) => (
            <label key={brand} className="catalog-filter__checkbox">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </section>

      <button
        className="catalog-filters__reset"
        type="button"
        onClick={resetFilters}
      >
        RESET FILTERS
      </button>
    </aside>
  );
}