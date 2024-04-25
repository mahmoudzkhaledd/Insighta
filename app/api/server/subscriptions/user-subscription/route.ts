import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isValidCuid } from "@/lib/utils";
import { getUserSubscription } from "@/Services/Subscription/GetUserSubscription";
export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get('userId');
    const includePkg = (request.nextUrl.searchParams.get("includePkg") == "true");
    if (userId == null || !isValidCuid(userId)) {
        return NextResponse.json({ msg: "User have no subscription" }, { status: 404 });
    }
    const { subscription, expired } = await getUserSubscription({ userId, includePackage: includePkg, state: "accepted" });
    
    return NextResponse.json({ subscription, expired }, { status: 200 });
}