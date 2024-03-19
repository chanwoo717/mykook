'use client';
import React, { useEffect, useState } from 'react';
import { useStore } from '@/components/recipe_store/all_store';
import Button from "../../components/UIUX/Button";
import RecipeList from '@/components/service/RecipeList';
import "@/components/style/home.scss";
import Link from 'next/link';
import Topbutton from '@/components/UIUX/Topbutton';
function Page() {

    const { data, cateName, category } = useStore()

    const idx = "가로"
    let [cateName2, setCateName2] = useState('');
    let [selectName, setSelectName] = useState('latest');
    let [fameImg, setFameImg] = useState<any>();

    
    useEffect(() => {
        if (data.length) {
            const maxLike = data.reduce((max: number, obj: any) => {
                const like = parseFloat(obj.like);
                return like > max ? like : max;
            }, 0);
            const maxData = data.filter((obj: any) => obj.like == maxLike)
            setFameImg(maxData[0].m_thumb);
        }
    }, [data])
    

    useEffect(() => {
        if (cateName == "밥") {
            setCateName2('RICE');
        } else if (cateName == '국&찌개') {
            setCateName2('SOUP')
        } else if (cateName == '반찬') {
            setCateName2('SIDE DISH')
        } else if (cateName == '일품') {
            setCateName2('SPECIAL')
        } else if (cateName == '후식') {
            setCateName2('DESSERT')
        } else if (cateName == '기타') {
            setCateName2('ETC')
        }
    }, [cateName])

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
            <Button />
            <div className='fame'>
                <p>명예의 전당</p>
                <img src={fameImg} alt="" />
            </div>
            <div className='sub_category'>
                <p>{cateName2}</p>
                <select name="search_cate" onChange={handleSelect} id="search_cate">
                    <option value="latest">최신순</option>
                    <option value="star">별점순</option>
                </select>
            </div>
            <RecipeList selectName={selectName} idx={idx} />
            <Topbutton/>
        </div>
    );
}

export default Page;