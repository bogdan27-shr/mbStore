import './BrandsPage.scss';

import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header/Header';
import { useGetProductsQuery } from '../../services/productsApi';
import Footer from '../../components/Footer/Footer';

const clothingCategories = [
  'mens-shirts',
  'mens-shoes',
  'tops',
  'womens-dresses',
  'womens-shoes',
  'womens-bags',
  'mens-watches',
  'womens-watches',
  'sunglasses',
];

export default function BrandsPage() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useGetProductsQuery();

  const brands = useMemo(() => {
    const clothingProducts = products.filter((product) =>
      clothingCategories.includes(product.category)
    );

    const brandsMap = new Map();

    clothingProducts.forEach((product) => {
      if (!product.brand) return;

      brandsMap.set(
        product.brand,
        (brandsMap.get(product.brand) || 0) + 1
      );
    });

    return [...brandsMap.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  return (
    <div className="brands-page">
      <Header />

      <main className="brands-page__main">
        <nav className="brands-page__breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Brands</span>
        </nav>

        <h1 className="brands-page__title">Our Brands</h1>

        <p className="brands-page__description">
          Explore our collection of brands.
        </p>

        {isLoading && (
          <p className="brands-page__status">
            Loading brands...
          </p>
        )}

        {error && (
          <p className="brands-page__status">
            Failed to load brands.
          </p>
        )}

        {!isLoading && !error && (
          <div className="brands-page__grid">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                to={`/catalog?brand=${encodeURIComponent(brand.name)}`}
                className="brands-page__card"
              >
                <h2 className="brands-page__card-title">
                  {brand.name}
                </h2>

                <span className="brands-page__card-count">
                  {brand.count}{' '}
                  {brand.count === 1 ? 'product' : 'products'}
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer/>
    </div>
  );
}