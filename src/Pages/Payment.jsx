import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = () => {
  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;

  let protection = 1;
  let delivery = 2;
  let total = 0;

  total = protection + delivery + price;
  //   console.log(total);

  return (
    <>
      <div className="cart">
        <div>{title}</div>
        <div> Commande {price.toFixed(2)} €</div>
        <div> Frais protection acheteurs {protection.toFixed(2)} €</div>
        <div> Frais de port {delivery.toFixed(2)} €</div>
        <div>Total {total.toFixed(2)} €</div>
        <div>
          Il ne vous reste plus qu'un étape pour vous offrir {title}. Vous allez
          payer {total} € (frais de protection et frais de port inclus)
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm title={title} price={price} />
        </Elements>
      </div>
    </>
  );
};

export default Payment;
