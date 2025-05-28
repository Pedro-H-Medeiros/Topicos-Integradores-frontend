'use client'

import Input from '@/components/input'
import { SignInSchema, signInSchema } from '@/schemas/authenticate.schema'
import { authenticate } from '@/services/authenticate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function SignIn() {
  const router = useRouter()

  const { mutateAsync: authenticateFn, isPending: isPendingAuthenticate } =
    useMutation({
      mutationFn: authenticate,
      onSuccess(data) {
        localStorage.setItem('sessionId', data.access_token)
      },
    })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  async function handleSubmitForm(
    data: SignInSchema,
    e?: React.BaseSyntheticEvent,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    e && e.preventDefault()
    try {
      await authenticateFn({ ...data })
      toast.success('Usuário Autenticado.')
      router.replace('/tasks')
    } catch {
      toast.error('Erro ao realizar login.')
    }
  }

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId')
    if (sessionId) {
      router.replace('/tasks')
    }
  }, [])

  return (
    <main className="flex flex-col items-center max-w-[428px]">
      <h1 className="md:text-4xl text-xl text-title mb-10">Login</h1>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-y-9"
      >
        <div className="max-w-full">
          <label htmlFor="email" className="text-title text-sm md:text-xl">
            E-mail:
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            {...register('email', {
              required: true,
            })}
          />
          {errors.email && (
            <div className="text-sm text-red-500 w-full">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="max-w-full">
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
            <div className="text-sm text-red-500 w-full">
              {errors.password.message}
            </div>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-title text-white cursor-pointer rounded-md py-3"
        >
          {isPendingAuthenticate ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
      <p className="text-title mt-8 text-center">
        Ainda não tenho conta?{' '}
        <Link href="/auth/sign-up" className="font-black">
          Cadastrar
        </Link>
      </p>
    </main>
  )
}
