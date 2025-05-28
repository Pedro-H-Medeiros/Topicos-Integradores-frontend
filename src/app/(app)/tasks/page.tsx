'use client'

import { Suspense, useEffect } from 'react'
import TasksContent from './_components/tasks-content'
import { useRouter } from 'next/navigation'

export default function TasksPage() {
  const router = useRouter()

  useEffect(() => {
    const sesstionId = localStorage.getItem('sessionId')
    if (!sesstionId) {
      return router.replace('/auth/sign-in')
    }
  }, [])

  return (
    <Suspense fallback={<div>Carregando Conteúdo...</div>}>
      <TasksContent />
    </Suspense>
  )
}
