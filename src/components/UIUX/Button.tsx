import React, { useState, useEffect } from 'react';
import { useStore } from '../recipe_store/all_store';
import recipe from "@/lib/recipe.json";

function Button({setCateName2,setSortCate, setFameImg}:any) {
    const [clickedIndex, setClickedIndex] = useState(0);

    const buttons = [
        { label: 'RICE', category: '밥', image: '/images/rice_black.png' },
        { label: 'SOUP', category: '국&찌개', image: '/images/soup_black.png' },
        { label: 'SIDE', category: '반찬', image: '/images/sidedish_black.png' },
        { label: 'SPECIAL', category: '일품', image: '/images/special_black.png' },
        { label: 'DESSERT', category: '후식', image: '/images/dessert_black.png' },
        { label: 'ETC', category: '기타', image: '/images/etc_black.png' }
    ];


    const buttonClick = (category:string,index:number,label:string)=>{
        const recipeSort = recipe.filter((obj:any)=>obj.m_cate==category);
   
        if (recipeSort.length) {
            const maxLike = recipeSort.reduce((max: number, obj: any) => {
                const like = parseFloat(obj.like);
                return like > max ? like : max;
            }, 0);
            const maxData = recipeSort.filter((obj: any) => obj.like == maxLike)
            setFameImg(maxData[0].m_thumb);
        }

        setSortCate(category);
        setClickedIndex(index);
        setCateName2(label);
    }

   useEffect(()=>{
    buttonClick('밥',0,'RICE');
   },[])
   


    return (
        
        <div className="home_btn">
            {buttons.map((obj, index) => (
                <button key={index} onClick={()=>buttonClick(obj.category,index,obj.label)} style={{ backgroundColor: clickedIndex === index ? '#FFC700' : 'white' }}>
                    <img src={obj.image} alt={obj.label} /> {obj.label}
                </button>
            ))}
        </div>
    );
}

export default Button;
