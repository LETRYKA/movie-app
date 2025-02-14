import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* ✅ Ensures content extends behind the notch */}
				<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
			</Head>
			<body className="h-full bg-[#1b1d29] pt-[env(safe-area-inset-top)]">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
