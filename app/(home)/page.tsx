import { auth } from '@clerk/nextjs/server'
import { isMatch } from 'date-fns'
import { redirect } from 'next/navigation'

import { Navbar } from '../_components/navbar'
import { getDashboard } from '../_data/get-dashboard'
import { SummaryCards } from './_components/summary-cards'
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
    redirect('?month=01')
  }
  const dashboard = await getDashboard(month)

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards month={month} {...dashboard} />

            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionsPieChart {...dashboard} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
