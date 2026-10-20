import './HeaderMobile.scss';

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Logo from './components/common/Logo';

import downArrowIcon from '../../assets/icons/downArrow.svg';
import searchIcon from '../../assets/icons/search.svg';
import favoritesIcon from '../../assets/icons/favorites.svg';
import cartIcon from '../../assets/icons/cart.svg';

export default function HeaderMobile({ isCatalogPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [openCategory, setOpenCategory] = useState(null);

  const headerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        setSearchOpen(false);
        setOpenCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const handleSearch = (event) => {
    event.preventDefault();

    const value = searchValue.trim();

    navigate(
      value
        ? `/catalog?search=${encodeURIComponent(value)}`
        : '/catalog'
    );

    setSearchOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="header-mobile__inner"
    >
      {menuOpen && (
        <button
          type="button"
          className="header-mobile__overlay"
          aria-label="Close menu"
          onClick={() => {
            setMenuOpen(false);
            setOpenCategory(null);
          }}
        />
      )}

      <div className={`header-mobile__bar ${searchOpen ? 'is-search-open' : ''}`}>
        <button
          className="header-mobile__icon-button"
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => {
            setMenuOpen(!menuOpen);
            setSearchOpen(false);
          }}
        >
          <span className={`header-mobile__burger ${menuOpen ? 'is-open' : ''}`}>
            <span />
            <span />
          </span>
        </button>

        <form
          className={`header-mobile__search-inline ${searchOpen ? 'is-open' : ''}`}
          onSubmit={handleSearch}
        >
          <button
            className="header-mobile__search-trigger"
            type={searchOpen ? 'submit' : 'button'}
            aria-label={searchOpen ? 'Submit search' : 'Open search'}
            onClick={(event) => {
              if (!searchOpen) {
                event.preventDefault();
                setSearchOpen(true);
                setMenuOpen(false);
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
            tabIndex={searchOpen ? 0 : -1}
          />
        </form>

        <Link
          to="/"
          className={`header-mobile__logo ${searchOpen ? 'is-hidden' : ''}`}
          aria-label="XWEAR home"
        >
          <Logo />
        </Link>

        <div className="header-mobile__actions">
          <Link to="/favorites" className="header-mobile__action" aria-label="Favorites">
            <img src={favoritesIcon} alt="" />
          </Link>

          <Link to="/profile" className="header-mobile__action" aria-label="Profile">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
            </svg>
          </Link>

          <Link
            to="/cart"
            className="header-mobile__action header-mobile__cart"
            aria-label={`Shopping cart, ${cartCount} items`}
          >
            <img src={cartIcon} alt="" />
            {cartCount > 0 && (
              <span className="header-mobile__cart-count">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>

      <nav
        className={`header-mobile__menu ${menuOpen ? 'is-open' : ''}`}
        aria-label="Main navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        {[
          {
            label: 'Clothing',
            items: [
              { label: "Men's Shirts", to: '/catalog?category=mens-shirts' },
              { label: "Women's Dresses", to: '/catalog?category=womens-dresses' },
              { label: 'Tops', to: '/catalog?category=tops' },
            ],
          },
          {
            label: 'Shoes',
            items: [
              { label: "Men's Shoes", to: '/catalog?category=mens-shoes' },
              { label: "Women's Shoes", to: '/catalog?category=womens-shoes' },
            ],
          },
          {
            label: 'Brands',
            items: [
              { label: 'All brands', to: '/brands' },
            ],
          },
        ].map((item) => (
          <div className="header-mobile__menu-group" key={item.label}>
            <button
              className="header-mobile__menu-toggle"
              type="button"
              aria-expanded={openCategory === item.label}
              onClick={() =>
                setOpenCategory(
                  openCategory === item.label ? null : item.label
                )
              }
            >
              {item.label}
              <span className={openCategory === item.label ? 'is-open' : ''}>
                <img src={downArrowIcon} alt="" />
              </span>
            </button>

            <div
              className={`header-mobile__submenu ${openCategory === item.label ? 'is-open' : ''
                }`}
              aria-hidden={openCategory !== item.label}
              inert={openCategory !== item.label}
            >
              {item.items.map((subItem) => (
                <Link
                  key={subItem.to}
                  to={subItem.to}
                  onClick={() => {
                    setMenuOpen(false);
                    setOpenCategory(null);
                  }}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <Link
          className="header-mobile__menu-link"
          to="/information"
          onClick={() => setMenuOpen(false)}
        >
          Information
        </Link>

        <Link
          className="header-mobile__menu-link"
          to="/catalog"
          onClick={() => setMenuOpen(false)}
        >
          Catalog
        </Link>
      </nav>
    </header>
  );
}