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

      <div className="max-w-full w-full">{children}</div>
    </section>
  )
}
