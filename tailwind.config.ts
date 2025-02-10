import { type Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
	darkMode: "class",  // Enable dark mode by class
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"custom-gradient":
					"linear-gradient(193deg, rgba(2,0,36,0) 0%, rgba(26,29,41,0.79) 54%, rgba(26,29,41,1) 100%)",
				"fade-gradient-v":
					"linear-gradient(180deg, rgba(27,29,41,0) 40%, rgba(27,29,41,1) 100%)",
				"fade-gradient-black":
					"linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%)",
				"fade-gradient-hr":
					"linear-gradient(90deg, rgba(27,29,41,0) 40%, rgba(27,29,41,1) 100%)",
			},
			colors: {
				background: "#1b1d29",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "#67BDFF", // Secondary color (activated buttons)
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				widget: "#242631",
				footer: "#090B13",
				star: "#ffdb93",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [tailwindAnimate],
};

export default config;
