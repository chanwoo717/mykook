'use client';
import React, { useRef, useState } from 'react';
import { storage } from "@/lib/firebaseInit";
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import '../style/mypage.scss'
import Link from 'next/link';
import FuncLike from './FuncLike';
import FuncScrap from './FuncScrap';
import { useRouter } from 'next/navigation';

function MyrecipeReg({ myRecipe,session,dataCrl }: any) {


    const eldelrecipe = useRef<string | null>(null)


    //삭제 레시피, 댓글
    const [delRePop, setDelRePop]: any = useState(false);

    const firebase = {

        upload: async (file: any, idx: any, id: any) => {
            if (idx < 10) {
                idx = '0' + idx;
            }
            const fileName = `${idx}_${file.name}`;
            const storageRef = ref(storage, `/${session.user.id}/${id}/` + fileName);
            await uploadBytes(storageRef, file).then((snapshot) => {
            });

        },
        getImages: async (id: any) => {
            const res = await listAll(ref(storage, `/${session.user.id}/${id}`));

            let imgUrl = [];
            for (let i = 0; i < res.items.length; i++) {
                let a = await getDownloadURL(res.items[i]);
                imgUrl.push({ url: a, name: res.items[i].fullPath })
            }
            return imgUrl;
        },
        delImage: (id: any, urls: any) => {

            urls.forEach((url: any) => {
                if (url) {
                    const start = url.lastIndexOf('%2F') + 3; //url 뒤 부터 %2f부분의 인덱스값 
                    const end = url.lastIndexOf('?');
                    const str = url.substring(start, end);
                    deleteObject(ref(storage, `/${session.user.id}/${id}/${str}`))
                }
            })
            // const url = 'https://firebasestorage.googleapis.com/v0/b/kookkook-99003.appspot.com/o/jsg8733%40gmail.com%2F1709775110201%2Ftest_img1.jpg?alt=media&token=101ccc9a-e67b-45fc-b4ea-a8993bc22527'

        }
    }

    //삭제 버튼
    let delRecipe = () => {

        let vlfxj = myRecipe.filter((obj: any) => eldelrecipe.current == obj.seq)
        let selectRecipe = vlfxj[0].seq

        let aaaaa = []
        if (vlfxj[0].m_thumb !== "undefined") {
            aaaaa.push(vlfxj[0].m_thumb)
        }
        if (vlfxj[0].s_thumb !== "undefined") {
            aaaaa.push(vlfxj[0].s_thumb)
        }

        for (let i = 1; i < 4; i++) {
            if (vlfxj[0]['MANUAL_IMG0' + i] !== "undefined") {
                let aa = vlfxj[0]['MANUAL_IMG0' + i];
                aaaaa.push(aa)
            }
        }




        firebase.delImage(selectRecipe, aaaaa)
        // return;
        dataCrl('delete', selectRecipe, '')

        setDelRePop(false)

    }

    //레시피 삭제 취소 버튼
    let notdelRecipe = () => {
        setDelRePop(false)
    }

    const router: any = useRouter();
    const link = (name: any) => {
        let urlname = myRecipe.filter((obj: any) => name == obj.seq);
        let url: any = urlname[0].seq;
        router.push(`/home/${url}`);
    }


    // const file1 = (e) => {
    //     // 미리보기
    //     const fileReader = new FileReader();
    //     fileReader.readAsDataURL(e.target.files[0]);
    //     fileReader.onload = (e) => {
    //       setPreImage(e.target.result);
    //     }

    //     let t = new Date(e.target.files[0].lastModified)
    //     t.setSeconds(t.getSeconds() + 10)

    //     setTest(e.target.files[0])



    //     const megaApiUrl = ' '; // yourApiId를 발급받은 API 키로 대체
    //     const headers = {
    //       'Content-Type': 'application/json',
    //     };

    //     // 이미지를 MEGA에 업로드
    //     fetch(megaApiUrl, {
    //       method:'post',
    //       headers:{
    //         'Content-Type': 'application/json',
    //       },
    //       body:e.target.files[0]
    //     })
    //     .then(res=>res.text())
    //     .then(res=>{
    //     });




    //     //서버에 이\\322-t\프론트엔드\react\r-pwa\src\Camera.js미지 저장
    //     const formData = new FormData();
    //     formData.append('image', e.target.files[0]);

    //     /* fetch(basicUrl+'/camera/save',{
    //       method:'post',
    //       body:formData
    //     })
    //     .then(res=>res.json())
    //     .then(res=>{
    //       setData([...data,res.fileUrl])
    //     }) */
    //   }

    if (myRecipe.length == 0) return <p className='noMyrecipe'>등록한 레시피가 없습니다.</p>;

    return (


        // </div>
        <>
        <div className="myRecipeWid_box">
            {/* 레시피삭제 팝업창*/}
        <div className={`delete_pop ${delRePop ? 'active' : ''}`}>
            <p>선택한 레시피를 삭제할까요?</p><br />
            <button onClick={delRecipe}>삭제</button>
            <button onClick={notdelRecipe}>취소</button>
        </div>
            <div className="myRecipeWid">
                {myRecipe.map((obj: any, k: number) => (
                    <div key={k}>
                        <div>
                            <figure>
                                <div className='scrap_position'><img className='menu_img' src={obj.m_thumb} /><FuncScrap obj={obj} /></div>
                                <figcaption>
                                    <div className='flex'>
                                        <h2 onClick={() => { Link(obj.seq) }}>{obj.name}</h2>
                                    </div>
                                    <p>{obj.tip}</p>

                                    <FuncLike obj={obj} />
                                </figcaption>
                                <div className='recipeWidBtn'>
                                    <button onClick={() => { setDelRePop(true); eldelrecipe.current = obj.seq; }}>삭제</button>
                                    <Link href={{ pathname: '/mypageEdic/Edit', query: { seq2: obj.seq } }}><button>수정</button></Link>
                                </div>
                            </figure>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
        
        </>

    )
}


export default MyrecipeReg;