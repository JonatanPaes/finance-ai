import { auth, clerkClient } from '@clerk/nextjs/server'
import { isMatch } from 'date-fns'
import { redirect } from 'next/navigation'

import { Navbar } from '../_components/navbar'
import { ScrollArea } from '../_components/ui/scroll-area'
import { canUserAddTransaction } from '../_data/can-user-add-transaction'
import { getDashboard } from '../_data/get-dashboard'
import { AiReportButton } from './_components/ai-report-button'
import { ExpensesPerCategory } from './_components/expenses-per-category'
import { LastTransactions } from './_components/last-transactions'
import { SummaryCards } from './_components/summary-cards'
import { TimeSelect } from './_components/time-select'
import { TransactionsPieChart } from './_components/transactions-pie-chart'

interface HomeProps {
  searchParams: {
    month: string
  }
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/login')
  }

  const monthIsInvalid = !month || !isMatch(month, 'MM')

  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`)
  }
  const dashboard = await getDashboard(month)

  const userCanAddTransaction = await canUserAddTransaction()

  const user = await clerkClient().users.getUser(userId)

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-65px)]">
        <ScrollArea className="h-full">
          <div className="flex min-h-full flex-col p-6">
            <div className="mb-6 flex justify-between">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <div className="flex items-center gap-3">
                <AiReportButton
                  month={month}
                  hasPremiumPlan={
                    user.publicMetadata.subscriptionPlan === 'premium'
                  }
                />
                <TimeSelect />
              </div>
            </div>

            <div className="grid min-h-[calc(100vh-200px)] w-full grid-cols-1 gap-6 md:grid-cols-[3fr,auto]">
              <div className="flex flex-col gap-6">
                <SummaryCards
                  month={month}
                  userCanAddTransaction={userCanAddTransaction}
                  {...dashboard}
                />

                <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3">
                  <TransactionsPieChart {...dashboard} />
                  <ExpensesPerCategory
                    expensesPerCategory={dashboard.totalExpensePerCategory}
                  />
                </div>
              </div>

              <LastTransactions lastTransactions={dashboard.lastTransactions} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
