import './Header.scss';

import { useLocation } from 'react-router-dom';

import HeaderPc from './HeaderPc';
import HeaderMobile from './HeaderMobile';

export default function Header() {
  const location = useLocation();

  const isCatalogPage =
    location.pathname === '/catalog' ||
    location.pathname.startsWith('/catalog/');

  return (
    <>
      <div className="header-pc">
        <HeaderPc isCatalogPage={isCatalogPage} />
      </div>

      <div className="header-mobile">
        <HeaderMobile />
      </div>
    </>
  );
}
