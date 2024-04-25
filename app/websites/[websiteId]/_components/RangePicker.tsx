'use client';
import { CalendarDateRangePicker } from '@/components/ui/date-range-picker'
import { isValidDate } from '@/lib/utils';
import { addDays, isValid, format } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';


export default function RangePicker({ fromDate, toDate }: { fromDate: Date, toDate: Date, }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();

    const defFrom = isValidDate(searchParams?.get("from")) ?? new Date();
    const defTo = isValidDate(searchParams?.get("to")) ?? addDays(new Date(), 1);

    const [date, setDate] = useState<DateRange | undefined>({ from: defFrom, to: defTo });
    const getDate = () => {
        const params = new URLSearchParams(searchParams?.toString())
        params.set('from', format(date?.from ?? new Date(), 'yyyy-MM-dd'));
        params.set('to', format(date?.to ?? addDays(new Date(), 1), 'yyyy-MM-dd'));
        return params.toString()
    };
    useEffect(() => {
        router.push(pathname + '?' + getDate())
    }, [date]);
    return (
        <CalendarDateRangePicker fromDate={fromDate} toDate={toDate} date={date} onRangeChange={setDate} />
    )
}
