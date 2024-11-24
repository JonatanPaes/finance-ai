import type { ReactNode } from 'react'

import { AddTransactionButton } from '@/app/_components/add-transaction-button'
import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'

interface SummaryCardProps {
  icon: ReactNode
  title: string
  amount: number
  size?: 'small' | 'larger'
  userCanAddTransaction?: boolean
  className?: string
}

export function SummaryCard({
  icon,
  title,
  amount,
  size = 'small',
  userCanAddTransaction,
  className,
}: SummaryCardProps) {
  return (
    <Card
      className={`${size === 'larger' ? 'bg-white bg-opacity-5' : ''} ${className}`}
    >
      <CardHeader className="flex-row items-center gap-2 p-4 sm:gap-4 sm:p-6">
        <div className="flex-shrink-0">{icon}</div>
        <p
          className={`${
            size === 'small' ? 'text-muted-foreground' : 'text-white opacity-70'
          } text-sm sm:text-base`}
        >
          {title}
        </p>
      </CardHeader>

      <CardContent className="flex flex-col justify-between gap-4 p-4 sm:flex-row sm:p-6">
        <p
          className={`font-bold ${
            size === 'small'
              ? 'text-xl sm:text-2xl'
              : 'text-2xl sm:text-3xl lg:text-4xl'
          }`}
        >
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(amount)}
        </p>

        {size === 'larger' && (
          <div className="flex justify-end">
            <AddTransactionButton
              userCanAddTransaction={userCanAddTransaction}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
