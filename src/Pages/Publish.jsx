import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState(false);
  const [picture, setPicture] = useState();
  // const [pictureFromCloudinary, setPictureFromCloudinary] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Je crée une nouvelle instance du constructeur FormData
      const formData = new FormData();
      // Rajouter mes paires clef/valeur à mon formdata
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);
      formData.append("exchange", exchange);
      formData.append("picture", picture);

      // Je donne 3 arguments à axios.post :
      // - L'URL à interroger
      // - le body, ici un formData
      // - Les potentiels headers à envoyer : ici un token et le type du body que j'envoie
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
      console.log(response);
      // setPictureFromCloudinary(response.data.secure_url);
    } catch (error) {
      console.log(error);
    }
  };

  return token ? (
    <>
      <main className="publish-main">
        <div className="publish-container">
          <h1>Vends ton article</h1>
          <form onSubmit={handleSubmit}>
            <div className="box">
              <div className="inside-box">
                <input
                  className="input-file"
                  type="file"
                  onChange={(event) => {
                    // console.log(event);
                    setPicture(event.target.files[0]);
                  }}
                />
                {picture && (
                  <img
                    className="picture-file"
                    src={URL.createObjectURL(picture)}
                    alt="pic"
                  />
                )}
              </div>
            </div>
            <div className="text-input-section">
              <div className="text-input">
                <label htmlFor="title">Titre</label>
                <input
                  className="input-text"
                  id="title"
                  type="text"
                  placeholder="ex: Chemise Sézane verte"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <label htmlFor="description">Décris ton article</label>
                <input
                  className="input-text"
                  id="description"
                  type="text"
                  placeholder="ex: porté quelquefois, taille correctement"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="text-input-section">
              <div className="text-input">
                <label htmlFor="brand">Marque</label>
                <input
                  className="input-text"
                  id="brand"
                  type="text"
                  placeholder="ex: Zara"
                  value={brand}
                  onChange={(event) => {
                    setBrand(event.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <label htmlFor="size">Taille</label>
                <input
                  className="input-text"
                  id="size"
                  type="text"
                  placeholder="ex: L/40/42"
                  value={size}
                  onChange={(event) => {
                    setSize(event.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <label htmlFor="color">Couleur</label>
                <input
                  className="input-text"
                  id="color"
                  type="text"
                  placeholder="ex: Fushia"
                  value={color}
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <label htmlFor="condition">Etat</label>
                <input
                  className="input-text"
                  id="condition"
                  type="text"
                  placeholder="Neuf avec étiquette"
                  value={condition}
                  onChange={(event) => {
                    setCondition(event.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <label htmlFor="city">Lieu</label>
                <input
                  className="input-text"
                  id="city"
                  type="text"
                  placeholder="ex: Paris"
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="text-input-section">
              <div className="text-input">
                <label htmlFor="price">Prix</label>
                <div className="checkbox-section">
                  <input
                    className="input-text"
                    id="price"
                    type="number"
                    placeholder="0,00€"
                    value={price}
                    onChange={(event) => {
                      setPrice(event.target.value);
                    }}
                  />

                  <div className="checkbox">
                    <input
                      className="input-checkbox"
                      type="checkbox"
                      checked={exchange}
                      onChange={() => setExchange(!exchange)}
                    />
                    <span>Je suis intéressé par les échanges</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="validation">
              <input
                className="signin-submitButton"
                type="submit"
                value="Ajouter"
              />
            </div>
          </form>
        </div>
      </main>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
