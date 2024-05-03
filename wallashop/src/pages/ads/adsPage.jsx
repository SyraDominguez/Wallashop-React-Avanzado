import { useEffect, useState } from "react";

import styles from "./adsPage.module.css";
import adsData from "./adsTest.json";
import { getLatestAds } from "./service";
import Button from "../../components/button";
import DateTime from "../../components/date";

import Layout from "../../components/layout/layout";

function AdsPage() {
  const [products, setProducts] = useState(adsData);

  useEffect(() => {
    getLatestAds().then((ads) => {
      setProducts([...adsData, ...ads]);
    });
  }, []);

  return (
    <Layout title="Anuncios destacados de hoy en tu ciudad">
      <DateTime />
      <div className={styles.adsPage}>
        <ul className={`${styles.adsGrid} ${styles.adsContainer}`}>
          {products.map((product) => (
            <li key={product.name} className={styles.adCard}>
              <h5>{product.name}</h5>
              <p>{product.description}</p>
              <p>{product.price} €</p>
              <img src={product.photo} alt={product.name} />
              <Button>{product.sale ? "Sale" : "Buy"}</Button>
              <ul>
                {product.tags.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default AdsPage;
