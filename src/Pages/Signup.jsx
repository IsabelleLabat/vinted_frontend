import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
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
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: name,
          password: password,
        }
      );
      //   console.log(data);
      setData(response.data);
      //   console.log(data.token);
      //   console.log(response);

      Cookies.set("token", response.data.token, { expires: 15 });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>S'inscrire</h1>
      <input
        id="name"
        type="text"
        placeholder="Nom d'utilisateur"
        name="username"
        value={name}
        onChange={handleNameChange}
      />

      <input
        id="email"
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />

      <input
        id="password"
        type="password"
        placeholder="Mot de Passe"
        name="Password"
        value={password}
        onChange={handlePasswordChange}
      />

      <input className="submitButton" type="submit" value="S'inscrire" />
    </form>
  );
};

export default Signup;
