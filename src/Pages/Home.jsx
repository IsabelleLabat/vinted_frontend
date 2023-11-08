import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        " https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      // console.log(response.data);
      // setData(response.data);
      // setIsLoading(false);
    };

    fetchData();
  }, []);
  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div>
      {data.offers.map((offer) => {
        console.log(offer);

        <div key={offer.id}>
          <h2>{offer.product_name}</h2>
          <p>{offer.product_description}</p>
        </div>;
      })}
    </div>
  );
};

export default Home;
