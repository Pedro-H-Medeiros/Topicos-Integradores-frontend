'use client'

import dayjs from 'dayjs'
import { differenceInDays, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import TaskStatus from './task-status'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { useForm, Controller } from 'react-hook-form'
import {
  UpdateTaskStatusSchema,
  updateTaskStatusSchema,
} from '@/schemas/update-task-status.chema'
import { updateTaskStatus } from '@/services/update-task-status'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useState } from 'react'
import { Spinner } from '@phosphor-icons/react'

interface TaskProps {
  task: {
    id: string
    title: string
    description: string
    status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
    createdAt: Date
    createdBy: string
  }
  user: {
    id: string
    name: string
    email: string
  }
}

export default function ExternalTask({ task, user }: TaskProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const queryClient = useQueryClient()

  const {
    mutateAsync: updateTaskStatusFn,
    isPending: isPendingUpdateTaskStatus,
  } = useMutation({
    mutationKey: ['update-task'],
    mutationFn: updateTaskStatus,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['external-task'],
      })
    },
  })

  const {
    control,
    formState: { isSubmitting, errors },
  } = useForm<UpdateTaskStatusSchema>({
    resolver: zodResolver(updateTaskStatusSchema),
  })

  async function handleUpdateStatusTask({ status }: UpdateTaskStatusSchema) {
    try {
      await updateTaskStatusFn({ taskId: task.id, status })
      toast.success(`Status autalizado para ${status}.`)
    } catch {
      toast.error('Erro ao atualizar status da task.')
    }
  }

  return (
    <section className="rounded-2xl hover:bg-neutral-background hover:shadow-hover-task transition-all cursor-pointer">
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!isSubmitting) {
            setIsDialogOpen(open)
          }
        }}
      >
        <DialogTrigger asChild>
          <div className="py-[18px] px-3 grid grid-flow-col items-center gap-3">
            {/* TITLE */}
            <div
              className={`${task.status === 'COMPLETED' ? 'line-through' : ''} 
                 truncate w-full text-xs text-neutral-primary mr-4`}
            >
              {task.title}
            </div>

            <div className="flex justify-end gap-10 items-center w-full">
              {/* STATUS */}
              <div className="w-fit">
                <TaskStatus label={task.status} />
              </div>

              {/* DATE */}
              <div className="w-[100px] select-none">
                <div className="text-xs text-[#82869E]">
                  {differenceInDays(new Date(), task.createdAt) > 2
                    ? dayjs(task.createdAt).format('DD/MM/YYYY')
                    : formatDistanceToNow(task.createdAt, {
                        locale: ptBR,
                        addSuffix: true,
                      })}
                </div>
              </div>

              {/* USERNAME */}
              <div className="w-[100px] items-center gap-2 hidden md:flex">
                <div className="rounded-full bg-gradient-to-tr from-[#221ECA] to-[#6461DA] min-w-8 min-h-8 flex items-center justify-center">
                  <h1 className="font-bold text-white">{task.createdBy[0]}</h1>
                </div>
                <span className="text-xs text-neutral-primary">
                  {task.createdBy}
                </span>
              </div>

              <div className="truncate w-[160px] text-xs text-neutral-primary hidden md:flex">
                {user.name}
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="truncate max-w-[27rem]">{task.title}</div>
            </DialogTitle>
            <DialogDescription>Abaixo estão suas orientações</DialogDescription>
          </DialogHeader>
          <div>{task.description}</div>

          <hr className="w-full h-1" />
          <div className="flex gap-4 items-center">
            <p> Modifique o status da sua tarefa:</p>
            <div>
              <Controller
                control={control}
                name="status"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select
                    onValueChange={async (value) => {
                      const typedValue = value as
                        | 'TODO'
                        | 'IN_PROGRESS'
                        | 'COMPLETED'

                      if (value !== task.status) {
                        field.onChange(value)
                        await handleUpdateStatusTask({ status: typedValue })
                      }
                    }}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent ref={field.ref}>
                      <SelectItem value="TODO">A fazer</SelectItem>
                      <SelectItem value="IN_PROGRESS">Fazendo</SelectItem>
                      <SelectItem value="COMPLETED">Concluído</SelectItem>
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
          </div>
          <DialogFooter>
            {isPendingUpdateTaskStatus && (
              <div className="flex items-center gap-2">
                <Spinner className="animate-spin" />
                Atualizando...
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
