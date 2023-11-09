import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ params }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div>
      <div className="bcg-banner">
        <div>
          <div className="home-hero-box">
            Prêts à faire du tri dans vos placards ?
            <button>Commencer à vendre</button>
          </div>
        </div>
      </div>

      <div className="home-wrapper">
        {data.offers.map((offer) => {
          // console.log(offer);

          return (
            <Link to={`/offers/${offer._id}`} key={offer._id}>
              <div className="card-offer">
                <div className="owner">
                  <img
                    src={offer.owner.account.avatar.secure_url}
                    alt="avatar img"
                  />

                  <p>{offer.owner.account.username}</p>
                </div>

                <img
                  className="offer-img"
                  src={offer.product_image.url}
                  alt="image produit"
                />
                <p>{offer.product_price} €</p>
                <p className="details">{offer.product_details[1].TAILLE}</p>
                <p className="details">{offer.product_details[0].MARQUE}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
