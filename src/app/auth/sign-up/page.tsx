'use client'

import Input from '@/components/input'
import {
  registerAdminSchema,
  RegisterAdminSchema,
} from '@/schemas/register-admin.schema'
import { registerAdmin } from '@/services/register-admin'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function SignUp() {
  const router = useRouter()

  const { mutateAsync: registerAdminFn, isPending: isPendingRegister } =
    useMutation({
      mutationFn: registerAdmin,
    })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterAdminSchema>({
    resolver: zodResolver(registerAdminSchema),
  })

  async function handleSubmitForm(data: RegisterAdminSchema) {
    try {
      await registerAdminFn({ ...data })
      toast.success('Usuário criado.')
      router.replace('/auth/sign-in')
    } catch {
      toast.error('Erro ao criar usuário.')
    }
  }

  return (
    <main className="flex flex-col items-center max-w-[428px]">
      <h1 className="md:text-4xl text-xl text-title mb-10">Cadastrar</h1>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-y-9"
      >
        <div className="w-full">
          <label htmlFor="name" className="text-title text-sm md:text-xl">
            Nome:
          </label>
          <Input
            id="name"
            placeholder="Digite seu nome"
            {...register('name', {
              required: true,
            })}
          />
          {errors.name && (
            <div className="text-sm text-red-500">{errors.name.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="email" className="text-title text-sm md:text-xl">
            E-mail:
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="off"
            placeholder="Digite seu e-mail"
            {...register('email', {
              required: true,
            })}
          />
          {errors.email && (
            <div className="text-sm text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="password" className="text-title text-sm md:text-xl">
            Senha:
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            {...register('password', {
              required: true,
            })}
          />
          {errors.password && (
            <div className="text-sm text-red-500">
              {errors.password.message}
            </div>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-title text-white cursor-pointer rounded-md py-3"
        >
          {isPendingRegister ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
      <p className="text-title mt-8 text-center">
        Ja possui conta?{' '}
        <Link href="/auth/sign-in" className="font-black">
          Login
        </Link>
      </p>
    </main>
  )
}
