"use client";
import React, { useEffect } from 'react';
import Bookmarkview from '../UIUX/Bookmarkview';
import { useStore2 } from '../recipe_store/bookmark_store';
import { useSession } from 'next-auth/react';
import GoogleLogin from './GoogleLogin';
import NaverLogin from './NaverLogin';

function Bookmark({idx}:any) {

    
    const { data2, dataCrl2} = useStore2();
    const { data: session, status }: any = useSession();
    if(!session){
        return  <div className='isLogin'>
            <h1>Hello!</h1>
            <p>지금 로그인하고 다양한 서비스를 이용해보세요.</p>
            <GoogleLogin />
            <NaverLogin/>
            </div>
    }
    const userbook = data2.filter((user:any) => user.user_id == session.user.id)
    




    if(!userbook) return ;

    let comp;
    switch (idx) {
        case "북마크":
            comp=<Bookmarkview data2={userbook} dataCrl2={dataCrl2}/>
            break;
        
        default:
            break;
    }


    return (
        <div>
            {comp}
        </div>
    );
}

export default Bookmark;