"use client";
import { signIn,signOut,useSession } from "next-auth/react";
import React from 'react';
import '@/components/style/loginpage.scss'

function GoogleLogin( {close}:any) {
    const { data: session, status }:any = useSession();
    
    if (status === 'authenticated') {
        return <div><p onClick={logout}>Logout</p></div>
    }

    async function login(){
        const result = await signIn("google", {
            redirect: true,
            callbackUrl: "/home",
        });    
    }    

    async function logout(){
        await signOut()
    }

    return (
        <div>
            <img src="/images/google.png" alt="" />
            <p onClick={()=>{login(); close() }}>Login</p>
        </div>       
    );
}    

export default GoogleLogin;



