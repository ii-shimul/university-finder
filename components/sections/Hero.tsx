import Image from "next/image";

const Hero = () => {
	return (
		<div className="relative bg-surface-light dark:bg-surface-dark overflow-hidden">
			<div className="absolute inset-0 z-0 opacity-10 dark:opacity-5 pointer-events-none">
				<div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-200 blur-3xl" />
				<div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
			</div>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div className="max-w-2xl">
						<div className="inline-flex items-center bg-blue-50 dark:bg-blue-900/30 text-secondary dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-blue-100 dark:border-blue-800">
							200+ Global University Partners | UK, USA, Canada, Australia
						</div>
						<h1 className="text-4xl sm:text-5xl font-extrabold text-secondary dark:text-white leading-tight mb-6">
							Find Your{" "}
							<span className="text-blue-600 dark:text-blue-400">
								Perfect University
							</span>
						</h1>
						<p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
							Shabuj Global Education connects students with leading
							universities worldwide. Discover advanced degree opportunities
							across the UK, Canada, the USA, Australia, and more. Take the next
							step toward your academic future today.
						</p>
					</div>
					<div className="relative hidden lg:block h-96 rounded-2xl overflow-hidden shadow-2xl group">
						<Image
							width={0}
							height={0}
							unoptimized
							alt="Students celebrating graduation"
							className="object-cover w-full h-full transform transition duration-700 group-hover:scale-105"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEV6KCEprZ1zY2r3f7M4WzJsE-SjHhF4Kz-dQGNfOI9tQBmXVR4Y7ljvOaxjee9DalMadK-pIIykOKzDIgCeDXxE4cYKUeXf4j0AVQMbXQrDYOKVi0u08Q462F2yoZp17kv8dy4ma5PNRiengNSFlF14Yb_nAos52pUlqEhMbYIbnDJUy4oX3kOXZ5RsFTWqilMZ_g2U2pyJL46a8VEQu_zqJZAqLF5k68PM8OjTzj0nMR2z8vwssrXXsQOM0VueGa5WQV2TRlvFCR"
						/>
						<div className="absolute inset-0 bg-linear-to-t from-secondary/80 to-transparent" />
						<div className="absolute bottom-6 left-6 text-white">
							<p className="font-bold text-xl">Success Starts Here</p>
							<p className="text-sm opacity-90">
								Join 145,000+ students worldwide
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
