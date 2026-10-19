import './NavigationDropdown.scss';

import { Link } from 'react-router-dom';

export default function NavigationDropdown({ items, title }) {
  return (
    <div className="navigation-dropdown">
      <div className="navigation-dropdown__content">
        <p className="navigation-dropdown__title">{title}</p>

        <ul className="navigation-dropdown__list">
          {items.map((item) => (
            <li
              className="navigation-dropdown__item"
              key={item.label}
            >
              <Link
                className="navigation-dropdown__link"
                to={item.to}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li
            className="navigation-dropdown__item"
          >
            <Link
              className="navigation-dropdown__link"
              to='/catalog'
            >
              Catalog
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}