import { localAPI } from "./local";
import { serverAPI } from "./server";

const isProd = import.meta.env.VITE_MODE === "production";

export const tasksAPI = isProd ? localAPI : serverAPI;
