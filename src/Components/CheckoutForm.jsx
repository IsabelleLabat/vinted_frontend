import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ title, price }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const stripe = useStripe();

  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'utilisateur",
      });

      const StripeToken = stripeResponse.token.id;

      //   Je fais une requête à mon back et je lui envoie mon stripeToken

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: StripeToken,
          title: { title },
          amount: { price },
        }
      );
      console.log(response.data);

      if (response.data.status === "succeeded") {
        setSucceeded(true);
      } else {
        setIsLoading(false);
      }

      //   console.log(stripeToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Formulaire de paiement</h1>
      <CardElement />

      {succeeded ? (
        <p>Paiement validé</p>
      ) : (
        <input type="submit" value="Pay" disabled={isLoading} />
      )}
    </form>
  );
};

export default CheckoutForm;
