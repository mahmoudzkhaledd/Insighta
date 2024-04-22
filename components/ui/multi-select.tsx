"use client";

import * as React from "react";
import { Check, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { useCallback, useRef, useState } from "react";
import { Button } from "./button";

export type MultySelectProps = Record<"value" | "label", string>;


export function MultiSelect({ text, values, onSelect, selected }: { text?: string; selected?: MultySelectProps[], values?: MultySelectProps[], onSelect?: React.Dispatch<React.SetStateAction<MultySelectProps[]>> }) {
    values = values ?? [];
    selected = selected ?? [];

    onSelect = onSelect ?? function () { };
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleUnselect = useCallback((value: MultySelectProps) => {
        onSelect(prev => prev.filter((s) => s.value !== value.value));
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current
        if (input) {
            if (e.key === "Delete" || e.key === "Backspace") {
                if (input.value === "") {
                    onSelect(prev => {
                        const newSelected = [...prev];
                        newSelected.pop();
                        return newSelected;
                    })
                }
            }
            // This is not a default behaviour of the <input /> field
            if (e.key === "Escape") {
                input.blur();
            }
        }
    }, []);

    const selectables = values.filter(val => !selected.includes(val));

    return (
        <div>
            <Button
                value={inputValue}
                onClick={() => setOpen(!open)}

                className="w-full"
                variant={'outline'}
                size={'sm'}
            >
                {text}
            </Button>
            <div className="relative w-fit mt-2">
                {open && selectables.length > 0 ?
                    <div className="absolute w-fit z-10 left-0 right-0 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                        {selectables?.map((value, idx) => {

                            return (
                                <Button
                                    size={'sm'}
                                    
                                    key={idx}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={(v) => {
                                        setInputValue("")
                                        const found = selected.filter(x => x.value == value.value);
                                        if (found.length != 0) {
                                            onSelect(prev => prev.filter(x => x.value != value.value));
                                            return;
                                        }

                                        onSelect(prev => [...prev, value]);
                                    }}
                                    className={"cursor-pointer flex items-center gap-1 w-full"}
                                    variant={'ghost'}
                                >
                                    {
                                        selected.filter(x => x.value == value.value).length != 0 && <Check className="w-4" />
                                    }
                                    {value.label}
                                </Button>
                            );
                        })}
                    </div>
                    : null}
            </div>
        </div>
    )
}