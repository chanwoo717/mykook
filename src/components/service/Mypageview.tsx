import React, { useEffect } from 'react';
import Comment from '../UIUX/Comment';
import Viewrecipe from '../UIUX/Viewrecipe';
import { useStore } from '../recipe_store/all_store';
import { useStore2 } from '../recipe_store/bookmark_store';
import { useStore4 } from '../recipe_store/comment_store';
import { useStore5 } from '../recipe_store/like_store'; 
import MyrecipeReg from '../UIUX/MyrecipeReg';
import Loading from '@/app/loading';

function Mypageview({ idx, session, dataCrl}: any) {

    let {data} = useStore();
    let {data4, dataCrl4} = useStore4();
    let {data5, dataCrl5} = useStore5();

    let myRecipe = data.filter((obj:any) => obj?.user_id == session.user.id)
    let myComment = data4.filter((obj:any) => obj?.user_id == session.user.id)
    let myLike = data5.filter((obj:any) => obj?.user_id == session.user.id)
    

    useEffect(()=>{
        dataCrl('all', '', '')
    },[data])
    useEffect(()=>{
        dataCrl4('all', '', '')
    },[data4])
    useEffect(()=>{
        dataCrl5('all', '', '')
    },[data5])


    if (!data) return <Loading/>

    let comp;
    switch (idx) {
        case "내 레시피":
            comp = <MyrecipeReg session={session} myRecipe={myRecipe} dataCrl={dataCrl} />
            break;

        case "내 댓글":
            comp = <Comment data4={data4} session={session} myComment={myComment} />
            break;

        case "내가 본 레시피":
            comp = <Viewrecipe myLike={myLike} data={data}/>
            break;


        default:
            break;
    }

    return (
        <div>
            {comp}

        </div>
    );
}

export default Mypageview;