export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-screen h-screen flex items-center justify-center px-2">
      <div className="border-2 rounded-3xl border-black shadow-[0px_8px_14px_7px_#31275485]">
        <div className="rounded-4xl bg-white p-12 md:p-24">{children}</div>
      </div>
    </div>
  )
}
