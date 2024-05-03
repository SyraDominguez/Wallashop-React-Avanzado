import { useEffect, useState } from "react";

import styles from "./adsPage.module.css";
import adsData from "./adsTest.json";
import { getLatestAds } from "./service";
import { logout } from "../auth/service";
import Button from "../../components/button";

import Layout from "../../components/layout/layout";

function AdsPage({ onLogout }) {
  const [products, setProducts] = useState(adsData);

  useEffect(() => {
    getLatestAds().then((ads) => {
      setProducts([...adsData, ...ads]);
    });
  }, []);

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return (
    <Layout>
      <div className={styles.adsPage}>
        <h1>Ads Page</h1>
        <Button onClick={handleLogout}>Logout</Button>
        <ul className={`${styles.adsGrid} ${styles.adsContainer}`}>
          {products.map((product) => (
            <li key={product.id} className={styles.adCard}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <img src={product.photo} alt={product.name} />
              <p>{product.sale ? "Sale" : "Buy"}</p>
              <ul>
                {product.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
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
