import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Work_Sans } from "next/font/google";
import "@/app/globals.css";

const workSans = Work_Sans({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-work-sans",
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
	return (
		<Html>
			<Head>
				<link rel="manifest" href="/manifest.json" />
				<link
					rel="icon"
					href="/imgs/Appx192.png"
					type="image/png"
					sizes="192x192"
				/>
				<meta name="theme-color" content="#000000" />
			</Head>
			<div className={workSans.variable}>
				{children}
			</div>
		</Html >
	);
}
