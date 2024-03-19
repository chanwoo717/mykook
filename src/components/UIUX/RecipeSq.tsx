//레시피 정사각형 모양
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import "../style/recipe_sq.scss";
import FuncLike from './FuncLike';
import FuncScrap from './FuncScrap';


function RecipeSq({ dataID, dataCrl }: any) {
    const router: any = useRouter();
    const [list,setList] = useState<any>([]);
    const link = (name: any) => {
        let ID = dataID.filter((obj: any) => name == obj.name);
        let url: any = ID[0].seq;
        router.push(`/home/${url}`);
    }

    useEffect(()=>{
        if(window.location.pathname === '/search'){
            let currentIndex = dataID.length;
            let temporaryValue, randomIndex;
            let randomData = [...dataID];
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = randomData[currentIndex];
                randomData[currentIndex] = randomData[randomIndex];
                randomData[randomIndex] = temporaryValue;
            };
            setList(randomData.slice(0,10));
        }else{
            setList(dataID);
        }
    },[])

    return (
        <div className="recipeSq">
            {list.map((obj: any, k: number) => (
                <div key={k} className='sq_contents' >
                    <div><img id='sq_img' src={obj.m_thumb}  /><FuncScrap obj={obj}/> </div>
                    <p onClick={() => { link(obj.name) }}>{obj.name}</p>
                    <FuncLike obj={obj}/>
                    
                </div>
            ))}
        </div>

    );
}

export default RecipeSq;