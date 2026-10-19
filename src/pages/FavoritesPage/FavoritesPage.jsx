import './FavoritesPage.scss';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart } from '../../features/cart/cartSlice.js';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import Footer from '../../components/Footer/Footer.jsx';

import emptyFavoritesIcon from '../../assets/icons/emptyFavorites.svg';

export default function FavoritesPage() {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.items);

  const handleAddAllToCart = () => {
    favorites.forEach((product) => {
      dispatch(addToCart(product));
    });
  };

  return (
    <div className="favorites-page">
      <Header />

      <main className="favorites-page__main">
        <nav className="favorites-page__breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Favorites</span>
        </nav>

        <div className="favorites-page__heading">
          <div>
            <h1 className="favorites-page__title">FAVORITES</h1>

            {favorites.length > 0 && (
              <p className="favorites-page__count">
                {favorites.length} {favorites.length === 1 ? 'product' : 'products'}
              </p>
            )}
          </div>

          {favorites.length > 0 && (
            <button
              className="favorites-page__add-all"
              type="button"
              onClick={handleAddAllToCart}
            >
              <span>ADD ALL TO CART</span>
              <span className="favorites-page__add-all-count">
                ({favorites.length})
              </span>
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="favorites-page__empty">
            <img
              className="favorites-page__empty-icon"
              src={emptyFavoritesIcon}
              alt=""
            />

            <h2>YOUR WISHLIST IS EMPTY.</h2>

            <p>You don't have any products in your wishlist yet.</p>
            <p>
              Visit our catalog to find lots of interesting products.
            </p>

            <Link
              className="favorites-page__catalog-link"
              to="/catalog"
            >
              GO TO CATALOG
            </Link>
          </div>
        ) : (
          <div className="favorites-page__grid">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}