import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ title, total, idUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  //   console.log(idUser);

  const stripe = useStripe();

  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: `${idUser}`,
      });

      const StripeToken = stripeResponse.token.id;

      const response = await axios.post("http://localhost:3000/payment", {
        token: StripeToken,
        title: title,
        amount: total,
      });
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
      <CardElement />

      {succeeded ? (
        <p>Paiement validé, merci pour votre achat !</p>
      ) : (
        <input
          className="payment-button"
          type="submit"
          value="Pay"
          disabled={isLoading}
        />
      )}
    </form>
  );
};

export default CheckoutForm;
