import { InputHTMLAttributes } from 'react'

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="outline-none w-full shadow-input rounded-md p-3 placeholder:text-xs placeholder:font-normal placeholder:text-input-placeholder"
      {...props}
    />
  )
}
