import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./adsPage.module.css";
import { fetchAdsAndTags } from "../../store/actions/adActions";
import Button from "../../components/button";
import DateTime from "../../components/date";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/layout";
import FilterForm from "../../components/FilterForm";
import { getAds } from "../../store/selectors/selectors"; 

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
  const ads = useSelector(getAds); // Usa el selector
  const loading = useSelector((state) => state.ads.loading);
  const [filteredAds, setFilteredAds] = useState([]);

  useEffect(() => {
    if (ads.length === 0) {
      dispatch(fetchAdsAndTags());
    }
  }, [dispatch, ads.length]);

  useEffect(() => {
    setFilteredAds(ads);
  }, [ads]);

  const handleFilterChange = (filters) => {
    let filtered = ads;

    if (filters.name) {
      const nameLowerCase = filters.name.toLowerCase();
      filtered = filtered.filter((ad) =>
        filters.nameOption === "startsWith"
          ? ad.name.toLowerCase().startsWith(nameLowerCase)
          : ad.name.toLowerCase().includes(nameLowerCase)
      );
    }

    if (filters.priceMin) {
      filtered = filtered.filter(
        (ad) => ad.price >= parseFloat(filters.priceMin)
      );
    }

    if (filters.priceMax) {
      filtered = filtered.filter(
        (ad) => ad.price <= parseFloat(filters.priceMax)
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((ad) =>
        filters.tags.every((tag) => ad.tags.includes(tag))
      );
    }

    if (filters.sale !== "") {
      const sale = filters.sale === "true";
      filtered = filtered.filter((ad) => ad.sale === sale);
    }

    setFilteredAds(filtered);
  };

  return (
    <Layout title="Anuncios destacados de hoy en tu ciudad">
      <DateTime />
      <FilterForm onFilterChange={handleFilterChange} />
      <div className={styles.adsPage}>
        {loading ? (
          <p>Cargando anuncios...</p>
        ) : filteredAds.length ? (
          <ul className={`${styles.adsGrid} ${styles.adsContainer}`}>
            {filteredAds.map((ad) => (
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
