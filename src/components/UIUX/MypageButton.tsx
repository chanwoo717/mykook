

'use client';
import React from 'react';
import "@/components/style/mypage.scss";
import Link from "next/link";
function MypageButton({ idxdata, session, dataCrl, dataCrl4 }: any) {



    return (
        <div className='my_btn'>
           
            <button onClick={() => {idxdata('내 레시피'); dataCrl('나의레시피', `${session.user.id}`, '') }}><img src='/images/recipe_black.png' />My recipe</button>
            <button onClick={() => {idxdata('내 댓글'); dataCrl4('user', `${session.user.id}`, '') }}><img src='/images/comment_black.png' />Comment</button>
            <button onClick={() => {idxdata('내가 본 레시피'); dataCrl('나의레시피', '일품', '') }}><img src='/images/heart_black.png' />Like</button>
            <Link className='Reg_btn' href='/mypage/reg'><button><img src='/images/register_black.png' />Upload</button></Link>
        </div>
    );
}

export default MypageButton;