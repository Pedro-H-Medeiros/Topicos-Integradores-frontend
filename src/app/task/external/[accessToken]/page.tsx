'use client'

import ExternalTask from '@/components/task/external-task'
import TaskCardSkeleton from '@/components/task/task-card-skeleton'
import { getExternalUserInfo } from '@/services/get-external-user-info'
import { getExternalUserTask } from '@/services/get-external-user-task'
import { useQuery } from '@tanstack/react-query'
import { use, useEffect } from 'react'
import Cookies from 'js-cookie'
import ExternalTasksCard from '@/components/task/external-tasks-card'

type Params = Promise<{ accessToken: string }>

export default function Page(props: { params: Params }) {
  const params = use(props.params)

  useEffect(() => {
    if (params.accessToken) {
      Cookies.remove('accessToken')
      Cookies.set('accessToken', params.accessToken, {
        expires: 1, // 1 dia
        secure: true,
        sameSite: 'Strict',
      })
    }
  }, [params.accessToken])

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
      <ExternalTasksCard title="tarefa">
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
      </ExternalTasksCard>
    </div>
  )
}
