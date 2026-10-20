import './CartPage.scss';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import emptyCartIcon from '../../assets/icons/emptyCart.svg';

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../../features/cart/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <Header />

      <main className="cart-page__main">
        <nav className="cart-page__breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Cart</span>
        </nav>

        <h1 className="cart-page__title">SHOPPING CART</h1>

        {cartItems.length === 0 ? (
          <div className="cart-page__empty">
            <img src={emptyCartIcon} alt="" />

            <h2>YOUR CART IS CURRENTLY EMPTY.</h2>

            <p>
              Before proceeding to checkout, you must add some
              products to your cart.
            </p>
            <p>
              Visit our catalog to find lots of interesting products.
            </p>

            <Link
              className="cart-page__catalog-link"
              to="/catalog"
            >
              GO TO CATALOG
            </Link>
          </div>
        ) : (
          <div className="cart-page__content">
            <div className="cart-page__items">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <Link
                    className="cart-item__image-link"
                    to={`/product/${item.id}`}
                  >
                    <img
                      className="cart-item__image"
                      src={item.thumbnail}
                      alt={item.title}
                    />
                  </Link>

                  <div className="cart-item__info">
                    <Link
                      className="cart-item__name"
                      to={`/product/${item.id}`}
                    >
                      {item.title}
                    </Link>

                    <p className="cart-item__price">
                      {item.price.toFixed(2)} $
                    </p>

                    <div className="cart-item__controls">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.title}`}
                        onClick={() =>
                          dispatch(decreaseQuantity(item.id))
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.title}`}
                        onClick={() =>
                          dispatch(increaseQuantity(item.id))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item__right">
                    <strong>
                      {(item.price * item.quantity).toFixed(2)} $
                    </strong>

                    <button
                      className="cart-item__remove"
                      type="button"
                      onClick={() =>
                        dispatch(removeFromCart(item.id))
                      }
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="cart-summary">
              <h2>ORDER SUMMARY</h2>

              <div className="cart-summary__row">
                <span>Products ({cartItems.reduce(
                  (count, item) => count + item.quantity,
                  0
                )})</span>
                <span>{totalPrice.toFixed(2)} $</span>
              </div>

              <div className="cart-summary__total">
                <span>Total</span>
                <strong>{totalPrice.toFixed(2)} $</strong>
              </div>

              <button
                className="cart-summary__checkout"
                type="button"
                onClick={() => navigate('/checkout')}
              >
                PROCEED TO CHECKOUT
              </button>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}