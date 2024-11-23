'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select'

const MONTH_OPTIONS = [
  { value: '01', label: 'January', display: 'Janeiro' },
  { value: '02', label: 'February', display: 'Fevereiro' },
  { value: '03', label: 'March', display: 'Março' },
  { value: '04', label: 'April', display: 'Abril' },
  { value: '05', label: 'May', display: 'Maio' },
  { value: '06', label: 'June', display: 'Junho' },
  { value: '07', label: 'July', display: 'Julho' },
  { value: '08', label: 'August', display: 'Agosto' },
  { value: '09', label: 'September', display: 'Setembro' },
  { value: '10', label: 'October', display: 'Outubro' },
  { value: '11', label: 'November', display: 'Novembro' },
  { value: '12', label: 'December', display: 'Dezembro' },
]

export function TimeSelect() {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const month = searchParams.get('month')

  const handleMonthChange = (month: string) => {
    push(`/?month=${month}`)
  }

  return (
    <Select
      onValueChange={(value) => handleMonthChange(value)}
      defaultValue={month ?? ''}
    >
      <SelectTrigger className="w-[150px] rounded-full">
        <SelectValue placeholder="Mês" />
      </SelectTrigger>
      <SelectContent>
        {MONTH_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.display}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
