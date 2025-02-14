import { Metadata } from 'next'
import MainLayout from '@/components/MainLayout'
import "@/app/globals.css";
import FullPageLayout from '@/components/FullPageLayout';

export const metadata: Metadata = {
  title: "Sphere+",
  description: "",
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover"
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Sphere+"
  },
  themeColor: "#1b1d29"
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[#1b1d29] pt-[env(safe-area-inset-top)]">
        <FullPageLayout>{children}</FullPageLayout>
      </body>
    </html>
  );
}
