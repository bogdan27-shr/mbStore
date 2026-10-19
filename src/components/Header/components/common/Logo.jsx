import logoIcon from "../../../../assets/icons/logo.svg";

import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Main page">
      <img src={logoIcon} alt="Logo" />
    </Link>
  );
}