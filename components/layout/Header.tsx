"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

// checks if the user previously chose dark mode, or if their system prefers it
function getInitialTheme(): boolean {
	if (typeof window === "undefined") return false; // server-side: default to light
	const stored = localStorage.getItem("theme");
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	return stored === "dark" || (!stored && prefersDark);
}

const Header = () => {
	const [isDark, setIsDark] = useState(getInitialTheme);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDark);
	}, [isDark]);

	const toggleTheme = useCallback(() => {
		setIsDark((prev) => {
			const next = !prev;
			localStorage.setItem("theme", next ? "dark" : "light");
			document.documentElement.classList.toggle("dark", next);
			return next;
		});
	}, []);

	return (
		<header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16 sm:h-20">
					<div className="shrink-0 flex items-center gap-3">
						<Image
							src={"/SGE-Logo.webp"}
							alt="logo"
							width={120}
							height={40}
							className="w-24 sm:w-auto h-auto dark:brightness-0 dark:invert"
							unoptimized
						/>
					</div>

					{/* Desktop nav */}
					<nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700 dark:text-gray-300">
						<a className="hover:text-primary transition-colors" href="#">
							Home
						</a>
						<a className="hover:text-primary transition-colors" href="#">
							Events
						</a>
						<div className="relative group">
							<button className="flex items-center hover:text-primary transition-colors focus:outline-none">
								Admission Resources
								<span className="material-icons text-sm ml-1">expand_more</span>
							</button>
						</div>
						<div className="relative group">
							<button className="flex items-center hover:text-primary transition-colors focus:outline-none">
								Study Destination
								<span className="material-icons text-sm ml-1">expand_more</span>
							</button>
						</div>
						<div className="relative group">
							<button className="flex items-center hover:text-primary transition-colors focus:outline-none">
								More
								<span className="material-icons text-sm ml-1">expand_more</span>
							</button>
						</div>
					</nav>

					<div className="flex items-center gap-2 sm:gap-4">
						<button
							className="p-2 rounded-full flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
							id="theme-toggle"
							onClick={toggleTheme}
						>
							{isDark ?
								<span className="material-icons">light_mode</span>
							:	<span className="material-icons">dark_mode</span>}
						</button>
						<a
							className="hidden sm:inline-flex bg-secondary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all shadow-md"
							href="#"
						>
							Registration
						</a>
						{/* Mobile menu toggle */}
						<button
							className="p-2 md:hidden rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							<span className="material-icons">
								{mobileMenuOpen ? "close" : "menu"}
							</span>
						</button>
					</div>
				</div>

				{/* Mobile nav */}
				{mobileMenuOpen && (
					<nav className="md:hidden pb-4 pt-2 border-t border-border-light dark:border-border-dark space-y-1">
						<a
							className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-colors"
							href="#"
						>
							Home
						</a>
						<a
							className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-colors"
							href="#"
						>
							Events
						</a>
						<a
							className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-colors"
							href="#"
						>
							Admission Resources
						</a>
						<a
							className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-colors"
							href="#"
						>
							Study Destination
						</a>
						<a
							className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-colors"
							href="#"
						>
							More
						</a>
						<a
							className="block mx-3 mt-2 bg-secondary text-white px-6 py-2.5 rounded-full text-sm font-semibold text-center hover:bg-opacity-90 transition-all shadow-md sm:hidden"
							href="#"
						>
							Registration
						</a>
					</nav>
				)}
			</div>
		</header>
	);
};

export default Header;
