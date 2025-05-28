'use client'

import { useRouter } from 'next/navigation'

export default function MyTasksPage() {
  const router = useRouter()

  router.replace('/tasks')

  return <></>
  // return (
  //   <main className="mt-10 px-20 flex-1">
  //     <div className="space-y-1">
  //       <h1 className="font-bold text-lg md:text-2xl text-neutral-primary">
  //         👋 Minhas tarefas
  //       </h1>
  //       <p className="text-xs text-neutral-secondary">
  //         Lorem ipsum dolor sit amet consectetur adipisicing elit.
  //       </p>
  //     </div>
  //   </main>
  // )
}
