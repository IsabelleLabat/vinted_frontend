import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    console.log(event);
    // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email: email,
        password: password,
      });

      // if ((password, email)) {
      //   Cookies.set("token", response.data.token, { expires: 15 });
      // } else {
      //   alert("Vous n'êtes pas inscrit");
      // }
      console.log(response.data);
      // Cookies.set("token", response.data.token);
      handleToken(response.data.token);
      navigate("/publish");
    } catch (error) {
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Merci de remplir tous les champs");
      } else if (error.response.status === 401) {
        setErrorMessage("Email ou mot de passe invalide");
      }
      console.log(error);
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h1>Se Connecter</h1>

      <input
        className="signup-input"
        id="email"
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />

      <input
        className="signup-input"
        id="password"
        type="password"
        placeholder="Mot de Passe"
        name="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <input
        className="signin-submitButton"
        type="submit"
        value="Se connecter"
      />
    </form>
  );
};

export default Login;
