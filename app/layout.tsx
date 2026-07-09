import type { Metadata, Viewport } from "next";
import Script from "next/script";
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

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<main id="root">{children}</main>
				<Script
					async
					defer
					data-domain="paletten.oliverflecke.me"
					src="https://plausible.oliverflecke.me/js/plausible.js"
					strategy="afterInteractive"
				/>
			</body>
		</html>
	);
}
