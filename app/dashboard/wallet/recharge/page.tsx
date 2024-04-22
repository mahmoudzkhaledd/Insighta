"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toNumber } from '@/lib/utils';
import { amountSchema } from '@/types/ChargeAmountSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { chargeBalance } from '../_actions/GetChargeLink';
import toast from 'react-hot-toast';



export default function RechargeBalance() {
  const [loading, startTrans] = useTransition();

  const form = useForm<z.infer<typeof amountSchema>>({
    resolver: zodResolver(amountSchema),
    defaultValues: {
      amount: 0.0,
    },
  });
  const getUrl = (values: z.infer<typeof amountSchema>) => {
    startTrans(async () => {
      const res = await chargeBalance(values);
      if (res?.error) {
        toast.error(res.error);
        return ;
      }
    })
  };
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='p-5 max-w-[500px] w-[500px] rounded-md border'>
        <h2 className='text-xl font-bold'>Charge balance</h2>
        <hr className='mt-3 mb-5' />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(getUrl)}>
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel> Amount </FormLabel>
                  <FormControl>
                    <Input
                      className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                      disabled={loading}
                      type='text'
                      onChange={(e) => field.onChange(toNumber(e.target.value) ?? 0)}
                      placeholder='$50' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button loading={loading} disabled={loading} className=' mt-9 w-full'>Get payment link</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
