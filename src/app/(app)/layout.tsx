import Header from '@/components/header'
import Sidebar from '@/components/sidebar'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />

      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </>
  )
}
