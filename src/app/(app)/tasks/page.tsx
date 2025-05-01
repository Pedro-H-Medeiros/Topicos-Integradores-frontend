'use client'

import { Suspense } from 'react'
import TasksContent from './_components/tasks-content'

export default function TasksPage() {
  return (
    <Suspense fallback={<div>Carregando Conteúdo...</div>}>
      <TasksContent />
    </Suspense>
  )
}
