import { auth, clerkClient } from '@clerk/nextjs/server'
import { CheckIcon, XIcon } from 'lucide-react'
import { redirect } from 'next/navigation'

import { Navbar } from '../_components/navbar'
import { Badge } from '../_components/ui/badge'
import { Card, CardContent, CardHeader } from '../_components/ui/card'
import { getCurrentMonthTransactions } from '../_data/get-current-month-transactions'
import { AcquirePlanButton } from './_components/acquire-plan-button'

export default async function SubscriptionPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/login')
  }

  const user = await clerkClient().users.getUser(userId)
  const currentMonthTransactions = await getCurrentMonthTransactions()
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan == 'premium'

  return (
    <>
      <Navbar />

      <div className="space-y-4 p-4 md:space-y-6 md:p-6">
        <h1 className="text-xl font-bold md:text-2xl">Assinatura</h1>

        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <Card className="w-full md:w-[450px]">
            <CardHeader className="border-b border-solid py-6 md:py-8">
              <h2 className="text-center text-xl font-semibold md:text-2xl">
                Plano Básico
              </h2>

              <div className="flex items-center justify-center gap-2 md:gap-3">
                <span className="text-3xl md:text-4xl">R$</span>
                <span className="text-5xl font-semibold md:text-6xl">0</span>
                <div className="text-xl text-muted-foreground md:text-2xl">
                  /mês
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 py-6 md:space-y-6 md:py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-primary md:h-6 md:w-6" />
                <p className="text-sm md:text-base">
                  Apenas 10 transações por mês ({currentMonthTransactions}/10)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <XIcon className="h-5 w-5 md:h-6 md:w-6" />
                <p className="text-sm md:text-base">Relatórios de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full md:w-[450px]">
            <CardHeader className="relative border-b border-solid py-6 md:py-8">
              {hasPremiumPlan && (
                <Badge className="absolute left-2 top-8 bg-primary/10 text-xs text-primary md:left-4 md:top-12 md:text-sm">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-xl font-semibold md:text-2xl">
                Plano Premium
              </h2>
              <div className="flex items-center justify-center gap-2 md:gap-3">
                <span className="text-3xl md:text-4xl">R$</span>
                <span className="text-5xl font-semibold md:text-6xl">19</span>
                <div className="text-xl text-muted-foreground md:text-2xl">
                  /mês
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 py-6 md:space-y-6 md:py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-primary md:h-6 md:w-6" />
                <p className="text-sm md:text-base">Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-primary md:h-6 md:w-6" />
                <p className="text-sm md:text-base">Relatórios de IA</p>
              </div>

              <AcquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
