import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ params, searchTerm, token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const [avatarImg, setavatarImg] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/offers?title=${searchTerm}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [searchTerm]);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div>
      <div className="bcg-banner">
        <div>
          <div className="home-hero-box">
            Prêts à faire du tri dans vos placards ?
            {token ? (
              <Link to={"/publish"}>
                <button>Commencer à vendre</button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button>Commencer à vendre</button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="home-wrapper">
        {data.offers.map((offer) => {
          console.log(offer);

          return (
            <Link to={`/offers/${offer._id}`} key={offer._id}>
              <div className="card-offer">
                <div className="owner">
                  {offer.owner.account.avatar ? (
                    <img
                      className="avatar"
                      src={offer.owner.account.avatar.secure_url}
                      alt="avatar"
                    />
                  ) : null}
                  <p className="home-username">
                    {offer.owner.account.username}
                  </p>
                </div>

                <img
                  className="offer-img-home"
                  src={offer.product_image.secure_url}
                  alt="produit"
                />
                <p className="home-price">{offer.product_price} €</p>
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
