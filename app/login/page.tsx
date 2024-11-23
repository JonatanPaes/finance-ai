import { SignInButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { LogInIcon } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { Button } from '../_components/ui/button'

export default async function LoginPage() {
  const { userId } = await auth()

  if (userId) {
    redirect('/')
  }

  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-2">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <Image
          src="/logo.svg"
          alt="Finance AI"
          width={175}
          height={40}
          className="mb-8"
        />

        <h1 className="mb-3 text-3xl font-bold md:text-4xl">Bem-vindo</h1>

        <p className="mb-8 text-sm text-muted-foreground md:text-base">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>

        <SignInButton>
          <Button variant="outline" className="w-full md:w-auto">
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>

      <div className="relative hidden h-full w-full md:block">
        <Image
          src="/login.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}
