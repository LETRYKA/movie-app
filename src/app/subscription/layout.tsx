import SharedLayout from "@/components/MainLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SharedLayout>{children}</SharedLayout>;
}