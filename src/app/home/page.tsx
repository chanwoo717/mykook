'use client';
import React, { useEffect, useState } from 'react';
import { useStore } from '@/components/recipe_store/all_store';
import Button from "../../components/UIUX/Button";
import RecipeList from '@/components/service/RecipeList';
import "@/components/style/home.scss";
import Link from 'next/link';
import Topbutton from '@/components/UIUX/Topbutton';



function Page() {

    const idx = "가로"
    let [cateName2, setCateName2] = useState('RICE');
    let [sortCate, setSortCate] = useState('밥');

    let [selectName, setSelectName] = useState('latest');
    let [fameImg, setFameImg] = useState<any>();

    
    const handleSelect = (e: any) => {
        setSelectName(e.target.value);
    };



    

    return (
        <div className='home_main_backcolor'>
            <Link href='/search'>
                <div className='searchDiv'>
                    <img src="/images/search_black.png" alt="" />
                    <p>오늘 뭐 먹지??</p>
                </div>
            </Link>
            <Button setSortCate={setSortCate} setCateName2={setCateName2} setFameImg={setFameImg} />
            <div className='fame'>
                <p>명예의 전당</p>
                <img src={fameImg} alt="오류" />
            </div>
            <div className='sub_category'>
                <p>{cateName2}</p>
                <select name="search_cate" onChange={handleSelect} id="search_cate">
                    <option value="latest">최신순</option>
                    <option value="star">별점순</option>
                </select>
            </div>
            <RecipeList setFameImg={setFameImg} sortCate={sortCate} selectName={selectName} idx={idx} />
            <Topbutton/>
        </div>
    );
}

export default Page;