import { useState, useEffect } from "react";
import styles from "./filterForm.module.css";
import { getTags } from "../service/tagService";

import PropTypes from "prop-types";

const FilterForm = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    name: "",
    price: "",
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
        console.log("Tags data:", tagsData); // Verifica que los datos se obtengan correctamente
        if (Array.isArray(tagsData)) {
          setAvailableTags(tagsData);
        } else {
          setTagsError("Unexpected tags data format");
        }
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

  return (
    <form onSubmit={handleSubmit} className={styles.filterForm}>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={filters.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={filters.price}
        onChange={handleChange}
      />
      <div>
        {loadingTags ? (
          <p>Loading tags...</p>
        ) : tagsError ? (
          <p>{tagsError}</p>
        ) : (
          availableTags.length > 0 && // Verifica que availableTags no esté vacío
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
    </form>
  );
};

FilterForm.propTypes = { onFilterChange: PropTypes.func.isRequired };

export default FilterForm;
