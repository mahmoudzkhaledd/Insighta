"use client"
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React from "react";
import { CircularProgressbar as CirProgress, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({ size, strokeWidth, progress, className, fontSize }: {
    size: number;
    strokeWidth: number;
    progress: number;
    className?: string;
    fontSize: number;
}) => {
    const isLight = (useTheme().theme ?? "light") == 'light';
    return <div className={cn(" max-w-[150px] aspect-square", className)}>
        <CirProgress
            value={progress}
            text={`${progress}%`}
            
            styles={buildStyles({
                strokeLinecap: 'butt',
                textSize: '13px',
                pathTransitionDuration: 0.5,
                pathColor: isLight ? `#27272a` : "white",
                textColor: isLight ? '#27272a' : "white",
            })}
        />
    </div>

};
export default CircularProgressBar;
