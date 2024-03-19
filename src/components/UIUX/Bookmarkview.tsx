"use client";
import React, { useEffect } from 'react';
import FuncScrap from './FuncScrap';
import FuncLike from './FuncLike';
import { useRouter } from 'next/navigation';



function Bookmarkview({ data2, dataCrl2 }: any) {
    const router: any = useRouter();
    const link = (name: any) => {
        let urlname = data2.filter((obj: any) => name == obj.seq);
        let url: any = urlname[0].seq;
        router.push(`/home/${url}`);
    }
    useEffect(() => {
        dataCrl2('all', '', '')
    }, [])

    if (data2.length == 0) return <p className='noBookmark'>북마크가 없습니다.</p>
    return (
        <>
            <div className="recipeWid_box1">
                <h1>Bookmark</h1>
                <div className="recipeWid1">
                    {data2.map((obj: any, k: number) => (
                        <div key={k}>
                            <div>
                                <figure>
                                    <div className='scrap_position'><img className='menu_img' src={obj.m_thumb} /><FuncScrap obj={obj} /></div>
                                    <figcaption>
                                        <div className='flex'>
                                            <h2 onClick={() => { link(obj.seq) }}>{obj.name}</h2>
                                        </div>

                                        <p>{obj.tip}</p>
                                        <FuncLike obj={obj} />
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </>
    );
}

export default Bookmarkview;