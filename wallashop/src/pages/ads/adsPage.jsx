import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./adsPage.module.css";
import { fetchAdsAndTags } from "../../store/actions/adActions";
import Button from "../../components/button";
import DateTime from "../../components/date";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/layout";
import FilterForm from "../../components/FilterForm";

const EmptyList = () => (
  <div className={styles.emptyList}>
    <p>
      ¡Haz historia y sé el primero en destacar con tu anuncio en nuestra
      plataforma!
    </p>
    <Button $variant="primary">
      <Link to="/ads/new">Crear un anuncio</Link>
    </Button>
  </div>
);

function AdsPage() {
  const dispatch = useDispatch();
  const { ads, loading } = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(fetchAdsAndTags());
  }, [dispatch]);

  const handleFilterChange = () => {
    // Lógica para filtrar anuncios aquí (opcional)
  };

  return (
    <Layout title="Anuncios destacados de hoy en tu ciudad">
      <DateTime />
      <FilterForm onFilterChange={handleFilterChange} />
      <div className={styles.adsPage}>
        {loading ? (
          <p>Cargando anuncios...</p>
        ) : ads.length ? (
          <ul className={`${styles.adsGrid} ${styles.adsContainer}`}>
            {ads.map((ad) => (
              <li key={ad.id} className={styles.adCard}>
                <Link to={`/ads/${ad.id}`}>
                  <h5>{ad.name}</h5>
                  <p>{ad.description}</p>
                  <p>{ad.price} €</p>
                  <img src={ad.photo} alt={ad.name} />
                  <Button>{ad.sale ? "Sale" : "Buy"}</Button>
                  <ul>
                    {ad.tags.map((tag, index) => (
                      <li key={index}>{tag}</li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Layout>
  );
}

export default AdsPage;
