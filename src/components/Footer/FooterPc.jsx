import './FooterPc.scss';

import { Link } from 'react-router-dom';

import Logo from '../Header/components/common/Logo';

export default function FooterPc() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__column">
          <h2 className="footer__title">CATALOG</h2>

          <ul className="footer__list">
            <li>
              <Link to="/catalog?category=mens-shirts">
                Men's Shirts
              </Link>
            </li>
            <li>
              <Link to="/catalog?category=womens-dresses">
                Women's Dresses
              </Link>
            </li>
            <li>
              <Link to="/catalog?category=tops">
                Tops
              </Link>
            </li>
            <li>
              <Link to="/catalog?category=mens-shoes">
                Men's Shoes
              </Link>
            </li>
            <li>
              <Link to="/catalog?category=womens-shoes">
                Women's Shoes
              </Link>
            </li>
            <li>
              <Link to="/catalog">View all products</Link>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h2 className="footer__title">INFORMATION</h2>

          <ul className="footer__list">
            <li>
              <Link to="/information">Contacts</Link>
            </li>
            <li>
              <Link to="/information">Delivery</Link>
            </li>
            <li>
              <Link to="/information">Payment</Link>
            </li>
            <li>
              <Link to="/information">FAQ</Link>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h2 className="footer__title">CONTACTS</h2>

          <div className="footer__contacts">
            <p>Contact information will be available soon.</p>
          </div>
        </div>

        <div className="footer__column footer__column--brand">
          <Logo />

          <p className="footer__copyright">
            © {new Date().getFullYear()} mbStore
          </p>
        </div>
      </div>
    </footer>
  );
}