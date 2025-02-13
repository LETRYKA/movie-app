import { Metadata } from 'next'
import MainLayout from '@/components/MainLayout'
import "@/app/globals.css";

export const metadata: Metadata = {
  title: 'Sphere+',
  description: 'Sphere+ Progressive Web App',
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Sphere+',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}