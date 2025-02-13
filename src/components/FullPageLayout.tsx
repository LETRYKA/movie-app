import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-work-sans",
});

export default function FullPageLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className={`${workSans.variable} min-h-screen`}>
			{children}
		</div>
	);
}