// src/components/FilterForm.jsx
import { useState, useEffect } from "react";
import styles from "./filterForm.module.css";
import { getTags } from "../service/tagService";
import PropTypes from "prop-types";

const FilterForm = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    name: "",
    nameOption: "contains",
    priceMin: "",
    priceMax: "",
    tags: [],
    sale: "",
  });
  const [availableTags, setAvailableTags] = useState([]);
  const [loadingTags, setLoadingTags] = useState(true);
  const [tagsError, setTagsError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsData = await getTags();
        setAvailableTags(tagsData);
      } catch (error) {
        setTagsError("Error fetching tags");
        console.error("Error fetching tags:", error);
      } finally {
        setLoadingTags(false);
      }
    };
    fetchTags();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        tags: checked
          ? [...prevFilters.tags, value]
          : prevFilters.tags.filter((tag) => tag !== value),
      }));
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      name: "",
      nameOption: "contains",
      priceMin: "",
      priceMax: "",
      tags: [],
      sale: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.filterForm}>
      <h3>Encuentra tu anuncio</h3>

      <div className={styles.radioGroup}>
        <label>
          <input
            type="radio"
            name="nameOption"
            value="startsWith"
            checked={filters.nameOption === "startsWith"}
            onChange={handleChange}
          />
          Empieza por
        </label>
        <label>
          <input
            type="radio"
            name="nameOption"
            value="contains"
            checked={filters.nameOption === "contains"}
            onChange={handleChange}
          />
          Contiene
        </label>
      </div>
      <input
        type="text"
        name="name"
        placeholder="Filtra por Nombre"
        value={filters.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="priceMin"
        placeholder="Precio mínimo"
        value={filters.priceMin}
        onChange={handleChange}
      />
      <input
        type="number"
        name="priceMax"
        placeholder="Precio máximo"
        value={filters.priceMax}
        onChange={handleChange}
      />
      <div>
        {loadingTags ? (
          <p>Loading tags...</p>
        ) : tagsError ? (
          <p>{tagsError}</p>
        ) : (
          Array.isArray(availableTags) &&
          availableTags.map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                name="tags"
                value={tag}
                checked={filters.tags.includes(tag)}
                onChange={handleChange}
              />
              {tag}
            </label>
          ))
        )}
      </div>
      <label>
        <input
          type="radio"
          name="sale"
          value="true"
          checked={filters.sale === "true"}
          onChange={handleChange}
        />
        Venta
      </label>
      <label>
        <input
          type="radio"
          name="sale"
          value="false"
          checked={filters.sale === "false"}
          onChange={handleChange}
        />
        Compra
      </label>
      <button type="submit">Filtrar</button>
      <button
        type="button"
        onClick={handleReset}
        className={styles.resetButton}
      >
        Borrar
      </button>
    </form>
  );
};

FilterForm.propTypes = { onFilterChange: PropTypes.func.isRequired };

export default FilterForm;
