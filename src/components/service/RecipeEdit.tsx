//레시피 등록
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { storage } from "@/lib/firebaseInit";
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import "@/components/style/recipe_reg.scss";
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function RecipeEdit({ data, dataCrl, session}:any) {

    const {seq2} = Object.fromEntries(useSearchParams());
    const router = useRouter();



    const elform = useRef<HTMLFormElement | null>(null)
    const elform1 = useRef<HTMLFormElement | null>(null)


    //수정 레시피
    const [putdata, setPutdata]: any = useState([])
    const [putseq, setPutseq]: any = useState()
    const [preImg, setPreImage]: any = useState([])
    

    //나의 레시피 분류
    let myRecipe = data.filter((obj:any) => obj?.user_id == session.user.id)

    const firebase = {

        upload: async (file: any, idx: any, id: any) => {

            if (idx < 10) {
                idx = '0' + idx;
            }

            const fileName = `${idx}_${file.name}`;
            const storageRef = ref(storage, `/${session.user.email}/${id}/` + fileName);
            await uploadBytes(storageRef, file).then((snapshot) => {

            });

        },
        getImages: async (id: any) => {
            const res = await listAll(ref(storage, `/${session.user.email}/${id}`));

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
                    deleteObject(ref(storage, `/${session.user.email}/${id}/${str}`))
                }
            })
            // const url = 'https://firebasestorage.googleapis.com/v0/b/kookkook-99003.appspot.com/o/jsg8733%40gmail.com%2F1709775110201%2Ftest_img1.jpg?alt=media&token=101ccc9a-e67b-45fc-b4ea-a8993bc22527'

        }
    }

    // 미리보기
    const viewfile = (e: any,idx:any) => {

            const fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0]);

            fileReader.onload = (e:any) => {
                
                let a = [...preImg];
                a[idx] =  e.target.result;
                setPreImage(a);
            }
    }

    let putRePopup = async (e: any) => {
        let vlfxj2 = myRecipe.filter((obj: any) => e == obj.seq)
        let selectRecipenum = vlfxj2[0].seq

        //수정하기전이미지 출력
        // let imgs2 = await firebase.getImages(selectRecipenum)

        
        // const fileTemplate2 = [
        //     'm_thumb', 's_thumb', 'MANUAL_IMG01', 'MANUAL_IMG02', 'MANUAL_IMG03', 'MANUAL_IMG04', 'MANUAL_IMG05', 'MANUAL_IMG06', 'MANUAL_IMG07', 'MANUAL_IMG08', 'MANUAL_IMG09', 'MANUAL_IMG10', 'MANUAL_IMG11', 'MANUAL_IMG12'
        // ]

        // const inputImage2: any = Array(14);

        // fileTemplate2.forEach((obj, k) => {
        //     const str2 = imgs2[k]?.url.split('?')[0];
        //     const start2 = str2?.lastIndexOf('%2F') + 3;
        //     const imgName2 = str2?.substring(start2);
        //     const end2 = imgName2?.indexOf('_');
        //     const num2 = Number(imgName2?.substring(0, end2));

        //     if (num2 || num2 == 0) {
        //         inputImage2[num2] = { [fileTemplate2[num2]]: imgs2[k]?.url };
        //     }

        // })

        // return;
        const selectData = {
            'seq': `${vlfxj2[0].seq}`,
            'name': `${vlfxj2[0].name}`,
            'm_cate': `${vlfxj2[0].m_cate}`,
            's_cata': `${vlfxj2[0].s_cata}`,
            'ingredient': `${vlfxj2[0].ingredient}`,
            'tip': `${vlfxj2[0].tip}`,
            'MANUAL01': `${vlfxj2[0].MANUAL01}`,
            'MANUAL02': `${vlfxj2[0].MANUAL02}`,
            'MANUAL03': `${vlfxj2[0].MANUAL03}`,
            'MANUAL04': `${vlfxj2[0].MANUAL04}`,
            'MANUAL05': `${vlfxj2[0].MANUAL05}`,
            'MANUAL06': `${vlfxj2[0].MANUAL06}`,
            'MANUAL07': `${vlfxj2[0].MANUAL07}`,
            'MANUAL08': `${vlfxj2[0].MANUAL08}`,
            'MANUAL09': `${vlfxj2[0].MANUAL09}`,
            'MANUAL10': `${vlfxj2[0].MANUAL10}`,
            'MANUAL11': `${vlfxj2[0].MANUAL11}`,
            'MANUAL12': `${vlfxj2[0].MANUAL12}`,
            'MANUAL_IMG01': `${vlfxj2[0].MANUAL_IMG01}`,
            // 'MANUAL_IMG02': `${String(inputImage2[3]?.MANUAL_IMG02)}`,
            // 'MANUAL_IMG03': `${String(inputImage2[4]?.MANUAL_IMG03)}`,
            // 'MANUAL_IMG04': `${String(inputImage2[5]?.MANUAL_IMG04)}`,
            // 'MANUAL_IMG05': `${String(inputImage2[6]?.MANUAL_IMG05)}`,
            // 'MANUAL_IMG06': `${String(inputImage2[7]?.MANUAL_IMG06)}`,
            // 'MANUAL_IMG07': `${String(inputImage2[8]?.MANUAL_IMG07)}`,
            // 'MANUAL_IMG08': `${String(inputImage2[9]?.MANUAL_IMG08)}`,
            // 'MANUAL_IMG09': `${String(inputImage2[10]?.MANUAL_IMG9)}`,
            // 'MANUAL_IMG10': `${String(inputImage2[11]?.MANUAL_IMG10)}`,
            // 'MANUAL_IMG11': `${String(inputImage2[12]?.MANUAL_IMG11)}`,
            // 'MANUAL_IMG12': `${String(inputImage2[13]?.MANUAL_IMG12)}`,
            'HASH_TAG': `${vlfxj2[0].HASH_TAG}`,
            'm_thumb': `${vlfxj2[0].m_thumb}`,
            // 's_thumb': `${String(inputImage2[1]?.s_thumb)}`,
            'like': `${vlfxj2[0].like}`,
            'user': `${vlfxj2[0].user}`,
            'open': `${vlfxj2[0].open}`

        }
        setPutdata(selectData)
        setPutseq(selectRecipenum)
        

    }
    let putRecipe = (e: any) => {

        e.preventDefault()
        if (elform1.current) {

            let formData = new FormData(elform1.current);
            const d = {
                'seq': `${putseq}`,
                'name': `${formData.get("M_name")}`,
                'm_cate': `${formData.get("kategori")}`,
                's_cata': `${formData.get("whfl")}`,
                'ingredient': `${formData.get("재료")}`,
                'tip': `${formData.get("tip")}`,
                'MANUAL01': `${formData.get("조리1")}`,
                'MANUAL02': `${formData.get("조리2")}`,
                'MANUAL03': `${formData.get("조리3")}`,
                'MANUAL04': '',
                'MANUAL05': '',
                'MANUAL06': '',
                'MANUAL07': '',
                'MANUAL08': '',
                'MANUAL09': '',
                'MANUAL10': '',
                'MANUAL11': '',
                'MANUAL12': '',
                // 'MANUAL_IMG01': `${String(inputImage2[2]?.MANUAL_IMG01)}`,
                // 'MANUAL_IMG02': `${String(inputImage2[3]?.MANUAL_IMG02)}`,
                // 'MANUAL_IMG03': `${String(inputImage2[4]?.MANUAL_IMG03)}`,
                // 'MANUAL_IMG04': `${String(inputImage2[5]?.MANUAL_IMG04)}`,
                // 'MANUAL_IMG05': `${String(inputImage2[6]?.MANUAL_IMG05)}`,
                // 'MANUAL_IMG06': `${String(inputImage2[7]?.MANUAL_IMG06)}`,
                // 'MANUAL_IMG07': `${String(inputImage2[8]?.MANUAL_IMG07)}`,
                // 'MANUAL_IMG08': `${String(inputImage2[9]?.MANUAL_IMG08)}`,
                // 'MANUAL_IMG09': `${String(inputImage2[10]?.MANUAL_IMG9)}`,
                // 'MANUAL_IMG10': `${String(inputImage2[11]?.MANUAL_IMG10)}`,
                // 'MANUAL_IMG11': `${String(inputImage2[12]?.MANUAL_IMG11)}`,
                // 'MANUAL_IMG12': `${String(inputImage2[13]?.MANUAL_IMG12)}`,
                'HASH_TAG': `${formData.get("tag")}`,
                // 'm_thumb': `${String(inputImage2[0]?.m_thumb)}`,
                // 's_thumb': `${String(inputImage2[1]?.s_thumb)}`,
                'like': 0,
                'user_id': `${session.user.id}`,
                'user_name': `${session.user.name}`,
                'user_email': `${session.user.email}`,
                'open': `${formData.get("open")}`

            }
            // return;
            dataCrl('put', putseq, d)
            router.push('/mypage')
            

        }
    }



    useEffect(()=>{
        putRePopup(seq2)


    },[seq2])


    return (
        <div className='reg'>
            {/* 수정하기 폼 */}
            <form encType='multipart/form-data' ref={elform1} onSubmit={putRecipe}>
                <article>
                    <h3>메뉴 이름</h3>
                    <input type="text" name='M_name' value={putdata.name} onChange={(e) => { setPutdata(e.target.value) }} />
                </article>

                <article >
                    <h3>메인 이미지</h3>
                    <div className='m_img'>
                
                        <img src={putdata.m_thumb}/>
                        <p>메뉴 대표 사진을 등록해 주세요.</p>
                        <label htmlFor="file">
                            <div className="btn-upload">파일 선택</div>
                        </label>
                        <input type="file" name='M_img' id="file" onChange={(e)=>{viewfile(e,0)}} />
                    </div>
                </article>

                <article >
                    <h3>서브 이미지</h3>
                    <div className='m_img'>
                        <img src={putdata.s_thumb} />
                        <p>메뉴 썸네일 사진을 등록해 주세요.</p>
                        <label htmlFor="file">
                            <div className="btn-upload">파일 선택</div>
                        </label>
                        <input type="file" name='M_img' id="file" onChange={(e)=>{viewfile(e,1)}} />
                    </div>
                </article>

                <article>
                    <h3>메뉴 소개</h3>
                    <input type="text" name='tip' value={putdata.tip} onChange={(e) => { setPutdata(e.target.value) }} />
                </article>

                <article className='ketegori'>
                    <h3>종류 선택</h3>
                    <ul>
                        <li>
                            <label>카테고리</label>
                            <select name="kategori" value={putdata.m_cate} onChange={(e) => { setPutdata(e.target.value) }} >
                                <option value="반찬">반찬</option>
                                <option value="국&찌개">국&찌개</option>
                                <option value="후식">후식</option>
                                <option value="일품">일품</option>
                                <option value="밥">밥</option>
                                <option value="기타">기타</option>
                            </select>
                        </li>

                        <li>
                            <label>조리방식</label>
                            <select name="whfl" value={putdata.s_cate} onChange={(e) => { setPutdata(e.target.value) }}>
                                <option value="굽기">굽기</option>
                                <option value="찌기">찌기</option>
                                <option value="끓이기">끓이기</option>
                                <option value="볶기">볶기</option>
                                <option value="튀기기">튀기기</option>
                                <option value="기타">기타</option>
                            </select>
                        </li>
                    </ul>



                </article>

                <article>
                    <h3>재료</h3>
                    <textarea name="재료" id="" value={putdata.ingredient} onChange={(e) => { setPutdata(e.target.value) }}></textarea><br />
                </article>

                <article>
                    <h3>조리 순서</h3>
                    <ol>
                        <li className='cooking'>
                            1. <input type="text" name='조리1' value={putdata.MANUAL01} onChange={(e) => { setPutdata(e.target.value) }} />
                            <div className='cooking_img'>
                                <img src={putdata.MANUAL_IMG01} />
                                <label htmlFor="file">
                                    <div className="btn-upload">파일 선택</div>
                                </label>
                                <input type="file" name='M_img' id="file" onChange={(e)=>{viewfile(e,2)}} />
                            </div>

                        </li>
                        <li className='cooking'>
                            2. <input type="text" name='조리2' value={putdata.MANUAL02} onChange={(e) => { setPutdata(e.target.value) }} />
                            <div className='cooking_img'>
                                <img src={putdata.MANUAL_IMG02} />
                                <label htmlFor="file">
                                    <div className="btn-upload">파일 선택</div>
                                </label>
                                <input type="file" name='M_img' id="file" onChange={(e)=>{viewfile(e,3)}} />
                            </div>
                        </li>
                        <li className='cooking'>
                            3. <input type="text" name='조리3' value={putdata.MANUAL03} onChange={(e) => { setPutdata(e.target.value) }} />
                            <div className='cooking_img'>
                                <img src={putdata.MANUAL_IMG03} />
                                <label htmlFor="file">
                                    <div className="btn-upload">파일 선택</div>
                                </label>
                                <input type="file" name='M_img' id="file" onChange={(e)=>{viewfile(e,4)}}/>
                            </div>
                        </li>
                    </ol>

                    <div className='add_btn'>
                        {/* 미구현 */}
                        <button>+추가</button>
                    </div>
                </article>


                <article>
                    {/* 미구현 */}
                    <h3>완성 사진</h3>
                    <ul className='complete_img'>
                        <li >
                            <img src="/images/add_photo.png" />
                            <label htmlFor="file">
                                <div className="btn-upload">파일 선택</div>
                            </label>
                            <input type="file" name='M_img' id="file" />
                        </li>
                        <li>
                            <img src="/images/add_photo.png" />
                            <label htmlFor="file">
                                <div className="btn-upload">파일 선택</div>
                            </label>
                            <input type="file" name='M_img' id="file" />
                        </li>
                        <li>
                            <img src="/images/add_photo.png" />
                            <label htmlFor="file">
                                <div className="btn-upload">파일 선택</div>
                            </label>
                            <input type="file" name='M_img' id="file" />
                        </li>
                        <li>
                            <img src="/images/add_photo.png" />
                            <label htmlFor="file">
                                <div className="btn-upload">파일 선택</div>
                            </label>
                            <input type="file" name='M_img' id="file" />
                        </li>
                    </ul>

                </article>

                <article>
                    <h3>태그</h3>
                    <input type="text" name='tag' value={putdata.HASH_TAG} onChange={(e) => { setPutdata(e.target.value) }} /><br />
                </article>


                <article className='open_btn'>
                    <select name="open" value={putdata.open} onChange={(e) => { setPutdata(e.target.value) }}>
                        <option value="공개">공개</option>
                        <option value="비공개">비공개</option>
                    </select>
                    <input type="submit" value='수정하기' />
                    
                </article>
            </form>

            {/* 레시피삭제 팝업창
            <div className='delete_pop'>
                <p>선택한 레시피를 삭제할까요?</p><br />
                <button>삭제</button>
                <button>취소</button>
            </div>
            <br />
            댓글삭제 팝업창
            <div className='delete_pop2'>
                <p>작성한 댓글을 삭제할까요?</p><br />
                <button>삭제</button>
                <button>취소</button>
            </div> */}
        </div>

    );
}

export default RecipeEdit;