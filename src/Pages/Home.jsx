const Home = ({ offers, isLoading }) => {
  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div>
      {offers.map((offer) => {
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
