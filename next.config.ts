import type { NextConfig } from "next";

export default {
	reactStrictMode: true,
	reactCompiler: true,
	output: "export",
	agentRules: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "openweathermap.org",
			},
		],
	},
} satisfies NextConfig;
