// Vercel Serverless Function para React Router v7 SSR
import { createRequestHandler } from "@react-router/node";
import * as build from "../build/server/index.js";

export default createRequestHandler({ build });
