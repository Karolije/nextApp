import { apiClient } from "@/app/lib/apiClient";

export const addUser = async (newUser: { name: string }) => {
  try {
    const response = await apiClient.post(
      "/users",
      newUser
    );
    return response.data;
  } catch (error) {
    // @ts-expect-error - na kiedyś do poprawy :)
    throw new Error("Failed to add user", error);
  }
};