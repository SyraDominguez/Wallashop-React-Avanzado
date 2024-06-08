import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button.jsx";
import styles from "./form.module.css";
import { createAd } from "../pages/ads/service.js";
import { getTags } from "../services/tagService.jsx";

export default function Form() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [includePhoto, setIncludePhoto] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [sale, setSale] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTags();
        setTags(tags);
      } catch (error) {
        console.error("Error fetching tags", error);
      }
    };

    fetchTags();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleTagChange = (e) => {
    const tag = e.target.value;
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const adData = new FormData();
    adData.append("name", name);
    adData.append("price", parseFloat(price));
    adData.append("sale", sale);
    selectedTags.forEach((tag) => adData.append("tags", tag));

    if (includePhoto && photo) {
      adData.append("photo", photo);
    }

    try {
      const response = await createAd(adData);
      console.log(response); // Debugging purposes
      if (response && response.id) {
        alert(`Anuncio creado con éxito`);
        localStorage.setItem("lastAdId", response.id.toString());
        navigate(`/ads/${response.id}`);
      } else {
        alert("Anuncio creado con éxito, pero no se proporcionó un ID.");
        navigate("/ads");
      }
      resetForm();
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
    setSelectedTags([]);
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
        <br />
        <br />
        <div>
          {tags.map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={handleTagChange}
              />
              {tag}
            </label>
          ))}
        </div>
        <br />
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
