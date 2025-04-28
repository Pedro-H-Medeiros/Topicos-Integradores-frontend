import dayjs from 'dayjs'
import TaskStatus from './task-status'

interface TaskProps {
  description: string
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
  createdAt: Date
  username: string
}

export default function Task({
  description,
  status,
  createdAt,
  username,
}: TaskProps) {
  return (
    <section className="rounded-2xl hover:bg-neutral-background hover:shadow-hover-task transition-all cursor-pointer">
      <div className="py-4 px-3 flex items-center w-full justify-between">
        <div className="flex items-center mr-10 justify-between flex-1">
          <div className="flex-1 inline-block mr-4">
            <span
              className={`${status === 'COMPLETED' && 'line-through'} text-xs text-neutral-primary line-clamp-1`}
            >
              {description}
            </span>
          </div>
          <TaskStatus label={status} />
        </div>

        <div className="flex items-center md:gap-0 gap-x-10">
          <div className="w-full md:w-[100px] select-none">
            <span className="text-xs text-[#82869E]">
              {dayjs(createdAt).format('DD/MM/YYYY')}
            </span>
          </div>

          <div className="w-full md:w-[160px] flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-tr from-[#221ECA] to-[#6461DA] min-w-8 min-h-8 flex items-center justify-center">
              <h1 className="font-bold text-white">K</h1>
            </div>
            <span className="text-xs text-neutral-primary">{username}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
