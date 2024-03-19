"use client";
import React, { useEffect, useState } from 'react';

import "@/components/style/mypage.scss";
import { useStore } from '@/components/recipe_store/all_store';
import { useStore4 } from '@/components/recipe_store/comment_store';
import { useSession } from 'next-auth/react';
import Profile from '@/components/UIUX/Profile';
import MypageButton from '@/components/UIUX/MypageButton';
import Mypageview from '@/components/service/Mypageview';
import GoogleLogin from '@/components/service/GoogleLogin';
import '../../components/style/bookmark.scss';
import NaverLogin from '@/components/service/NaverLogin';



function Page() {

    let { data, dataCrl } = useStore();
    let { data4, dataCrl4 } = useStore4();
    const { data: session, status }: any = useSession();
    const [idx, setIdx] = useState('내 레시피');


    if (!session) {
        return <div className='isLogin'>
        <h1>Hello!</h1>
        <p>지금 로그인하고 다양한 서비스를 이용해보세요.</p>
        <GoogleLogin />
        <NaverLogin/>
        </div>
    }


    let idxdata = (a: any) => {
        setIdx(a)
    }

    



    if (!session) return


    return (
        <div>
            <Profile session={session} />
            <MypageButton idxdata={idxdata} session={session} dataCrl={dataCrl} dataCrl4={dataCrl4} />
            <Mypageview idx={idx} session={session} dataCrl={dataCrl} dataCrl4={dataCrl4} />
        </div>
    );
}

export default Page;