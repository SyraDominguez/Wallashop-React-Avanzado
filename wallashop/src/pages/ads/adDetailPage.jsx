import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/context";
import { useDispatch, useSelector } from "react-redux";
import styles from "./adDetailPage.module.css";
import { getAd } from "./service";
import { deleteAdThunk } from "../../store/actions/adActions";
import Button from "../../components/button";
import ConfirmDialog from "../../components/ConfirmDialog";
import SuccessDialog from "../../components/SuccessDialog";
import { getAdById } from "../../store/selectors/selectors";

function AdDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { isLogged } = useAuth();
  const ad = useSelector((state) => getAdById(state, params.adsId));

  useEffect(() => {
    if (!ad) {
      getAd(params.adsId)
        .then((adData) => {
          if (!adData) {
            throw new Error("Ad not found");
          }
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      setLoading(false);
    }
  }, [params.adsId, ad]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteAdThunk(ad.id));
      setShowSuccess(true);
    } catch (error) {
      console.error("Error deleting ad:", error);
      alert("Error al eliminar el anuncio. Inténtalo de nuevo más tarde.");
    }
  };

  useEffect(() => {
    if (showSuccess) {
      navigate("/ads");
    }
  }, [showSuccess, navigate]);

  const openConfirmDialog = () => {
    setShowConfirm(true);
  };

  const closeConfirmDialog = () => {
    setShowConfirm(false);
  };

  const confirmDelete = () => {
    closeConfirmDialog();
    handleDelete();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Anuncio no encontrado</div>;
  }

  if (!ad) {
    return <div>Anuncio no encontrado</div>;
  }

  return (
    <Layout title="Ad Detail">
      <div className={styles.detailContainer}>
        <h2 className={styles.detailTitle}>{ad.name}</h2>
        <p className={styles.detailPrice}>Precio: {ad.price} €</p>
        <p className={styles.detailDescription}>
          Descripción: {ad.description}
        </p>
        {ad.photo && (
          <img src={ad.photo} alt={ad.name} className={styles.detailImage} />
        )}
        <p>Tipo: {ad.sale ? "Venta" : "Compra"}</p>
        <p>Tags:</p>
        <ul>
          {ad.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </ul>
        {isLogged && (
          <Button onClick={openConfirmDialog}>Borrar anuncio</Button>
        )}
        <Button>
          <Link to="/ads">Volver a los anuncios</Link>
        </Button>
      </div>
      {showConfirm && (
        <ConfirmDialog
          message="¿De verdad quieres eliminar este anuncio? Esta acción es IRREVERSIBLE"
          onConfirm={confirmDelete}
          onCancel={closeConfirmDialog}
        />
      )}
      {showSuccess && (
        <SuccessDialog
          message="Anuncio borrado correctamente"
          onClose={() => navigate("/ads")}
        />
      )}
    </Layout>
  );
}

export default AdDetailPage;
