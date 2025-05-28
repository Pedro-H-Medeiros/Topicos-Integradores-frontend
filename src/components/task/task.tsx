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
import Input from '../input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { assignTask } from '@/services/assign-task'
import { toast } from 'sonner'

interface TaskProps {
  task: {
    id: string
    title: string
    description: string
    status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
    createdAt: Date
    createdBy: {
      name: string
    }
  }
}
const onlyLettersRegex = /^[A-Za-z\s]+$/

const assignTaskSchema = z.object({
  name: z
    .string()
    .nonempty('O nome não pode ser vazio.')
    .min(10, 'Deve conter mais de 10 caracteres.')
    .regex(onlyLettersRegex, 'O nome deve conter somente letras.'),
  email: z
    .string()
    .email('Email inválido.')
    .nonempty('Email não pode estar vazio.'),
})

type AssignTaskSchema = z.infer<typeof assignTaskSchema>

export default function Task({ task }: TaskProps) {
  const { mutateAsync: assignTaskFn, isPending: isPendingAssignTask } =
    useMutation({
      mutationFn: assignTask,
    })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AssignTaskSchema>({
    resolver: zodResolver(assignTaskSchema),
  })

  async function handleSubmitForm({ name, email }: AssignTaskSchema) {
    try {
      await assignTaskFn({
        taskId: task.id,
        name,
        email,
      })
      reset()
      toast.success('Atividade atribuída com sucesso ao colaborador!')
    } catch {
      toast.error('Erro ao atribuir atividade ao colaborador.')
    }
  }

  return (
    <section className="rounded-2xl hover:bg-neutral-background hover:shadow-hover-task transition-all cursor-pointer">
      <Dialog>
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
              <div className="w-[160px] items-center gap-2 hidden md:flex">
                <div className="rounded-full bg-gradient-to-tr from-[#221ECA] to-[#6461DA] min-w-8 min-h-8 flex items-center justify-center">
                  <h1 className="font-bold text-white">
                    {task.createdBy.name[0]}
                  </h1>
                </div>
                <span className="text-xs text-neutral-primary">
                  {task.createdBy.name}
                </span>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>
              <div className="truncate max-w-[27rem]">{task.title}</div>
            </DialogTitle>
            <DialogDescription>{task.description}</DialogDescription>
          </DialogHeader>
          <div>
            <p className="mb-4">Atribuir atividade à um colaborador:</p>
            <form
              onSubmit={handleSubmit(handleSubmitForm)}
              className="space-y-4"
            >
              <div>
                <Input
                  placeholder="Insira o nome do colaborador"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <span className="text-sm text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Insira o e-mail do colaborador"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <DialogFooter className="justify-end">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className={`px-4 py-2 cursor-pointer rounded-md font-medium transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#221ECA] hover:bg-[#1b18a6]'} text-white shadow disabled:opacity-70`}
                >
                  {isPendingAssignTask ? 'Enviando...' : 'Atribuir'}
                </button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
