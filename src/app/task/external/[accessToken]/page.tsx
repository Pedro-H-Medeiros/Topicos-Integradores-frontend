'use client'

import ExternalTask from '@/components/task/external-task'
import TaskCardSkeleton from '@/components/task/task-card-skeleton'
import TasksCard from '@/components/task/tasks-card'
import { getExternalUserInfo } from '@/services/get-external-user-info'
import { getExternalUserTask } from '@/services/get-external-user-task'
import { useQuery } from '@tanstack/react-query'
import { use } from 'react'

type Params = Promise<{ accessToken: string }>

export default function Page(props: { params: Params }) {
  const params = use(props.params)

  const { data: getExternalTaskData, isLoading: isLoadingExternalTask } =
    useQuery({
      queryKey: ['external-task'],
      queryFn: () => getExternalUserTask({ accessToken: params.accessToken }),
    })

  const { data: getExternalInfoData } = useQuery({
    queryKey: ['external-user'],
    queryFn: () => getExternalUserInfo({ accessToken: params.accessToken }),
  })

  return (
    <div>
      <TasksCard title="tarefa">
        <div className="space-y-4.5">
          {isLoadingExternalTask && <TaskCardSkeleton />}
          {getExternalTaskData &&
            getExternalTaskData?.tasks.map(
              (task) =>
                getExternalInfoData && (
                  <ExternalTask
                    key={task.id}
                    task={task}
                    user={getExternalInfoData.user}
                  />
                ),
            )}
        </div>
      </TasksCard>
    </div>
  )
}
