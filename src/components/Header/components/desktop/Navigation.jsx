import './Navigation.scss';

import downArrowIcon from '../../../../assets/icons/downArrow.svg';
import NavigationDropdown from './NavigationDropdown';

import { Link } from 'react-router-dom';

//выпадающие списки в хедере start
const navigationItems = [
  {
    label: 'Clothing',
    dropdownTitle: 'Clothing',
    dropdownItems: [
      { label: "Men's Shirts", to: '/catalog?category=mens-shirts' },
      { label: "Women's Dresses", to: '/catalog?category=womens-dresses' },
      { label: 'Tops', to: '/catalog?category=tops' },
    ],
  },
  {
    label: 'Shoes',
    dropdownTitle: 'Shoes',
    dropdownItems: [
      { label: "Men's Shoes", to: '/catalog?category=mens-shoes' },
      { label: "Women's Shoes", to: '/catalog?category=womens-shoes' },
    ],
  },
  {
    label: 'Brands',
    dropdownTitle: 'Brands',
    dropdownItems: [
      { label: 'All brands', to: '/brands' },
    ],
  },
];
//выпадающие списки в хедере end

export default function Navigation() {
  return (
    <nav className="navigation" aria-label="Main navigation">
      <ul className="navigation__list">
        {navigationItems.map((item) => (
          <li className="navigation__item" key={item.label}>
            <button
              className="navigation__button"
              type="button"
              aria-haspopup="true"
            >
              {item.label}
              <img src={downArrowIcon} alt="" />
            </button>

            <NavigationDropdown
              title={item.dropdownTitle}
              items={item.dropdownItems}
            />
          </li>
        ))}

        <li className="navigation__item">
          <Link
            className="navigation__link"
            to='/information'
          >
            Information
          </Link>
        </li>

        <li className="navigation__item">
          <Link
            className="navigation__link"
            to='/catalog'
          >
            Catalog
          </Link>
        </li>
      </ul>
    </nav>
  );
}