import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'

import { SummaryCard } from './summary-card'

interface SummaryCardsProps {
  month: string
  balance: number
  investmentsTotal: number
  depositsTotal: number
  expensesTotal: number
  userCanAddTransaction?: boolean
}

export async function SummaryCards({
  balance,
  investmentsTotal,
  depositsTotal,
  expensesTotal,
  userCanAddTransaction,
}: SummaryCardsProps) {
  return (
    <div className="flex flex-col gap-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="larger"
        userCanAddTransaction={userCanAddTransaction}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investmentsTotal}
        />

        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />

        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  )
}
