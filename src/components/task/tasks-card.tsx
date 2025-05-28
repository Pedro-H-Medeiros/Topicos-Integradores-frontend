import clsx from 'clsx'

interface TasksCardProps {
  title: string
  titleColor?: string
  children?: React.ReactNode
}

export default function TasksCard({
  title,
  titleColor = 'text-neutral-secondary',
  children,
}: TasksCardProps) {
  return (
    <section
      role="region"
      className="px-4 py-5 bg-white shadow-task-card rounded-3xl"
    >
      <h2 className={clsx('uppercase font-bold mb-4', titleColor)}>{title}</h2>

      <div className="py-[18px] px-3 grid grid-flow-col items-center gap-3 text-xs text-neutral-primary font-medium select-none">
        <div className="truncate w-full mr-4">Título</div>
        <div className="flex justify-end gap-10 items-center w-full">
          <div className="w-fit">Status</div>
          <div className="w-[100px] hidden md:flex">Data de Criação</div>
          <div className="w-[160px] hidden md:flex">Criado por</div>
        </div>
      </div>

      <div>{children}</div>
    </section>
  )
}
