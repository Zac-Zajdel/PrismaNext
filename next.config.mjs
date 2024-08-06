import createJiti from "jiti";
import { fileURLToPath } from "node:url";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./env.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
