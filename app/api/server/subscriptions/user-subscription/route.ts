import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isValidCuid } from "@/lib/utils";
export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get('userId');
    const includePkg = (request.nextUrl.searchParams.get("includePkg") == "true");
    if (userId == null || !isValidCuid(userId)) {
        return NextResponse.json({ msg: "User have no subscription" }, { status: 404 });
    }
    const sub = await prisma.subscription.findFirst({
        where: {
            userId,
        },
        include: {
            package: includePkg,
        }
    })
    return NextResponse.json({
        subscription: sub,
    }, { status: 200 });
}