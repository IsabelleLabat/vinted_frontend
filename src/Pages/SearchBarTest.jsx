import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchBarTest = ({ token, handleToken }) => {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSearchTerm = (event) => {
    let value = event.target.value;
    value.length > 2 && setSearchTerm(value);
  };

  console.log(searchTerm);

  return isLoading ? (
    <span>Loading</span>
  ) : (
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
          type="search"
          placeholder="Rechercher des articles"
          onChange={handleSearchTerm}
        />

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
            </Link>{" "}
          </>
        )}

        <button className=" header-button sell-button">
          Vends tes articles
        </button>
      </div>

      <div>
        {data.offers
          .filter((val) => {
            return val.product_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          })
          .map((val) => {
            console.log(val);
            return <div key={val._id}>{val.product_name}</div>;
          })}
      </div>
    </header>
  );
};

export default SearchBarTest;
