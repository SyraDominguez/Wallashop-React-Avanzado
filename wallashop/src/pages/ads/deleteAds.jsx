import { useState } from "react";
import { deleteAd } from "../api/client";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";

import PropTypes from "prop-types";

function DeleteAd({ adId, userId, createdBy }) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "¿Estás seguro/a de que quieres borrar este anuncio?"
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    if (userId && userId === createdBy) {
      deleteAd(adId)
        .then(() => {
          alert("Anuncio borrado correctamente");
          history.push("/ads");
        })
        .catch((error) => {
          console.error("Error deleting ad:", error);
          alert(
            "Hubo un error al borrar el anuncio. Por favor, inténtalo de nuevo."
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert("No tienes permiso para borrar este anuncio");
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleDelete} disabled={loading}>
      {loading ? "Borrando..." : "Borrar Anuncio"}
    </Button>
  );
}

DeleteAd.propTypes = {
  adId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
};

export default DeleteAd;
