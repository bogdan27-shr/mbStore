import './CatalogProducts.scss';

import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';

import arrowLeft from '../../assets/icons/arrowLeft.svg';
import arrowRight from '../../assets/icons/arrowRight.svg';

const PRODUCTS_PER_PAGE = 12; // кол-во отображаемых товаров на одной странице

export default function CatalogProducts({
  products,
  selectedCategory,
  filters,
  searchValue,
}) {
  const [sortBy, setSortBy] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  //настройка фильтрации start
  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      if (
        searchValue &&
        !product.title.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return false;
      }

      if (
        selectedCategory &&
        product.category !== selectedCategory
      ) {
        return false;
      }

      if (
        filters.priceFrom !== '' &&
        product.price < Number(filters.priceFrom)
      ) {
        return false;
      }

      if (
        filters.priceTo !== '' &&
        product.price > Number(filters.priceTo)
      ) {
        return false;
      }

      if (
        filters.brands.length > 0 &&
        !filters.brands.includes(product.brand)
      ) {
        return false;
      }

      return true;
    });

    return result.sort((a, b) => {
      switch (sortBy) {
        case 'price-desc':
          return b.price - a.price;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'price-asc':
        default:
          return a.price - b.price;
      }
    });
  }, [products, selectedCategory, filters, sortBy, searchValue]);
  //настройка фильтрации end

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, filters, sortBy, searchValue]);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        '...',
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  return (
    <section className="catalog-products">
      <div className="catalog-products__header">
        <div>
          <h1 className="catalog-products__title">
            {filters.brands.length === 1
              ? filters.brands[0].toUpperCase()
              : selectedCategory
                ? selectedCategory.replaceAll('-', ' ').toUpperCase()
                : 'ALL PRODUCTS'}
          </h1>

          <p className="catalog-products__count">
            {filteredProducts.length} products
          </p>
        </div>

        <label className="catalog-products__sort">
          <span>Sort by</span>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="title-asc">Name: A–Z</option>
            <option value="title-desc">Name: Z–A</option>
          </select>
        </label>
      </div>

      {currentProducts.length > 0 ? (
        <>
          <div className="catalog-products__grid">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              className="catalog-pagination"
              aria-label="Product pages"
            >
              <button
                className="catalog-pagination__arrow"
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(page => page - 1);
                  scrollToTop();
                }}
              >
                <img src={arrowLeft} alt="" />
              </button>

              {getPageNumbers().map((page, index) =>
                page === '...' ? (
                  <span
                    className="catalog-pagination__ellipsis"
                    key={`ellipsis-${index}`}
                  >
                    …
                  </span>
                ) : (
                  <button
                    className={`catalog-pagination__page ${currentPage === page ? 'is-active' : ''
                      }`}
                    type="button"
                    key={page}
                    aria-label={`Page ${page}`}
                    aria-current={
                      currentPage === page ? 'page' : undefined
                    }
                    onClick={() => {
                      setCurrentPage(page);
                      scrollToTop();
                    }}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                className="catalog-pagination__arrow"
                type="button"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(page => page + 1);
                  scrollToTop();
                }}
              >
                <img src={arrowRight} alt="" />
              </button>
            </nav>
          )}
        </>
      ) : (
        <p className="catalog-products__empty">
          No products match your filters.
        </p>
      )}
    </section>
  );
}