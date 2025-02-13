import { Work_Sans } from 'next/font/google';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";
import "@/app/globals.css";

const workSans = Work_Sans({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-work-sans',
});

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Head>
				<link rel="manifest" href="/manifest.json" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
				<meta name="apple-mobile-web-app-title" content="Sphere+" />
				<link rel="apple-touch-icon" href="/imgs/app.png" />
			</Head>
			<div className={`${workSans.variable} flex flex-col`}>
				<Header />
				<div className="flex-1 -mt-20">{children}</div>
				<Footer />
			</div>
		</>
	);
}
