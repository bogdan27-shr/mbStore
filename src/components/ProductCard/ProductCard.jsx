import './ProductCard.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import starIcon from '../../assets/icons/star.svg';
import starFilledIcon from '../../assets/icons/starFilled.svg';

import { toggleFavorite } from '../../features/favorites/favoritesSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const isFavorite = useSelector((state) =>
    state.favorites.items.some((item) => item.id === product.id)
  );

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(product));
  };

  return (
    <article className="product-card">
      <button
        className="product-card__favorite"
        type="button"
        aria-label={
          isFavorite ? 'Remove from favorites' : 'Add to favorites'
        }
        aria-pressed={isFavorite}
        onClick={handleFavoriteClick}
      >
        <img
          src={isFavorite ? starFilledIcon : starIcon}
          alt=""
        />
      </button>

      <Link
        className="product-card__image-link"
        to={`/product/${product.id}`}
      >
        <img
          className="product-card__image"
          src={product.thumbnail}
          alt={product.title}
        />
      </Link>

      <Link
        className="product-card__title-link"
        to={`/product/${product.id}`}
      >
        <h3 className="product-card__title">{product.title}</h3>
      </Link>

      <p className="product-card__price">{product.price} $</p>
    </article>
  );
}