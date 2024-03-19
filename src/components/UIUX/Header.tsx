//헤더메뉴
"use client";
import React, { useState } from 'react';
import "../style/header_footer.scss";
import Bugger from './Bugger';
import Link from 'next/link';
import {Nerko_One} from "next/font/google"; 

const nerko = Nerko_One({
    preload: false,
    subsets: ['latin'],
    weight: ["400"]
})

function Header({setSelName}:any) {
    let [on,setOn] = useState(false);
    const on_btn = ()=>{
        setOn(true);
    }
    
    return (

        <div className='head'>
            <h1 className={nerko.className}><Link href="/home" >KooK KooK</Link></h1>
            <div className='bugger_menu' onClick={on_btn}>
                <p>ㅡ</p>
                <p>ㅡ</p>
                <p>ㅡ</p>
            </div>
            {on && <Bugger setSelName={setSelName} setOn={setOn} />}
        </div>
        

    );
}

export default Header;