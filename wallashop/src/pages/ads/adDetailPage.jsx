import { useParams } from "react-router-dom";
import Layout from "../../components/layout/layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error404 from "../../components/error404";
import { useAuth } from "../auth/context";
import styles from "./adDetailPage.module.css";
import { getAd, deleteAd } from "./service";
import Button from "../../components/button";

function AdDetailPage() {
  const params = useParams();
  const [ad, setAd] = useState(null);
  const { isLogged } = useAuth();

  useEffect(() => {
    getAd(params.adsId)
      .then((adData) => setAd(adData))
      .catch((error) => console.error("Error fetching ad:", error));
  }, [params.adsId]);

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
        <img src={ad.photo} alt={ad.name} className={styles.detailImage} />
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
          <Button onClick={() => deleteAd(ad.id)}>Borrar anuncio</Button>
        )}
        <Button>
          <Link to="/ads">Volver a los anuncios</Link>
        </Button>
      </div>
    </Layout>
  );
}

export default AdDetailPage;
