import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-work-sans',
});

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className={`${workSans.variable} flex flex-col min-h-screen`}>
			<Header />
			<main className="flex-1 -mt-20">{children}</main>
			<Footer />
		</div>
	);
}