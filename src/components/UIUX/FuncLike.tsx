//좋아요버튼 기능
import React, { useEffect, useState } from 'react';
import "@/components/style/like.scss";
import { useStore } from '../recipe_store/all_store';
import { useSession } from 'next-auth/react';
import { useStore5 } from '../recipe_store/like_store';

function FuncLike({ obj }: any) {

    let num = Math.floor(obj.like)

    const { data5, dataCrl5 } = useStore5()

    const { data: session, status }: any = useSession();

    const [isLike, setIsLike] = useState(false);
    const [pluslike, setPluslike] = useState(num);
    const { dataCrl, data } = useStore()

    const changeLike = (aa:any) => {

        let Dateid = Date.now()
        let likeOne = obj;
        let aaa = data5.filter((obj:any)=> aa.seq==obj.seq)



        
        if (!isLike) {
            const bookmarkData = {
                "id": `${Dateid}`,
                "seq": `${likeOne.seq}`,
                "name": `${likeOne.name}`,
                "user_name": `${session.user.name}`,
                "user_email": `${session.user.email}`,
                "user_id": `${session.user.id}`,
                "m_thumb": `${likeOne.m_thumb}`,
                "tip": `${likeOne.tip}`,
                "like": likeOne.like+1
            }

 
            let putupLike = {
                "like": Number(likeOne.like) +1
            }

            dataCrl5("insert",'', bookmarkData)
            dataCrl5("put",likeOne.seq, putupLike)
            dataCrl("put",likeOne.seq, putupLike)
        } else {

            let putdownLike = {
                "like": Number(likeOne.like) - 1
            }
            dataCrl5("delete", likeOne.seq, '')
            dataCrl5("put", likeOne.seq, putdownLike)
            dataCrl("put", likeOne.seq, putdownLike)
            
        }

        setIsLike(!isLike);
    }

    useEffect(() => {
        let like: any = Math.floor(obj.like);
        const checkBook = data5.filter(like=>(like.seq == obj.seq) && (like.user_id == session?.user.id))
        // if(session.user.email){
        // let aaaa = (checkBook[0].user_email == session.user.email)
        
        if(checkBook.length && session){
            setIsLike(true)
        }else{
            setIsLike(false)
        }
        setPluslike(like);
    }, [obj])

    // useEffect(() => {
    //     isLike ? setPluslike(pluslike + 1) : setPluslike(pluslike - 1);
    // }, [isLike])


    return (
        <span className="like">
            <button onClick={()=>{changeLike(obj)}}>
                <img src={isLike ? "/images/heart_red.png" : "/images/heart_black.png"} alt="heart" />
                {pluslike >= 99 ? '+' + 99 : pluslike}
            </button>
        </span>
    );
}

export default FuncLike;