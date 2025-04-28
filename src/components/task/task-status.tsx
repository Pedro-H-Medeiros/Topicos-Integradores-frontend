interface TaskStatusProps {
  label: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
}

export default function TaskStatus({ label }: TaskStatusProps) {
  return (
    <div className="rounded-xl text-white text-xs *:py-1 *:px-3 text-nowrap">
      {label === 'TODO' && (
        <div className="rounded-xl bg-gradient-to-t from-[#FF6574] to-[#E46975]">
          A fazer
        </div>
      )}
      {label === 'IN_PROGRESS' && (
        <div className="rounded-xl bg-gradient-to-t from-[#F39800] to-[#FFC225]">
          Em progresso
        </div>
      )}
      {label === 'COMPLETED' && (
        <div className="rounded-xl bg-gradient-to-t from-[#30CD60] to-[#2BB956]">
          Feita
        </div>
      )}
    </div>
  )
}
