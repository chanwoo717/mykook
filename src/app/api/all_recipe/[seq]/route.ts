import { NextRequest, NextResponse } from 'next/server';
// import type { NextApiRequest, NextApiResponse } from 'next'; 여기서 변경됨
import { test } from '../../db';

export async function GET(req: Request, { params }: any) {
    //req로 데이터 들어오고, parans로 url 맨뒤 값 가져옴
    // const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; 이메일형식
    const reg = /\d/;
    let data;
    if (reg.test(params.seq)) {
        data = await test('detail', { user_id: params.seq })
    } else {
        data = await test('detail', { m_cate: params.seq })
    }
    // const data2 = await test2('detail', {name:params.name})
    return NextResponse.json(data);
}

export async function DELETE(req: Request, { params }: any) {
    const data = await test('delete', { seq: params.seq })
    return NextResponse.json(data);
}

export async function PUT(req: Request,{params}:any) {
 
 
    const data = await req.json();
    
    return NextResponse.json( await test('put', {...data,seq:params.seq}));
}

