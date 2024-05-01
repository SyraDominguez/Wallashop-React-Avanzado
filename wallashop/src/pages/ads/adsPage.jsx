import { useEffect, useState } from 'react';

import styles from './adsPage.module.css';
import { getLatestAds } from './service';

// const Products = [
//   {
//     "name": "Airpods",
//     "sale": false,
//     "price": 80,
//     "photo": "airpods.jpg",
//     "tags": [
//       "work",
//       "lifestyle"
//     ]
//   },
//   {
//     "name": "Alexa",
//     "sale": true,
//     "price": 125.75,
//     "photo": "alexa.jpg",
//     "tags": [
//       "lifestyle",
//       "mobile"
//     ]
//   },
//   {
//     "name": "Camara Canon",
//     "sale": true,
//     "price": 535,
//     "photo": "canon.jpg",
//     "tags": [
//       "work",
//       "lifestyle"
//     ]
//   },
//   {
//     "name": "Toyota CH-R",
//     "sale": false,
//     "price": 35700,
//     "photo": "chr.jpg",
//     "tags": [
//       "work",
//       "motor"
//     ]
//   },
//   {
//     "name": "MacBook Pro",
//     "sale": false,
//     "price": 850,
//     "photo": "macbook_pro.jpg",
//     "tags": [
//       "work",
//       "lifestyle"
//     ]
//   }
// ]


function AdsPage() {

  const [products, setProducts] = useState([]);

  useEffect(() => { 
    getLatestAds().then(ads => setProducts(ads));
  }, [])

  return (
    <div className={styles.adsPage}>
      <h1>Ads Page</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <img src={product.photo} alt={product.name} />
            <p>{product.sale? 'Sale' : 'Buy'}</p>
            <ul>
              {product.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default AdsPage;