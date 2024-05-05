import Layout from "./layout/layout";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <Layout title="Error 404 - Página no encontrada">
      <div>
        <p>La página que estás buscando no pudo ser encontrada.</p>
        <Link to="/ads">Volver a los anuncios</Link>
      </div>
    </Layout>
  );
}
