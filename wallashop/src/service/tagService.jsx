import { client } from "../api/client";

export const getTags = () => {
  return client
    .get("api/v1/adverts/tags")
    .then((response) => {
      console.log("API response:", response); // Log de la respuesta de la API
      return response;
    })
    .catch((error) => {
      console.error("Error fetching tags:", error);
      throw error;
    });
};
