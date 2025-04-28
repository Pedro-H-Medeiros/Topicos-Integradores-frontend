export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="border-3 rounded-3xl border-black shadow-[0px_8px_14px_7px_#31275485]">
        <div className="rounded-4xl bg-white p-24">{children}</div>
      </div>
    </div>
  )
}
