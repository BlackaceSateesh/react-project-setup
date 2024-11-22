import axios from "axios";
import { backendConfig } from "../../constants/contents/mainContent";

const userBaseUrl = `${backendConfig.admin}`;

export async function createUser(payload) {
  const response = await axios.post(`${userBaseUrl}/register`, payload);
  return response;
}
export async function verifyOtp(payload) {
  const response = await axios.post(`${userBaseUrl}/register`, payload);
  return response;
}
