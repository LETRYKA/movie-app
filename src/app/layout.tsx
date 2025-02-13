import { Metadata } from 'next'
import MainLayout from '@/components/FullPageLayout'
import "@/app/globals.css";
import FullPageLayout from '@/components/FullPageLayout';

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
        <FullPageLayout>{children}</FullPageLayout>
      </body>
    </html>
  );
}