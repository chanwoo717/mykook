"use client";
import React, { useEffect, useRef, useState } from 'react';
import "@/components/style/home_detail.scss";
import axios from 'axios';
import Link from 'next/link';

function Home_detail({ dataID, detailUrl, dataCrl4, data4, session }: any) {
    let detailData = dataID.filter((obj: any) => obj.seq == detailUrl)
    let menual = []


    for (let i = 1; i < 21; i++) {
        let menualData = detailData[0]['MANUAL0' + i];
        let menualImgData = detailData[0]['MANUAL_IMG0' + i];
        if (menualData != (undefined) && menualImgData != (undefined)) {
            if (menualData != ("") && menualImgData != ("")) {
                menual.push({ menual: menualData, menualImg: menualImgData });
            }
        }
    }
    let [book, setBook] = useState(false);
    let [heart, setHeart] = useState(false);
    const [delComPop, setDelComPop]: any = useState(false);
    const elform2 = useRef<HTMLFormElement | null>(null)
    const eldelcomment = useRef<string | null>(null)

    const bookmarkClick = () => {
        setBook(!book)
    }
    const heartClick = () => {
        setHeart(!heart)
    }

    let myComment = data4.filter((obj:any)=> obj.seq == detailUrl)

        let [youtubeID,setYoutubeID] = useState();
        useEffect(() => {
        axios.get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${detailData[0].name} 레시피&type=video&key=AIzaSyDZvlRumaderGDF9TIAR4qsgswiV1FLFTw`
        )
        .then((res) => {
            setYoutubeID(res.data.items[0].id.videoId);
        //   setPlaylist(res.data.items);
        })
        .catch(() => {});
    }, []);
    const youtubeSrc = `https://www.youtube.com/embed/${youtubeID}`

    let addComment = (e: any) => {
        e.preventDefault()
        if (elform2.current) {

            let formData = new FormData(elform2.current)
            let today = new Date();

            let year = today.getFullYear(); // 년도
            let month = today.getMonth() + 1;  // 월
            let date = today.getDate();  // 날짜
            if(!session){
                alert('로그인이 필요합니다.');
                return;
            }

            const c = {
                'id': `${Date.now()}`,
                'seq': `${detailUrl}`, //상세페이지 들어온 데이터값의 seq 
                'name':`${detailData[0].name}`,
                'date': `${year}년 ${month}월 ${date}일`,
                'comment': `${formData.get("comment")}`,
                'user_id': `${session.user.id}`,
                'user_email': `${session.user.email}`,
                'user_name': `${session.user.name}`,
                'user_image': `${session.user.image}`,
                'm_thumb': `${detailData[0].m_thumb}`,
                'tip': `${detailData[0].tip}`,
                'like': `${detailData[0].like}`
            }
            if (formData.get("comment") !== '') {
                dataCrl4('insert', '', c)
                // formData.get("comment") == '' 
                // 입력창 초기화해

            } else {
                alert('댓글을 입력해주세요')
            }
        }
    }

    // 댓글 삭제 버튼
    let delComment = () => {
        let vlfxj = data4.filter((obj: any) => eldelcomment.current == obj.id)
        let selectRecipe = vlfxj[0].id
        dataCrl4('delete', selectRecipe, '')
        setDelComPop(false)
    }

    //댓글 삭제 취소 버튼
    let notdelComment = () => {
        setDelComPop(false)
    }
    if(!session) {
        
    }


    return (
        <>
            <header className='home_detail_header'>
                <Link href='/home'><img id='arrow' src="/images/Arrow.png" alt="dd" /></Link>
                <div className='func'>
                    <img onClick={heartClick} src={heart ? "/images/heart_red.png" : "/images/heart_black.png"} alt="" />
                    <img onClick={bookmarkClick} src={book ? "/images/bookmark_after.png" : "/images/bookmark_before.png"} />
                </div>
            </header>
            <div className='detail_contents'>
                <h2>{detailData[0].name}</h2>
                <p><img src={detailData[0].m_thumb} alt="" /></p>
                <h2>재료</h2>
                <div className='detail_ingredient'>
                    <p>{detailData[0].ingredient}</p>
                </div>
                <h2>조리순서</h2>

                {
                    menual.map((obj: any, k: number) => (
                        <div key={k} className='detail_menual'>
                            <p>{obj.menual}</p>
                            <p><img src={obj.menualImg} alt="" /></p>
                        </div>
                    ))
                }

                <div className="youtube-ly">
                    <iframe className='youtube_api'
                    id="ytplayer"
                    src= {youtubeSrc}
                    >
                </iframe>
                </div>


                <h2>댓글</h2>
                <div className={`delete_pop2 ${delComPop ? 'active' : ''}`}>
                    <p>작성한 댓글를 삭제할까요?</p><br />
                    <button onClick={delComment}>삭제</button>
                    <button onClick={notdelComment}>취소</button>

                </div>
                {
                    myComment.map((obj: any, k: any) => (

                        <div key={k} className='detail_comment'>
                            <div className='comment_box'>
                                <div>
                                    <p><img src={`${obj.user_image}`} alt="" /></p>
                                    <div>
                                        <p>{obj.user_name}  /  {obj.comment}</p>
                                        <p>{obj.date}</p>
                                    </div>
                                </div>
                                <p onClick={() => { setDelComPop(true); eldelcomment.current = obj.id; }}>삭제</p>
                            </div>


                        </div>
                    ))
                }
                <form ref={elform2} onSubmit={addComment}>
                    <input type="text" placeholder='댓글을 입력하세요' name='comment' />
                    <input type="submit" value="등록" />
                </form>

                
            </div>
        </>
    );
}

export default Home_detail;


// https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=%ED%8E%98%EC%9D%B4%EC%BB%A4&type=video&key=AIzaSyD8Kj9MiGCaOF-6YkWkkLZmBhXxGGZSK2g
//q=검색할단어
// 저 주소안에 items안에 id안에 videoId값을 src에 embed/이부분에 넣으면됨

//AIzaSyD8Kj9MiGCaOF-6YkWkkLZmBhXxGGZSK2g (우민key값)
//AIzaSyAkF29AFuFTLUb7d4EnMRer61_Jw_M7zfw (승관key값)
