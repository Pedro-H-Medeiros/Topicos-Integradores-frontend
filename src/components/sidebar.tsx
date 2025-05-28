'use client'

import { logout } from '@/services/logout'
import { profile } from '@/services/profile'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Skeleton } from './ui/skeleton'
import SidebarItem from './sidebar-item'
import { TextAlignJustify, SignOut, X } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

export default function Sidebar() {
  const router = useRouter()
  const [isOpenMenu, setIsOpenMenu] = useState(true)

  const { data: profiledata, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile', 'me'],
    queryFn: profile,
  })

  const { mutateAsync: logoutFn } = useMutation({
    mutationFn: logout,
  })

  async function handleLogout() {
    try {
      await logoutFn()
      toast.success('Logout realizado com sucesso.')

      router.replace('/auth/sign-in')
    } catch {
      toast.error('Erro ao realizar logout.')
    }
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsOpenMenu(true)
      } else {
        setIsOpenMenu(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return (
    <>
      <button
        onClick={() => setIsOpenMenu(!isOpenMenu)}
        className="md:hidden fixed top-5 left-5 z-50 text-white p-2 rounded-full shadow-lg"
      >
        {isOpenMenu ? <X size={24} /> : <TextAlignJustify size={24} />}
      </button>

      <div
        className={`
          bg-[#F5F4FD] h-[calc(100vh-84px)] top-[84px] ease-in-out duration-300 w-64 fixed ${isOpenMenu ? 'translate-x-0' : '-translate-x-full'}
           md:sticky left-0 md:w-1/5 md:max-w-64 md:flex-1
        `}
      >
        <div className="flex h-full justify-between flex-col">
          <div className="mt-10 px-2 w-full overflow-hidden space-y-5 flex-1">
            {/* PROFILE */}
            <section className="flex w-full items-center gap-2">
              <div className="rounded-full bg-gradient-to-tr from-[#221ECA] to-[#6461DA] min-w-8 min-h-8 flex items-center justify-center">
                <h1 className="font-bold text-white">
                  {profiledata && profiledata.userProfile.name[0]}
                </h1>
              </div>
              <div className="truncate flex-1">
                {isLoadingProfile && (
                  <Skeleton className="h-7 w-full bg-gray-200/75" />
                )}
                {profiledata && profiledata.userProfile.name + ' Workspace'}
              </div>
            </section>

            <div className="h-px w-full bg-gray-300" />

            <nav className="space-y-1 truncate flex-1">
              <SidebarItem href="/tasks">🎯 Minhas tarefas</SidebarItem>
            </nav>
          </div>

          <section className="bg-[#D5D4F5] rounded-sm">
            <div className="flex items-center p-3.5 space-x-3.5">
              <div className="rounded-full bg-gradient-to-tr from-[#221ECA] to-[#6461DA] min-w-8 min-h-8 flex items-center justify-center">
                <h1 className="font-bold text-white">
                  {profiledata && profiledata.userProfile.name[0]}
                </h1>
              </div>
              <div>
                <div>
                  {isLoadingProfile && (
                    <Skeleton className="h-7 w-full bg-gray-200/75" />
                  )}
                  {profiledata && profiledata.userProfile.name}
                </div>
                <p>CEO</p>
              </div>

              <button
                onClick={handleLogout}
                type="submit"
                className="cursor-pointer hover:text-red-700 text-red-500 flex-1 m-auto w-full flex justify-end-safe"
              >
                <SignOut size={24} />
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
