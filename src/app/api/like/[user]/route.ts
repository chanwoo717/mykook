import { NextRequest, NextResponse } from 'next/server';
// import type { NextApiRequest, NextApiResponse } from 'next'; 여기서 변경됨
import {test4} from '../../db4';

export async function GET(req:Request, {params}:any){
    //req로 데이터 들어오고, parans로 url 맨뒤 값 가져옴
    const data4 = await test4('detail', {seq:params.user})
    return NextResponse.json(data4);
}


export async function DELETE(req:Request, {params}:any){
    const data4 = await test4('delete', {seq:params.user})
    return NextResponse.json(data4);
}


export async function PUT(req:Request, {params}:any){
    const data4 = await test4('put', await req.json())
    return NextResponse.json( await test4({...data4,seq:params.user}));
}