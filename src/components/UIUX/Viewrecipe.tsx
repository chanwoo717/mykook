import React from 'react';
import Link from 'next/link';
import FuncScrap from './FuncScrap';
import FuncLike from './FuncLike';
import { useRouter } from 'next/navigation';


function Viewrecipe({ myLike, data}:any) {


    const router: any = useRouter();
    const link = (name: any) => {
        let urlname = myLike.filter((obj: any) => name == obj.seq);
        let url: any = urlname[0].seq;
        router.push(`/home/${url}`);
    }

    
    if (myLike.length == 0) return <p className='noLike'>좋아요 레시피가 없습니다.</p>
    return (
        <>
        
            
             <div className="likeRecipeWid_box">
                <div className="likeRecipeWid">
                    {myLike.map((obj: any, k: number) => (
                        <div key={k}>
                            <div>
                                <figure>
                                    <div className='scrap_position'><img className='menu_img' src={obj.m_thumb} /><FuncScrap obj={obj}/></div>
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

export default Viewrecipe;