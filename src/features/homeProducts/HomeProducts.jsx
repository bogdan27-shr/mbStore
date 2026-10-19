import './HomeProducts.scss';

import { useGetProductsQuery } from '../../services/productsApi';
import ProductSection from './ProductSection';

const categories = [
  { title: 'SHOES', category: 'mens-shoes' },
  { title: 'MENS SHIRTS', category: 'mens-shirts' },
  { title: 'FURNITURE', category: 'furniture' },
];

export default function HomeProducts() {
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="home-products-status">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-products-status">
        Failed to load products
      </div>
    );
  }

  return (
    <div className="home-products-list">
      {categories.map(({ title, category }) => {
        const categoryProducts = products
          .filter((product) => product.category === category)
          .slice(0, 4);

        if (categoryProducts.length === 0) {
          return null;
        }

        return (
          <ProductSection
            key={category}
            title={title}
            category={category}
            products={categoryProducts}
          />
        );
      })}
    </div>
  );
}
