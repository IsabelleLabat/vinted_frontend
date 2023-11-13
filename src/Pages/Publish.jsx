import { useState } from "react";
import axios from "axios";

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
  const [pictureFromCloudinary, setPictureFromCloudinary] = useState();

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
      console.log(response);
      setPictureFromCloudinary(response.data.secure_url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(event) => {
            // console.log(event);
            setPicture(event.target.files[0]);
          }}
        />
        <label htmlFor="title">Titre</label>
        <input
          id="title"
          type="text"
          placeholder="ex: Chemise Sézane verte"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label htmlFor="description">Décris ton article</label>
        <input
          id="description"
          type="text"
          placeholder="ex: porté quelqufois, taille correctement"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <label htmlFor="brand">Marque</label>
        <input
          id="brand"
          type="text"
          placeholder="ex: Zara"
          value={brand}
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <label htmlFor="size">Taille</label>
        <input
          id="size"
          type="text"
          placeholder="ex: L/40/42"
          value={size}
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <label htmlFor="color">Couleur</label>
        <input
          id="color"
          type="text"
          placeholder="ex: Fushia"
          value={color}
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <label htmlFor="condition">Etat</label>
        <input
          id="condition"
          type="text"
          placeholder="Neuf avec étiquette"
          value={condition}
          onChange={(event) => {
            setCondition(event.target.value);
          }}
        />
        <label htmlFor="city">Lieu</label>
        <input
          id="city"
          type="text"
          placeholder="ex: Paris"
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <label htmlFor="price">Prix</label>
        <input
          id="price"
          type="number"
          placeholder="0,00€"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <input
          type="checkbox"
          checked={exchange}
          onChange={() => setExchange(!exchange)}
        />
        <span>Je suis intéressé par les échanges</span>
        <input type="submit" value="Ajouter" />
      </form>
      {pictureFromCloudinary && <img src={pictureFromCloudinary} alt="offer" />}
    </>
  );
};

export default Publish;
