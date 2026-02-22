import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Find University - Global Education",
	description:
		"Find the best universities worldwide for your education journey.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={inter.variable}>
			<head>
				<link
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
					rel="stylesheet"
				/>
			</head>
			<body className="font-sans antialiased bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-200">
				<Header />
				{children}
			</body>
		</html>
	);
}
