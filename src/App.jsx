import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

import Home from "./Pages/Home";
import Offer from "./Pages/Offer";

import Header from "./Components/Header";

function App() {
  const [data, setData] = useState();
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        " https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      console.log(response.data);
      // setData(response.data);
      // setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home offers={data.offers} />} />
        <Route path="/offer" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
