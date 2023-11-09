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

      <div className="datails-product">
        <p>{data.product_price}</p>
        {data.product_details.map((detail) => {
          //   return (
          //     <div key={detail.index}>
          //       <p> {detail.MARQUE}</p>
          //       <p> {detail.TAILLE}</p>
          //       <p> {detail.ÉTAT}</p>
          //       <p> {detail.COULEUR}</p>
          //       <p> {detail.EMPLACEMENT}</p>
          //     </div>
          //   );
        })}

        <p>{data.product_name}</p>
        <p>{data.product_description}</p>
        <img
          className="offer-img"
          src={data.owner.account.avatar.secure_url}
          alt=""
        />
        <p>{data.owner.account.username}</p>
      </div>
    </main>
  );
};

export default Offer;
