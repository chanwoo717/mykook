"use client";
import { signIn,signOut,useSession } from "next-auth/react";
import React from 'react';

function NaverLogin({close}:any) {
    const { data: session, status }:any = useSession();
    
    if (status === 'authenticated') {
        return ;
    }

    async function login(){
        const result = await signIn("naver", {
            redirect: true,
            callbackUrl: "/home",
        });    
    }    

    async function logout(){
        await signOut()
    }

    return (
        <div>
            <img src="/images/naver.png" alt="" />
            <p onClick={()=>{login(); close()}}>Login</p>
        </div>       
    );
}    

export default NaverLogin;