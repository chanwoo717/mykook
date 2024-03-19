import { NextRequest, NextResponse } from 'next/server';
// import type { NextApiRequest, NextApiResponse } from 'next'; 여기서 변경됨
import { test3 } from '../../db3';

export async function GET(req: Request, { params }: any) {
    //req로 데이터 들어오고, parans로 url 맨뒤 값 가져옴
    const data2 = await test3('detail', { user_id: params.user })
    return NextResponse.json(data2);
}


export async function DELETE(req: Request, { params }: any) {
    const data2 = await test3('delete', { id: params.user })
    return NextResponse.json(data2);
}


export async function PUT(req:Request, {params}:any){
    const data3 = await test3('put', await req.json())
    return NextResponse.json( await test3('put', {...data3,seq:params.seq}));
}