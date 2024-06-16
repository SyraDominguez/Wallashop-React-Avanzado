import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./form.module.css";
import { createAd as createAdService } from "../pages/ads/service";
import { createAd } from "../store/actions/adActions";
import { getTags as fetchTags } from "../service/tagService";

export default function Form() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [includePhoto, setIncludePhoto] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [sale, setSale] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTagsData = async () => {
      const tagsData = await fetchTags();
      setAvailableTags(tagsData);
    };
    fetchTagsData();
  }, []);

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
      const response = await createAdService(adData);
      if (response && response.id) {
        dispatch(createAd({ ad: response }));
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
      <h3>Crear un nuevo anuncio</h3>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Filtra por Nombre"
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
          placeholder="Filtra por Precio"
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
        {availableTags.map((tag) => (
          <label key={tag}>
            <input
              type="checkbox"
              name="tags"
              value={tag}
              checked={tags.includes(tag)}
              onChange={handleTagsChange}
            />
            {tag}
          </label>
        ))}
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
      <button type="submit">Crear anuncio</button>
      <button type="reset" onClick={resetForm}>
        Borrar
      </button>
    </form>
  );
}
