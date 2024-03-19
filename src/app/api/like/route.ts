import { NextRequest, NextResponse } from 'next/server';
import {test4} from '../db4';

export async function GET(){

    return NextResponse.json(await test4());
    // NextResponse.json(await test2());
}

export async function POST(req:Request){
    const aa = await req.json();
    return NextResponse.json(await test4('post', aa));
}
// 'post', req.json())