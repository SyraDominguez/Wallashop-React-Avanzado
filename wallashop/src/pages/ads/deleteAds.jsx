import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import PropTypes from "prop-types";
import { deleteAd } from "../store/actions/adActions";

function DeleteAd({ adId, userId, createdBy }) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro/a de que quieres borrar este anuncio?"
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    if (userId && userId === createdBy) {
      try {
        await dispatch(deleteAd(adId)).unwrap();
        alert("Anuncio borrado correctamente");
        history.push("/ads");
      } catch (error) {
        console.error("Error deleting ad:", error);
        alert(
          "Hubo un error al borrar el anuncio. Por favor, inténtalo de nuevo."
        );
      } finally {
        setLoading(false);
      }
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
