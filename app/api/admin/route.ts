import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from 'bcryptjs';
export async function POST(request: NextRequest) {
    const pass = request.nextUrl.searchParams.get('password');
    if (pass != process.env.CREATE_ADMIN_PASS) {
        return NextResponse.json({
            message: "Unauthorized",
        }, { status: 400 });
    }
    try {
        const pass = '12345678';
        const hashedPass = await bcrypt.hash(pass, 10);

        const admin = await prisma.admin.create({
            data: {
                name: "Mahmoud Khaled",
                email: "mahmoudnaggar2002@gmail.com",
                username: "mk2002",
                phone: "01145243378",
                password: hashedPass,
                jobTitle: "Website Ownner",
            }
        });
        return Response.json({ admin });
    } catch (ex) {
        return Response.json({ ex });
    }
}