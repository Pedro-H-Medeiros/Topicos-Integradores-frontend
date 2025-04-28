'use client'

import { logout } from '@/services/logout'
import { profile } from '@/services/profile'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Skeleton } from './ui/skeleton'
import SidebarItem from './sidebar-item'
import { SignOut } from '@phosphor-icons/react'

export default function Sidebar() {
  const router = useRouter()

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

  return (
    <div className="bg-[#F5F4FD] h-[calc(100vh-84px)] flex-1 max-w-64 w-1/5">
      <div className="flex h-full justify-between flex-col">
        <div className="mt-10 px-2 w-full overflow-hidden space-y-5 flex-1">
          {/* PROFILE */}
          <section className="flex w-full items-center gap-2">
            <div className="rounded-full bg-gradient-to-tr from-[#221ECA] to-[#6461DA] min-w-8 min-h-8 flex items-center justify-center">
              <h1 className="font-bold text-white">K</h1>
            </div>
            <div className="truncate flex-1">
              {isLoadingProfile && (
                <Skeleton className="h-7 w-full bg-gray-200/75" />
              )}
              {profiledata && profiledata.userProfile.name + ' Workspace'}
            </div>
          </section>

          <div className="h-px w-full bg-gray-300" />

          <nav className="space-y-1">
            <SidebarItem href="/">👋 Tarefas</SidebarItem>
            <SidebarItem href="/tasks">🎯 Minhas tarefas</SidebarItem>
          </nav>
        </div>

        <section className="bg-[#D5D4F5] rounded-sm">
          <div className="flex items-center p-3.5 space-x-3.5">
            <div className="rounded-full bg-gradient-to-tr from-[#221ECA] to-[#6461DA] min-w-8 min-h-8 flex items-center justify-center">
              <h1 className="font-bold text-white">K</h1>
            </div>
            <div>
              <p>
                {isLoadingProfile && (
                  <Skeleton className="h-7 w-full bg-gray-200/75" />
                )}
                {profiledata && profiledata.userProfile.name}
              </p>
              <p>CEO</p>
            </div>

            <button
              onClick={handleLogout}
              type="submit"
              className="cursor-pointer hover:text-red-500"
            >
              <SignOut size={24} />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
