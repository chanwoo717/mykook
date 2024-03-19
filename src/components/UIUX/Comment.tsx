import React from 'react';
import "@/components/style/comment.scss";
import Link from 'next/link';
import FuncLike from './FuncLike';
import FuncScrap from './FuncScrap';
import { useRouter } from 'next/navigation';

function Comment({ myComment }: any) {


    const router: any = useRouter();
    const link = (name: any) => {
        let urlname = myComment.filter((obj: any) => name == obj.seq);
        let url: any = urlname[0].seq;
        router.push(`/home/${url}`);
    }
    if (myComment.length == 0) return <p className='noComment'>등록한 댓글이 없습니다.</p>
    return (
        <>

            <div className="recipeCommentWid_box">
                <div className="recipeCommentWid">
                    {myComment.map((obj: any, k: number) => (
                        <div key={k}>
                            <div>
                                <figure>
                                    <div className='scrap_position'><img className='menu_img' src={obj.m_thumb} /><FuncScrap obj={obj} /></div>
                                    <figcaption>
                                        <div className='flex'>
                                            <h2 onClick={() => { link(obj.seq) }}>{obj.name}</h2>
                                        </div>

                                        <p>{obj.comment}</p>
                                        <p>{obj.date}</p>
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

export default Comment;