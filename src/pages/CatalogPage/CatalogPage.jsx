import './CatalogPage.scss';

import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import Header from '../../components/Header/Header';
import CatalogFilters from '../../features/catalog/CatalogFilters';
import CatalogProducts from '../../features/catalog/CatalogProducts';
import { useGetProductsQuery } from '../../services/productsApi';
import Footer from '../../components/Footer/Footer';

export default function CatalogPage() {
  const { category: routeCategory } = useParams();
  const [searchParams] = useSearchParams();

  const categoryFromQuery = searchParams.get('category');
  const selectedBrand = searchParams.get('brand') || '';
  const selectedCategory = routeCategory || categoryFromQuery || '';

  const searchValue = searchParams.get('search') || '';

  const {
    data: products = [],
    isLoading,
    error,
  } = useGetProductsQuery();

  //группировка фильтров в каталоге start
  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    brands: selectedBrand ? [selectedBrand] : [],
  });

  //сохраняет выбранный бренд между страницей брендов и каталогом start
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      brands: selectedBrand ? [selectedBrand] : [],
    }));
  }, [selectedBrand]);
  //сохраняет выбранный бренд между страницей брендов и каталогом end

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))]
      .sort();
  }, [products]);

  const brands = useMemo(() => {
    return [...new Set(
      products.map((product) => product.brand).filter(Boolean)
    )].sort();
  }, [products]);
  //группировка фильтров в каталоге end


  //сценарии при загрузке товаров start
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="catalog-page__status">Loading products...</main>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Header />
        <main className="catalog-page__status">Failed to load products.</main>
      </>
    );
  }
  //сценарии при загрузке товаров end

  return (
    <div className="catalog-page">
      <Header />

      <main className="catalog-page__main">
        <nav className="catalog-page__breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Catalog</span>
          {selectedCategory && (
            <>
              <span>/</span>
              <span>{selectedCategory}</span>
            </>
          )}
        </nav>

        <div className="catalog-page__layout">
          <CatalogFilters
            products={products}
            categories={categories}
            brands={brands}
            selectedCategory={selectedCategory}
            filters={filters}
            setFilters={setFilters}
          />

          <CatalogProducts
            products={products}
            selectedCategory={selectedCategory}
            filters={filters}
            searchValue={searchValue}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
