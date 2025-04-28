'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarItemProps extends LinkProps {
  children: React.ReactNode
}

export default function SidebarItem({ children, ...props }: SidebarItemProps) {
  const pathname = usePathname()

  return (
    <Link
      {...props}
      data-current={pathname === props.href}
      className="hover:scale-105 transition-all flex data-[current=true]:border-l-2 data-[current=true]:bg-primary-primary-200 data-[current=true]:border-[#7B61FF]  rounded-r-full"
    >
      <p className="text-neutral-primary font-medium p-2">{children}</p>
    </Link>
  )
}
