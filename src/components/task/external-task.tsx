'use client'

import dayjs from 'dayjs'
import { differenceInDays, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import TaskStatus from './task-status'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

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
              <div className="w-[100px] flex items-center gap-2">
                <div className="rounded-full bg-gradient-to-tr from-[#221ECA] to-[#6461DA] min-w-8 min-h-8 flex items-center justify-center">
                  <h1 className="font-bold text-white">{task.createdBy[0]}</h1>
                </div>
                <span className="text-xs text-neutral-primary">
                  {task.createdBy}
                </span>
              </div>

              <div className="truncate w-[160px] text-xs text-neutral-primary">
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
            <DialogDescription>{task.description}</DialogDescription>
          </DialogHeader>
          <div>Minha task</div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
