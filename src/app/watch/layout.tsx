import { Metadata } from 'next'
import FullPageLayout from "@/components/FullPageLayout";

export const metadata: Metadata = {
  title: 'Watch - Sphere+',
  description: '',
}

export default function WatchLayout({ children }: { children: React.ReactNode }) {
  return (
    <FullPageLayout>
      {children}
    </FullPageLayout>
  );
}