"use client";
import { useState } from 'react'
import { Input } from './input';
import { Check, Copy } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

export default function CodeSnippet({ text, className }: { className?: string; text?: string; }) {
    const [copied, setCopied] = useState(false);
    const copyText = () => {
        navigator.clipboard.writeText(text ?? "");
        setCopied(true);
        const delayDebounceFn = setTimeout(() => {
            setCopied(false);
            clearTimeout(delayDebounceFn);
        }, 2000)

    };
    return (
        <div className={cn(className)}>
            <div className="relative w-full">
                <Input
                    type="text"
                    defaultValue={text}
                    disabled={true}
                    readOnly={true}
                    className='w-full'
                />
                <Button
                    onClick={copyText}
                    type='button'
                    className="absolute end-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center"
                    variant={'outline'} size={'icon'}>
                    {
                        copied ? <Check className='w-4' /> :
                            <Copy className='w-4' />
                    }
                </Button>

            </div>
        </div>

    )
}
