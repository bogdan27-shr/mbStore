import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function ProductSection({
  title,
  category,
  products,
}) {
  return (
    <section className="home-products">
      <div className="home-products__header">
        <h2 className="home-products__title">{title}</h2>

        <Link
          className="home-products__link"
          to={`/catalog?category=${category}`}
        >
          MORE PRODUCTS <span>›</span>
        </Link>
      </div>

      <div className="home-products__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}