import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/context";
import { useDispatch } from "react-redux";
import styles from "./adDetailPage.module.css";
import { getAd } from "./service";
import { deleteAdThunk } from "../../store/actions/adActions"; // Importar la acción
import Button from "../../components/button";
import ConfirmDialog from "../../components/ConfirmDialog";
import SuccessDialog from "../../components/SuccessDialog";

function AdDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { isLogged } = useAuth();

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const adData = await getAd(params.adsId);
        if (!adData) {
          throw new Error("Ad not found");
        }
        setAd(adData);
      } catch (error) {
        setError(error);
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [params.adsId, navigate]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteAdThunk(ad.id));
      setShowSuccess(true);
    } catch (error) {
      console.error("Error deleting ad:", error);
      alert("Error al eliminar el anuncio. Inténtalo de nuevo más tarde.");
    }
  };

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

  const closeSuccessDialog = () => {
    setShowSuccess(false);
    navigate("/ads");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return null;
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
          onClose={closeSuccessDialog}
        />
      )}
    </Layout>
  );
}

export default AdDetailPage;
