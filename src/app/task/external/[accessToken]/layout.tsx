import Header from '@/components/header'

export default function ExernalTaskIdLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />

      <div className="flex w-screen h-[calc(100vh-84px)] items-center justify-center">
        {children}
      </div>
    </>
  )
}
