import { NextRequest, NextResponse } from 'next/server';
import { test3 } from '../db3';

export async function GET() {

    return NextResponse.json(await test3());
    // NextResponse.json(await test2());
}

export async function POST(req: Request) {
    const aa = await req.json();
    return NextResponse.json(await test3('post', aa));
}
// 'post', req.json())