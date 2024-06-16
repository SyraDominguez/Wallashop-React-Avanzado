import { useDispatch } from "react-redux";
import { createAd as createAdAction } from "../../store/actions/adActions";
import { createAd } from "./service";
import Layout from "../../components/layout/layout";
import Form from "../../components/form";

export default function NewAdPage() {
  const dispatch = useDispatch();

  const handleCreateAd = async (adData) => {
    const newAd = await createAd(adData);
    dispatch(createAdAction({ ad: newAd }));
  };

  return (
    <Layout title="¿Qué quieres vender hoy...?">
      <Form onSubmit={handleCreateAd} />
    </Layout>
  );
}
