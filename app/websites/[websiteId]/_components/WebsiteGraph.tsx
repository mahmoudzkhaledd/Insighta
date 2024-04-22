"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { pointSchema } from '@/types/WebsiteSchema'
import { ResponsiveLine } from '@nivo/line'
import { useTheme } from 'next-themes'

import React, { useState } from 'react'
import { z } from 'zod'

export default function WebsiteGraph({ visits, visitorsCount, visitsCount, visitors, }: { visits: z.infer<typeof pointSchema>[], visitors: z.infer<typeof pointSchema>[], visitorsCount: number; visitsCount: number; }) {
    const setGraph = (data: z.infer<typeof pointSchema>[]): { x: Date, y: number }[] => {
        return data.map(e => { return { x: new Date(e.date), y: e.count } });
    };
    const isLight = useTheme().theme == 'light';

    const [graph, setVal] = useState<{ x: Date, y: number }[]>(setGraph(visits));


    const handleValueChange = (value: string) => {
        let newGraph: { x: Date, y: number }[] = [];
        if (value == "visits") {
            newGraph = setGraph(visits);
        } else if (value == 'visitors') {
            newGraph = setGraph(visitors);
        }
        setVal(newGraph);
    };
    return (
        <Card className="p-0 ">

            <CardHeader className='w-full'>
                <Tabs onValueChange={handleValueChange} defaultValue="visits" className="w-full">
                    <TabsList className='w-full h-fit'>
                        <TabsTrigger className='text-start flex flex-col h-full w-full' value="visits">
                            <p className=' text-gray-400'>Visits</p>
                            <h2 className=' text-2xl font-extrabold'>{visitsCount}</h2>
                        </TabsTrigger>
                        <TabsTrigger className='flex flex-col text-start h-full w-full' value="visitors">
                            <p className=' text-gray-400'>Visitors</p>
                            <h2 className=' text-2xl font-extrabold'>{visitorsCount}</h2>
                        </TabsTrigger>
                    </TabsList>

                </Tabs>
            </CardHeader>
            <CardContent>
                <div className="aspect-[9/4]">

                    <ResponsiveLine
                        data={[
                            {
                                id: "Data",
                                data: graph,
                            }
                        ]}
                        margin={{ top: 10, right: 10, bottom: 70, left: 40 }}
                        xScale={{
                            type: "time",
                            format: "%m/%d",
                        }}

                        xFormat="time:%m/%d"
                        yScale={{
                            type: "linear",
                            max: "auto",
                            min: 0,
                        }}

                        enableGridX={false}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 0,
                            tickPadding: 16,
                            tickRotation: 0,
                            truncateTickAt: 10,
                            format: "%m/%d",

                        }}
                        axisLeft={{
                            tickSize: 0,
                            tickValues: 5,
                            tickPadding: 16,
                            ticksPosition: 'before'
                        }}
                        colors={["#2563eb", "#e11d48"]}
                        pointSize={6}
                        useMesh={true}
                        curve="monotoneX"
                        enableArea={true}
                        gridYValues={6}
                        animate={false}
                    
                        defs={[
                            {
                                id: "line-chart-gradient",
                                type: "linearGradient",
                                colors: [
                                    { offset: 0, color: "inherit" },
                                    { offset: 200, color: "inherit", opacity: 0 },
                                ],
                            },
                        ]}
                        fill={[{ match: "*", id: "line-chart-gradient" }]}
                        theme={{
                            tooltip: {
                                chip: {
                                    borderRadius: "9999px",
                                },
                                container: {
                                    fontSize: "12px",
                                    textTransform: "capitalize",
                                    borderRadius: "6px",
                                    backgroundColor: isLight ? "white" : "#27272a",
                                },
                            },
                            
                            grid: {
                                line: {
                                    stroke: isLight ? "#eaeaea" : "#f3f4f6",
                                },
                            },
                        }}
                        role="application"
                    />
                </div>
            </CardContent>
        </Card>
    )
}
