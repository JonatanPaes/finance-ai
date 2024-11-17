'use server'

import { auth } from '@clerk/nextjs/server'
import type {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

import { upsertTransactionSchema } from './schema'

interface AddTransactionParams {
  id?: string
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
}

export async function addTransaction(params: AddTransactionParams) {
  upsertTransactionSchema.parse(params)
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  await db.transaction.create({
    data: { ...params, userId },
  })
  revalidatePath('/transactions')
}
