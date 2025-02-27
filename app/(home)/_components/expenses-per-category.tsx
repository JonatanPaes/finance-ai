import { CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { Progress } from '@/app/_components/ui/progress'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { TRANSACTION_CATEGORY_LABELS } from '@/app/_constants/transactions'
import { TotalExpensePerCategory } from '@/app/_data/get-dashboard/types'

interface ExpensesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[]
}

export function ExpensesPerCategory({
  expensesPerCategory,
}: ExpensesPerCategoryProps) {
  const hasNoData =
    expensesPerCategory.length === 0 ||
    expensesPerCategory.every((category) => category.percentageOfTotal === 0)

  return (
    <ScrollArea className="col-span-2 h-full w-full rounded-md border pb-6">
      <CardHeader>
        <CardTitle className="font-bold">Gastos por Categoria</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {hasNoData ? (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
            <p className="text-lg font-medium">Nenhum gasto encontrado</p>
            <p className="text-sm">
              Não há despesas registradas para esta categoria.
            </p>
          </div>
        ) : (
          expensesPerCategory.map((category) => (
            <div key={category.category} className="space-y-2">
              <div className="flex w-full justify-between">
                <p className="text-sm font-bold">
                  {TRANSACTION_CATEGORY_LABELS[category.category]}
                </p>
                <p className="text-sm font-bold">
                  {category.percentageOfTotal}%
                </p>
              </div>
              <Progress value={category.percentageOfTotal} />
            </div>
          ))
        )}
      </CardContent>
    </ScrollArea>
  )
}
