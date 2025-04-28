import QueryCLient from '@/components/query-client'
import './globals.css'
import { Toaster } from 'sonner'
import { inter } from './fonts'

export const metadata = {
  title: 'Task FLow',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-[#F8F8FC]`}>
        <Toaster richColors position="top-right" />
        <QueryCLient>{children}</QueryCLient>
      </body>
    </html>
  )
}
