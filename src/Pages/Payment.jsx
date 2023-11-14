import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm";
import { Navigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ token, idUser }) => {
  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;

  let protection = 1;
  let delivery = 2;
  let total = 0;

  total = protection + delivery + price;
  //   console.log(total);

  return token ? (
    <main className="bcg-payment">
      <div className="cart">
        <h2>Résumé de la commande</h2>

        <div className="cart-content">
          <span>Commande</span> <span>{price.toFixed(2)} €</span>
        </div>
        <div className="cart-content">
          <span>Frais protection acheteurs</span>
          <span>{protection.toFixed(2)} €</span>
        </div>
        <div className="cart-content">
          <span>Frais de port</span> <span>{delivery.toFixed(2)} €</span>
        </div>
        <div className="divider"></div>
        <div className="cart-content">
          <span className="total-amount">Total</span>
          <span className="total-amount">{total.toFixed(2)} €</span>
        </div>
        <div className="resume">
          Il ne vous reste plus qu'un étape pour vous offrir {title}. Vous allez
          payer {total} € (frais de protection et frais de port inclus)
        </div>
        <div className="divider"></div>
        <Elements stripe={stripePromise}>
          <CheckoutForm title={title} total={total} idUser={idUser} />
        </Elements>
      </div>
    </main>
  ) : (
    <Navigate to="/Login" />
  );
};

export default Payment;
