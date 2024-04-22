import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getLastFriday } from "@/lib/utils";
export async function POST(request: NextRequest) {
    const pass = request.nextUrl.searchParams.get('password');
    if (pass != process.env.CREATE_ADMIN_PASS) {
        return NextResponse.json({
            message: "Unauthorized",
        }, { status: 400 });
    }
    try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const lastFriday = getLastFriday(new Date()).getDate() + 1;
        const analysis = await prisma.usersAnalysis.create({
            data: {
                id: 1,
                lastUpdateMonth: currentMonth,
                lastUpdateWeek: lastFriday,
            }
        });
        return Response.json({ analysis });
    } catch (ex) {
        return Response.json({ ex });
    }
}