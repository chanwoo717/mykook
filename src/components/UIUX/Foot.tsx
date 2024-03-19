//푸터메뉴 aaaa
import Link from 'next/link';
import React, { useState } from 'react';
import "../style/header_footer.scss";
import { usePathname } from 'next/navigation';



function Foot() {
    let footData = [
        {name :"/home", imgurl:"/images/home_yellow.png",imgurl2:"/images/home_full.png"},
        {name :"/search", imgurl:"/images/search_yellow.png",imgurl2:"/images/Search_full.png"},
        {name :"/bookmark", imgurl:"/images/bookmark_before.png",imgurl2:"/images/bookmark_after.png"},
        {name :"/mypage", imgurl:"/images/user_yellow.png",imgurl2:"/images/user_full.png"}
    ];
    const url = usePathname();
    



    return (
        <div className='foot'>
            {
                footData.map((obj,k):any=>(
                    <Link key={k} href={obj.name}><img src={url==obj.name? obj.imgurl2:obj.imgurl} alt="" /></Link>
                ))
            }
        </div>
    );
}

export default Foot;