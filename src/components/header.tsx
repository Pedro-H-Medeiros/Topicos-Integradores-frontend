import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-auto bg-gradient-to-r from-[#312754] to-[#4A2AC1] h-[84px]">
      <div className="flex items-center justify-center h-full">
        <Image alt="" src="/logo.png" width={68} height={54} />
      </div>
    </header>
  )
}
