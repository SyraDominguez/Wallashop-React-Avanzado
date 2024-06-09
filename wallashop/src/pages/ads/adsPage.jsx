import { useEffect, useState } from "react";
import styles from "./adsPage.module.css";
import { getLatestAds } from "./service";
import Button from "../../components/button";
import DateTime from "../../components/date";
import { NavLink, Link } from "react-router-dom";
import Layout from "../../components/layout/layout";
import FilterForm from "../../components/FilterForm";

const EmptyList = () => (
  <div className={styles.emptyList}>
    <p>
      ¡Haz historia y sé el primero en destacar con tu anuncio en nuestra
      plataforma!
    </p>
    <Button $variant="primary">
      <NavLink to="/ads/new">Crear un anuncio</NavLink>
    </Button>
  </div>
);

function AdsPage() {
  const [ads, setAds] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsData = await getLatestAds(filters);
        setAds(adsData);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };
    fetchAds();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Layout title="Anuncios destacados de hoy en tu ciudad">
      <DateTime />
      <FilterForm onFilterChange={handleFilterChange} />
      <div className={styles.adsPage}>
        {ads.length ? (
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
