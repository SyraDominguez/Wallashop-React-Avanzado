import Layout from "../../components/layout/layout";
import Form from "../../components/form";
import LogoutButton from "../../components/LogoutButton"; // Importar LogoutButton

export default function NewAdPage() {
  return (
    <Layout title="¿Qué quieres vender hoy...?">
      <LogoutButton /> {/* Añadir el botón de Logout */}
      <Form />
    </Layout>
  );
}
