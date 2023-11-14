import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Cookies from "js-cookie";
import { useState } from "react";

// Pages
import Home from "./Pages/Home";
import Offer from "./Pages/Offer";
import Signup from "./Pages/Signup";
import Login from "./Pages/login";
import Publish from "./Pages/Publish";
import Payment from "./Pages/Payment";

// Components
import Header from "./Components/Header";

function App() {
  // State dans lequel je stocke le token. Sa valeur de base sera :
  // - Si je trouve un cookie token, ce cookie
  // - Sinon, null
  const [token, setToken] = useState(
    Cookies.get("token") || null
    // Cookies.get("token") ? Cookies.get("token") : null
  );
  const [idUser, setIdUser] = useState(Cookies.get("idUser") || null);

  const [searchTerm, setSearchTerm] = useState("");
  // Cette fonction permet de stocker le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handleToken = (token, idUser) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      Cookies.set("idUser", idUser, { expires: 15 });
      setToken(token);
      setIdUser(idUser);
    } else {
      Cookies.remove("token");
      Cookies.remove("idUser");
      setToken(null);
      setIdUser(null);
    }
  };

  return (
    <Router>
      {/* Je peux passer des props à mes composants */}
      <Header
        token={token}
        search={searchTerm}
        setSearchTerm={setSearchTerm}
        handleToken={handleToken}
        idUser={idUser}
      />
      <Routes>
        <Route
          path="/"
          element={<Home searchTerm={searchTerm} toke={token} />}
        />
        <Route path="/offers/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={<Signup handleToken={handleToken} idUser={idUser} />}
        />
        <Route
          path="/login"
          element={<Login handleToken={handleToken} idUser={idUser} />}
        />
        <Route
          path="/publish"
          element={<Publish token={token} idUser={idUser} />}
        />
        <Route
          path="/payment"
          element={<Payment token={token} idUser={idUser} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
