import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import type { PropsWithChildren } from "react";
import "./globals.css";

export const metadata: Metadata = {
	title: "Paletten",
	description: "Website for controlling temperature at Paletten",
	icons: {
		icon: "/favicon.ico",
		apple: "/logo192.png",
	},
	manifest: "/manifest.json",
};

const geist = Geist({
	subsets: ["latin"],
});

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body>
				<main className={geist.className} id="root">
					{children}
				</main>
				<Script
					async
					data-domain="paletten.oliverflecke.me"
					defer
					src="https://plausible.oliverflecke.me/js/plausible.js"
					strategy="afterInteractive"
				/>
			</body>
		</html>
	);
}
