import { useState } from "react";
import Button from "../components/button.jsx";
import styles from "./form.module.css";

export default function Form() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState([]);
  // const [photo, setPhoto] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleTagsChange = (e) => {
    if (e.target.checked) {
      setTags((prevTags) => [...prevTags, e.target.value]);
    } else {
      setTags((prevTags) => prevTags.filter((tag) => tag !== e.target.value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setType("");
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
        <label htmlFor="description">Descripción breve:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
      </div>

      <div>
        <label htmlFor="type">Tipo:</label>
        <select id="type" value={type} onChange={handleTypeChange} required>
          <option value="">Seleccione una opción</option>
          <option value="venta">Venta</option>
          <option value="compra">Compra</option>
        </select>
      </div>

      <div>
        <label>Tags:</label>
        <label>
          <input
            type="checkbox"
            name="tags"
            value="lifestyle"
            checked={tags.includes("lifestyle")}
            onChange={handleTagsChange}
            required
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
        <label htmlFor="photo">Foto:</label>
        <input type="file" id="photo" onChange={handlePhotoChange} />
      </div>

      <Button type="submit">Crear anuncio</Button>
      <Button type="reset" onClick={resetForm}>
        Borrar
      </Button>
    </form>
  );
}
