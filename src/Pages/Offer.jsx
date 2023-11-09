import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <main>
      {/* <h1>Je suis sur la page Offer</h1> */}
      {/* <Link to="/">Cliquez ici pour naviguer vers la page Home</Link> */}
      {/* <p> The product id is : {id}</p> */}
      <div>
        <img className="offer-img" src={data.product_image.secure_url} alt="" />
      </div>

      <div className="details-product" key={data._id}>
        <p className="offer-price">{data.product_price} € </p>
        {data.product_details.map((detail) => {
          //   console.log(detail);
          const clefs = Object.keys(detail);
          //   console.log(clefs);
          const clef = clefs[0];
          //   console.log(clef);
          return (
            <div key={clef}>
              <span className="key-details">{clef} : </span>
              <span className="offer-details">{detail[clef]}</span>
            </div>
          );
        })}
        <div className="separator"></div>
        <p className="offer-product-name">{data.product_name}</p>
        <p className="offer-product-description">{data.product_description}</p>

        <div className="offer-owner">
          <img
            className="offer-avatar"
            src={data.owner.account.avatar.secure_url}
            alt=""
          />
          <p>{data.owner.account.username}</p>
        </div>
      </div>
    </main>
  );
};

export default Offer;
