import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <Link to={"/"}>
          <img
            src="https://lereacteur-vinted.netlify.app/static/media/logo.10b0caad793dd0a8ea72.png"
            alt=""
          />
        </Link>

        <input
          className="search-input"
          type="search"
          placeholder="Rechercher des articles"
        />
        <button className="header-button">S'inscrire</button>
        <button className="header-button">Se connecter</button>
        <button className=" header-button sell-button">
          Vends tes articles
        </button>
      </div>
    </header>
  );
};

export default Header;
