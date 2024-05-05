import { useParams } from "react-router-dom";
import Layout from "../../components/layout/layout";
import { useEffect, useState } from "react";
import adsData from "../ads/adsTest.json";
import { Link } from "react-router-dom";
import styles from "./adDetailPage.module.css";

function AdDetailPage() {
  const params = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const foundAd = adsData.find((ad) => ad.id === parseInt(params.adsId));
    setAd(foundAd);
  }, [params.adsId]);

  if (!ad) {
    return <Layout title="Ad Detail">Cargando detalles del anuncio...</Layout>;
  }

  return (
    <Layout title="Ad Detail">
      <div className={styles.detailContainer}>
        <h2 className={styles.detailTitle}>{ad.name}</h2>
        <p className={styles.detailPrice}>Precio: {ad.price} €</p>
        <img src={ad.photo} alt={ad.name} className={styles.detailImage} />
        <p className={styles.detailDescription}>
          Descripción: {ad.description}
        </p>
        <p>Tipo: {ad.sale ? "Venta" : "Compra"}</p>
        <p>Tags:</p>
        <ul>
          {ad.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </ul>
        <Link to="/ads">Volver a los anuncios</Link>
      </div>
    </Layout>
  );
}

export default AdDetailPage;
