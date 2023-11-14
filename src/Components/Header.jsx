import { Link } from "react-router-dom";

const Header = ({ token, handleToken, searchTerm, setSearchTerm }) => {
  return (
    <header>
      <div className="navigation">
        <Link to={"/"}>
          <img
            className="logo"
            src="https://lereacteur-vinted.netlify.app/static/media/logo.10b0caad793dd0a8ea72.png"
            alt=""
          />
        </Link>

        <input
          className="search-input"
          type="text"
          value={searchTerm}
          placeholder="Rechercher des articles"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />

        {/* <input type="range" min="0" max="400" /> */}

        {/* Si token existe, c'est que je suis connecté, j'affiche le bouton déconnexion, sinon j'affiche les 2 autres boutons */}
        {token ? (
          <button
            className="header-button disconnect"
            onClick={() => {
              // Je me déconnecte en appelant la fonction handleToken et en lui donnant null en argument
              handleToken(null);
            }}
          >
            Déconnexion
          </button>
        ) : (
          <>
            <Link to={"/signup"}>
              <button className="header-button">S'inscrire</button>
            </Link>
            <Link to={"/login"}>
              <button className="header-button">Se connecter</button>
            </Link>
          </>
        )}

        <Link to={token ? "/publish" : "/login"}>
          <button className=" header-button sell-button">
            Vends tes articles
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
