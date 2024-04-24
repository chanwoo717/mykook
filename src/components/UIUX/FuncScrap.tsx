//스크랩버튼 기능

import React, { useEffect, useState } from 'react';
import "@/components/style/scrap.scss";
import { useSession } from 'next-auth/react';
import { useStore2 } from '../recipe_store/bookmark_store';

function FuncScrap({ obj }: any) {

    const { data2, dataCrl2 } = useStore2()

    const { data: session, status }: any = useSession();
    let [b_click, setB_click] = useState(false);


    const bookmarkClick = (aa: any) => {

        if(status === 'unauthenticated') {
            alert('로그인이 필요한 서비스입니다.')
            return
        };

        let Dateid = Date.now()
        let bookmarkOne = obj;
        let aaa = data2.filter((obj:any)=> aa.seq==obj.seq)
        

        if (!b_click) {

            const bookmarkData = {
                "id": `${Dateid}`,
                "seq": `${bookmarkOne.seq}`,
                "name": `${bookmarkOne.name}`,
                "user_name": `${session.user.name}`,
                "user_email": `${session.user.email}`,
                "user_id": `${session.user.id}`,
                "m_thumb": `${bookmarkOne.m_thumb}`,
                "tip": `${bookmarkOne.tip}`,
                "like": bookmarkOne.like
            }

            dataCrl2('insert', '', bookmarkData)
        }else {
            dataCrl2('delete', aaa[0].id, '')
        }

        setB_click(!b_click)

    }

    // useEffect(()=>{
    //     if(session ){
    //         setB_click(true)
    //     }else{
    //         setB_click(false)
    //     }
    // },[session])

  
    useEffect(()=>{
        const checkBook = data2.filter(book=>(book.seq == obj.seq) && (book.user_id == session?.user.id))
        // if(session.user.email){
        // let aaaa = (checkBook[0].user_email == session.user.email)
        
        if(checkBook.length && session){
            setB_click(true)
        }else{
            setB_click(false)
        }
    // }
    },[obj])

    // let bbbb = data2.filter((obj:any)=>obj.seq == dataID.seq)

    return (

        <div className="scrap">
            <button onClick={() => { bookmarkClick(obj) }}>
                <img src={b_click ? "/images/bookmark_after.png" : "/images/bookmark_before.png"} alt='asd' />
            </button>
        </div>
    );
}

export default FuncScrap;