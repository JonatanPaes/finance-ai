'use client'

import { TransactionType } from '@prisma/client'
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { Pie, PieChart } from 'recharts'

import { Card, CardContent } from '@/app/_components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/_components/ui/chart'
import type { TransactionPercentagePerType } from '@/app/_data/get-dashboard/types'

import { PercentageItem } from './percentage-item'

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: 'Investido',
    color: '#FFFFFF',
  },
  [TransactionType.DEPOSIT]: {
    label: 'Receita',
    color: '#55B02E',
  },
  [TransactionType.EXPENSE]: {
    label: 'Despesas',
    color: '#E93030',
  },
} satisfies ChartConfig

interface TransactionsPieChartProps {
  typesPercentage: TransactionPercentagePerType
  investmentsTotal: number
  depositsTotal: number
  expensesTotal: number
}

export function TransactionsPieChart({
  typesPercentage,
  depositsTotal,
  expensesTotal,
  investmentsTotal,
}: TransactionsPieChartProps) {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: '#55B02E',
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: '#E93030',
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: '#FFFFFF',
    },
  ]

  const hasNoData =
    depositsTotal === 0 &&
    expensesTotal === 0 &&
    investmentsTotal === 0 &&
    Object.values(typesPercentage).every((value) => isNaN(value) || value === 0)

  return (
    <Card className="flex flex-col p-6">
      {hasNoData ? (
        <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
          <p className="text-xl font-medium">Nenhuma transação encontrada</p>
          <p className="text-sm">
            Adicione novas transações para visualizar os dados.
          </p>
        </div>
      ) : (
        <>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="type"
                  innerRadius={60}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>

          <div className="space-y-3">
            <PercentageItem
              icon={<TrendingUpIcon size={16} className="text-primary" />}
              title="Receita"
              value={
                isNaN(typesPercentage[TransactionType.DEPOSIT])
                  ? 0
                  : typesPercentage[TransactionType.DEPOSIT]
              }
            />

            <PercentageItem
              icon={<TrendingDownIcon size={16} className="text-red-500" />}
              title="Despesas"
              value={
                isNaN(typesPercentage[TransactionType.EXPENSE])
                  ? 0
                  : typesPercentage[TransactionType.EXPENSE]
              }
            />

            <PercentageItem
              icon={<PiggyBankIcon size={16} />}
              title="Investido"
              value={
                isNaN(typesPercentage[TransactionType.INVESTMENT])
                  ? 0
                  : typesPercentage[TransactionType.INVESTMENT]
              }
            />
          </div>
        </>
      )}
    </Card>
  )
}
