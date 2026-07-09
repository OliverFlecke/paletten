import type { NextConfig } from "next";

export default {
	reactStrictMode: true,
	reactCompiler: true,
	output: "export",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "openweathermap.org",
			},
		],
	},
} satisfies NextConfig;
