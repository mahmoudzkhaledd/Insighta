import { Check, Copy, LucideIcon, Terminal } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function CodeCopy({ text, title, HeaderIcon, children, className }:
    { text?: string; title: string; HeaderIcon?: LucideIcon; className?: string; children?: React.ReactNode; }) {
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

        <div className={cn("border-px relative flex h-full border flex-col overflow-hidden rounded-lg bg-clip-border shadow-[0_4px_8px_0_rgba(34,42,53,0.05),0_0_0_1px_rgba(34,42,53,0.08),0_1px_5px_-4px_rgba(19,19,22,0.70)]", className)}>
            <div className="flex items-center justify-between border-b bg-muted px-4 gap-x-6 py-2">
                <div className="flex items-center gap-x-2.5 truncate">
                    {
                        HeaderIcon && <HeaderIcon className='w-5' />
                    }
                    <p className="font-mono text-sm/5 truncate font-medium">{title}</p>
                </div>
                <Button onClick={copyText} variant={'ghost'} size={'icon'} >
                    {
                        copied ? <Check className='w-4' /> : <Copy className='w-4' />
                    }
                </Button >
            </div>
            <div className='px-6 py-4'>
                <pre
                    className="shiki css-variables h-full overflow-auto bg-[--shiki-background] text-sm/5 text-[--shiki-foreground] outline-none [overscroll-behavior-x:contain]"
                    tabIndex={0}
                >
                    {
                        !children && <code className="grid gap-y-1 ">
                            <span>
                                {text}
                            </span>
                        </code>
                    }
                    <div className={className}>
                        {children}
                    </div>
                </pre>
            </div>
        </div>
    )
}
