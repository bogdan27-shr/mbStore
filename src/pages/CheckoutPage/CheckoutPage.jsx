
import './CheckoutPage.scss';

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  // Buy Now передаст свой товар через location.state.
  // Обычный Checkout возьмёт товары из корзины.
  const orderItems = location.state?.items ?? cartItems;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    postalCode: '',
    delivery: 'standard',
    payment: 'cash',
    comment: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const totalPrice = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalQuantity = orderItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const deliveryPrice =
    formData.delivery === 'express' ? 10 : 0;

  const finalPrice = totalPrice + deliveryPrice;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Пока это демонстрация оформления заказа.
    // Реальную отправку добавим после настройки Strapi.
    setSubmitted(true);
  }

  if (orderItems.length === 0) {
    return (
      <div className="checkout-page">
        <Header />

        <main className="checkout-page__main">
          <h1>YOUR ORDER</h1>
          <p>Your cart is empty.</p>

          <Link to="/catalog" className="checkout-page__back">
            GO TO CATALOG
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Header />

      <main className="checkout-page__main">
        <nav className="checkout-page__breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/cart">Cart</Link>
          <span>/</span>
          <span>Checkout</span>
        </nav>

        <h1 className="checkout-page__title">
          CHECKOUT
        </h1>

        {submitted ? (
          <section className="checkout-success">
            <h2>THANK YOU!</h2>

            <p>
              Your checkout form has been completed successfully.
            </p>

            <p>
              This is a demo only. Your order has not been sent
              to the store, and no payment has been made.
            </p>

            <button
              type="button"
              onClick={() => navigate('/catalog')}
            >
              CONTINUE SHOPPING
            </button>
          </section>
        ) : (
          <form
            className="checkout-layout"
            onSubmit={handleSubmit}
          >
            <div className="checkout-form">
              <section className="checkout-section">
                <h2>CONTACT INFORMATION</h2>

                <div className="checkout-fields checkout-fields--two">
                  <label>
                    First name *
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                      required
                    />
                  </label>

                  <label>
                    Last name *
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                      required
                    />
                  </label>

                  <label>
                    Email *
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                    />
                  </label>

                  <label>
                    Phone *
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      required
                    />
                  </label>
                </div>
              </section>

              <section className="checkout-section">
                <h2>SHIPPING ADDRESS</h2>

                <div className="checkout-fields">
                  <label>
                    Country *
                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      autoComplete="country-name"
                      required
                    />
                  </label>

                  <label>
                    City *
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      autoComplete="address-level2"
                      required
                    />
                  </label>

                  <label>
                    Street address *
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      autoComplete="street-address"
                      required
                    />
                  </label>

                  <label>
                    Postal code *
                    <input
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      autoComplete="postal-code"
                      required
                    />
                  </label>
                </div>
              </section>

              <section className="checkout-section">
                <h2>DELIVERY METHOD</h2>

                <label className="checkout-option">
                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    checked={formData.delivery === 'standard'}
                    onChange={handleChange}
                  />

                  <span>
                    <strong>Standard delivery</strong>
                    <small>Free delivery</small>
                  </span>

                  <strong>FREE</strong>
                </label>

                <label className="checkout-option">
                  <input
                    type="radio"
                    name="delivery"
                    value="express"
                    checked={formData.delivery === 'express'}
                    onChange={handleChange}
                  />

                  <span>
                    <strong>Express delivery</strong>
                    <small>Faster delivery</small>
                  </span>

                  <strong>$10.00</strong>
                </label>
              </section>

              <section className="checkout-section">
                <h2>PAYMENT METHOD</h2>

                <label className="checkout-option">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={formData.payment === 'cash'}
                    onChange={handleChange}
                  />

                  <span>
                    <strong>Cash on delivery</strong>
                    <small>Pay when your order arrives</small>
                  </span>
                </label>

                <label className="checkout-option">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={formData.payment === 'online'}
                    onChange={handleChange}
                  />

                  <span>
                    <strong>Online payment</strong>
                    <small>
                      Payment provider integration required
                    </small>
                  </span>
                </label>
              </section>

              <section className="checkout-section">
                <h2>ORDER NOTES</h2>

                <label>
                  Comment (optional)
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Any special instructions?"
                  />
                </label>
              </section>
            </div>

            <aside className="checkout-summary">
              <h2>YOUR ORDER</h2>

              <div className="checkout-summary__items">
                {orderItems.map((item) => (
                  <div
                    className="checkout-summary__item"
                    key={item.id}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                    />

                    <div>
                      <p>{item.title}</p>

                      {item.selectedSize && (
                        <span>Size: {item.selectedSize}</span>
                      )}
                      <br/>
                      <span>Qty: {item.quantity}</span>
                    </div>

                    <strong>
                      {(item.price * item.quantity).toFixed(2)} $
                    </strong>
                  </div>
                ))}
              </div>

              <div className="checkout-summary__row">
                <span>Products ({totalQuantity})</span>
                <span>{totalPrice.toFixed(2)} $</span>
              </div>

              <div className="checkout-summary__row">
                <span>Delivery</span>
                <span>
                  {deliveryPrice === 0
                    ? 'FREE'
                    : `${deliveryPrice.toFixed(2)} $`}
                </span>
              </div>

              <div className="checkout-summary__total">
                <span>Total</span>
                <strong>{finalPrice.toFixed(2)} $</strong>
              </div>

              <button
                className="checkout-summary__submit"
                type="submit"
              >
                PLACE ORDER
              </button>

              <p className="checkout-summary__notice">
                Demo checkout. No payment will be processed.
              </p>
            </aside>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}