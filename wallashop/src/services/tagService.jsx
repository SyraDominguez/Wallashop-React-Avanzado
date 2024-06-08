import { client } from "../api/client";

export const getTags = async () => {
  try {
    const response = await client.get("api/v1/adverts/tags");
    return response;
  } catch (error) {
    console.error("Error fetching tags", error);
    throw error;
  }
};
