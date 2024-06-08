import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error404 from "../../components/error404";
import { useAuth } from "../auth/context";
import styles from "./adDetailPage.module.css";
import { getAd, deleteAd } from "./service";
import Button from "../../components/button";
import ConfirmDialog from "../../components/confirmDialog";
import SuccessDialog from "../../components/SuccessDialog";

function AdDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
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
        setAd(adData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [params.adsId]);

  const handleDelete = async () => {
    try {
      await deleteAd(ad.id);
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
    return <Error404 />;
  }

  if (!ad) {
    return <Error404 />;
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
          message="¿De verdad que quieres eliminar este anuncio? Esta acción es IRREVERSIBLE"
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
