import './HeaderPc.scss';

import Logo from './components/common/Logo';
import Navigation from './components/desktop/Navigation';
import HeaderActions from './components/common/HeaderActions';

export default function HeaderPc({ isCatalogPage }) {
  return (
    <header
      className={`header-pc__inner ${isCatalogPage ? 'header-pc__inner--catalog' : ''
        }`}
    >
      <Logo />

      {!isCatalogPage && <Navigation />}

      <HeaderActions isCatalogPage={isCatalogPage} />
    </header>
  );
}
