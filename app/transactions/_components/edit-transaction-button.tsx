'use client'

import type { Transaction } from '@prisma/client'
import { PencilIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/app/_components/ui/button'
import { UpsertTransactionDialog } from '@/app/_components/upsert-transaction-dialog'

interface EditTransactionButtonProps {
  transaction: Transaction
}

export function EditTransactionButton({
  transaction,
}: EditTransactionButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
        }}
        transactionId={transaction.id}
      />
    </>
  )
}
