import './HeaderAction.scss';

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import searchIcon from '../../../../assets/icons/search.svg';
import favoritesIcon from '../../../../assets/icons/favorites.svg';
import cartIcon from '../../../../assets/icons/cart.svg';

export default function HeaderActions({ isCatalogPage }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || ''
  );

  const [searchOpen, setSearchOpen] = useState(isCatalogPage);
  const searchFormRef = useRef(null);

  const handleSearch = (event) => {
    event.preventDefault();

    const value = searchValue.trim();

    if (value) {
      navigate(`/catalog?search=${encodeURIComponent(value)}`);
    } else {
      navigate('/catalog');
    }
  };

  useEffect(() => {
    setSearchOpen(isCatalogPage);
  }, [isCatalogPage]);

  useEffect(() => {
    if (isCatalogPage || !searchOpen) return;

    const handleClickOutside = (event) => {
      if (
        searchFormRef.current &&
        !searchFormRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCatalogPage, searchOpen]);

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`header-actions ${isCatalogPage ? 'header-actions--catalog' : ''
        }`}
    >
      <form
        ref={searchFormRef}
        className={`header-actions__search-form ${isCatalogPage
          ? 'header-actions__search-form--catalog'
          : 'header-actions__search-form--expandable'
          } ${searchOpen ? 'is-open' : ''}`}
        onSubmit={handleSearch}
      >
        <button
          className="header-actions__search-button"
          type={isCatalogPage || searchOpen ? 'submit' : 'button'}
          aria-label="Search"
          onClick={(event) => {
            if (!isCatalogPage && !searchOpen) {
              event.preventDefault();
              setSearchOpen(true);
            }
          }}
        >
          <img src={searchIcon} alt="" />
        </button>

        <input
          type="search"
          placeholder="Search products"
          aria-label="Search products"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          tabIndex={isCatalogPage || searchOpen ? 0 : -1}
        />
      </form>

      <Link
        className="header-actions__button"
        to="/favorites"
        aria-label="Favorites"
      >
        <img src={favoritesIcon} alt="" />
      </Link>

      <Link
        className="header-actions__cart"
        to="/cart"
        aria-label={`Shopping cart, ${cartCount} items`}
      >
        <img
          className="header-actions__cart-icon"
          src={cartIcon}
          alt=""
        />

        {cartCount > 0 && (
          <>
            <span className="header-actions__cart-total">
              {cartTotal.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}$
            </span>

            <span className="header-actions__cart-count">
              {cartCount}
            </span>
          </>
        )}
      </Link>
    </div>
  );
}