'use client'

import Input from '@/components/input'
import Task from '@/components/task/task'
import TaskCardSkeleton from '@/components/task/task-card-skeleton'
import TasksCard from '@/components/task/tasks-card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  createTaskSchema,
  CreateTaskSchema,
} from '@/schemas/create-task.schema'
import { createTask } from '@/services/create-task'
import { getAllTasks, getAllTasksResponse } from '@/services/get-all-tasks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from '@phosphor-icons/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function TasksPage() {
  const queryClient = useQueryClient()

  const { data: tasksResult, isLoading: isLoadingTasks } =
    useQuery<getAllTasksResponse>({
      queryKey: ['all-tasks'],
      queryFn: () => getAllTasks(),
    })

  const { mutateAsync: createTaskFn, isPending: isPendingCreateTask } =
    useMutation({
      mutationKey: ['create-task'],
      mutationFn: createTask,
      async onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ['profile', 'me', 'all-tasks'],
        })
      },
    })

  const {
    register,
    handleSubmit,
    getValues,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
  })

  async function handleSubmitTask(data: CreateTaskSchema) {
    try {
      await createTaskFn({ ...data })
      toast.success(`Tarefa "${getValues('title')}" criada!`)
      reset()
    } catch {
      toast.error(`Erro ao criar a tarefa ${getValues('title')}.`)
    }
  }

  return (
    <main className="mt-10 mx-20 flex-1">
      <div className="flex justify-between">
        <div className="space-y-1">
          <h1 className="font-bold text-lg md:text-2xl text-neutral-primary">
            👋 Tarefas
          </h1>
          <p className="text-xs text-neutral-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        {/* <button className="font-medium flex items-center justify-center gap-2 text-white text-xs bg-branding-primary-500 py-2.5 px-4 rounded-full cursor-pointer ">
          <Plus size={20} />
          Adicionar Tarefa
        </button> */}
      </div>

      <div className="mt-3.5 space-y-14 ">
        <TasksCard title="tarefa">
          <div className="space-y-4.5">
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center justify-center gap-2 text-support-link-500 text-xs cursor-pointer ">
                  <Plus size={24} />
                  Adicionar nova tarefa
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar nova tarefa</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleSubmitTask)}>
                  <div className="space-y-4">
                    <div>
                      <Input
                        placeholder="Adicione um título para a tarefa"
                        {...register('title', { required: true })}
                      />
                      {errors.title && (
                        <span className="text-sm text-red-500">
                          {errors.title.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <Input
                        placeholder="Adicione uma descrição para a tarefa"
                        {...register('description', { required: true })}
                      />
                      {errors.description && (
                        <span className="text-sm text-red-500">
                          {errors.description.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <Controller
                        control={control}
                        name="status"
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um satus" />
                            </SelectTrigger>
                            <SelectContent ref={field.ref}>
                              <SelectItem value="TODO">A fazer</SelectItem>
                              <SelectItem value="IN_PROGRESS">
                                Fazendo
                              </SelectItem>
                              <SelectItem value="COMPLETED">
                                Concluído
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.status && (
                        <span className="text-sm text-red-500">
                          {errors.status.message}
                        </span>
                      )}
                    </div>

                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="cursor-pointer"
                    >
                      {isPendingCreateTask ? 'Carregando...' : 'Criar'}
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {isLoadingTasks && <TaskCardSkeleton />}
            {tasksResult &&
              tasksResult?.tasks.map((task) => (
                <Task
                  key={task.id}
                  description={task.description}
                  status={task.status}
                  createdAt={task.createdAt}
                  username={task.createdBy.name}
                />
              ))}
          </div>
        </TasksCard>

        <TasksCard
          title="task em atraso"
          titleColor="text-branding-secondary-500"
        >
          ok
        </TasksCard>
      </div>
    </main>
  )
}
