import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button.jsx";
import styles from "./form.module.css";
import { createAd } from "../pages/ads/service.js";

export default function Form() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [includePhoto, setIncludePhoto] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [sale, setSale] = useState(true);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleTagsChange = (e) => {
    if (e.target.checked) {
      setTags((prevTags) => [...prevTags, e.target.value]);
    } else {
      setTags((prevTags) => prevTags.filter((tag) => tag !== e.target.value));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const adData = new FormData();
    adData.append("name", name);
    adData.append("price", parseFloat(price));
    adData.append("tags", tags);
    adData.append("sale", sale);

    if (includePhoto && photo) {
      adData.append("photo", photo);
    }

    try {
      const response = await createAd(adData);
      console.log(response); // Agrega este console.log para verificar la estructura de la respuesta
      if (response && response.id) {
        alert(`Anuncio creado con éxito`);
        localStorage.setItem("lastAdId", response.id.toString());
      } else {
        alert("Anuncio creado con éxito, pero no se proporcionó un ID.");
      }
      resetForm();
      navigate("/ads");
    } catch (error) {
      console.error("Error al crear el anuncio:", error);
      alert("Hubo un error al crear el anuncio. Inténtalo de nuevo más tarde.");
    }
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setTags([]);
    setPhoto(null);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.newAdsPage}>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="price">Precio:</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={handlePriceChange}
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includePhoto}
            onChange={() => setIncludePhoto(!includePhoto)}
          />
          Incluir foto del artículo?
        </label>
      </div>
      {includePhoto ? (
        <div>
          <label htmlFor="photo">Foto:</label>
          <input type="file" id="photo" onChange={handlePhotoChange} />
        </div>
      ) : (
        <div className={styles.photoPlaceholder}>
          <p>¡No has incluido una foto!</p>
        </div>
      )}

      <div>
        <label>Tags:</label>
        <label>
          <input
            type="checkbox"
            name="tags"
            value="lifestyle"
            checked={tags.includes("lifestyle")}
            onChange={handleTagsChange}
          />
          Lifestyle
        </label>
        <label>
          <input
            type="checkbox"
            name="tags"
            value="home"
            checked={tags.includes("home")}
            onChange={handleTagsChange}
          />
          Home
        </label>
        <label>
          <input
            type="checkbox"
            name="tags"
            value="motor"
            checked={tags.includes("motor")}
            onChange={handleTagsChange}
          />
          Motor
        </label>
        <label>
          <input
            type="checkbox"
            name="tags"
            value="work"
            checked={tags.includes("work")}
            onChange={handleTagsChange}
          />
          Work
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            name="sale"
            value="true"
            checked={sale}
            onChange={() => setSale(true)}
          />
          Venta
        </label>
        <label>
          <input
            type="radio"
            name="sale"
            value="false"
            checked={!sale}
            onChange={() => setSale(false)}
          />
          Compra
        </label>
      </div>

      <Button type="submit">Crear anuncio</Button>
      <Button type="reset" onClick={resetForm}>
        Borrar
      </Button>
    </form>
  );
}
