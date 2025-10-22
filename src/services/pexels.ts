import { createClient } from "pexels";

const pexels = createClient(process.env.EXPO_PUBLIC_PEXELS_API_KEY || "");

export default pexels;
