//레시피 등록
"use client";
import React, { useRef, useState } from 'react';
import { storage } from "@/lib/firebaseInit";
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import "@/components/style/recipe_reg.scss";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useStore } from '../recipe_store/all_store';

function RecipeReg({}:any) {

   
    const { data: session, status }: any = useSession();
    const {data, dataCrl} = useStore()
    
    const router = useRouter();
    

    const elform = useRef<HTMLFormElement | null>(null)



    //수정 레시피
    const [preImg, setPreImage]: any = useState([])
    
    

    //삭제 레시피, 댓글
    const [delRePop, setDelRePop]: any = useState(false);
    const [delComPop, setDelComPop]: any = useState(false);

    //나의 레시피 분류
    // let myRecipe = data.filter((obj:any) => obj?.user_id == session.user.id)

    const firebase = {

        upload: async (file: any, idx: any, id2: any) => {
            console.log('asdsadsa =', file, idx, id2  )
            if (idx < 10) {
                idx = '0' + idx;
            }
            const fileName = `${idx}_${file.name}`;
            const storageRef = ref(storage, `/${session.user.id}/${id2}/` + fileName);
            await uploadBytes(storageRef, file).then((snapshot) => {
            });

        },
        getImages: async (id2: any) => {
            const res = await listAll(ref(storage, `/${session.user.id}/${id2}`));

            let imgUrl = [];
            for (let i = 0; i < res.items.length; i++) {
                let a = await getDownloadURL(res.items[i]);
                imgUrl.push({ url: a, name: res.items[i].fullPath })
            }
            return imgUrl;
        },
        delImage: (id2: any, urls: any) => {

            urls.forEach((url: any) => {
                if (url) {
                    const start = url.lastIndexOf('%2F') + 3; //url 뒤 부터 %2f부분의 인덱스값 
                    const end = url.lastIndexOf('?');
                    const str = url.substring(start, end);
                    deleteObject(ref(storage, `/${session.user.id}/${id2}/${str}`))
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


    //레시피 추가 (빈칸일떄 제한걸기 )
    let addRecipe = async (e: any) => {


        e.preventDefault()


        // return;

        if (elform.current) {

            let formData = new FormData(elform.current);
            const files: any = formData.getAll('M_img');

            let id = Date.now()
            let fileName: any = []
            for (let idx in files) {
                if (files[idx]?.name) {
                    await firebase.upload(files[idx], idx, id);
                }
            };
            const newimgUrl = await firebase.getImages(id)

            const fileTemplate = [
                'm_thumb', 's_thumb', 'MANUAL_IMG01', 'MANUAL_IMG02', 'MANUAL_IMG03', 'MANUAL_IMG04', 'MANUAL_IMG05', 'MANUAL_IMG06', 'MANUAL_IMG07', 'MANUAL_IMG08', 'MANUAL_IMG09', 'MANUAL_IMG10', 'MANUAL_IMG11', 'MANUAL_IMG12'
            ]

            const inputImage: any = Array(14);

            fileTemplate.forEach((obj, k) => {
                const str = newimgUrl[k]?.url.split('?')[0];
                const start = str?.lastIndexOf('%2F') + 3;
                const imgName = str?.substring(start);
                const end = imgName?.indexOf('_');
                const num = Number(imgName?.substring(0, end));

                if (num || num == 0) {
                    inputImage[num] = { [fileTemplate[num]]: newimgUrl[k]?.url };
                }

            })

            




            const a = {
                'seq': `${id}`,
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
                'MANUAL_IMG01': `${String(inputImage[2]?.MANUAL_IMG01)}`,
                'MANUAL_IMG02': `${String(inputImage[3]?.MANUAL_IMG02)}`,
                'MANUAL_IMG03': `${String(inputImage[4]?.MANUAL_IMG03)}`,
                'MANUAL_IMG04': `${String(inputImage[5]?.MANUAL_IMG04)}`,
                'MANUAL_IMG05': `${String(inputImage[6]?.MANUAL_IMG05)}`,
                'MANUAL_IMG06': `${String(inputImage[7]?.MANUAL_IMG06)}`,
                'MANUAL_IMG07': `${String(inputImage[8]?.MANUAL_IMG07)}`,
                'MANUAL_IMG08': `${String(inputImage[9]?.MANUAL_IMG08)}`,
                'MANUAL_IMG09': `${String(inputImage[10]?.MANUAL_IMG09)}`,
                'MANUAL_IMG10': `${String(inputImage[11]?.MANUAL_IMG10)}`,
                'MANUAL_IMG11': `${String(inputImage[12]?.MANUAL_IMG11)}`,
                'MANUAL_IMG12': `${String(inputImage[13]?.MANUAL_IMG12)}`,
                'HASH_TAG': `${formData.get("tag")}`,
                'm_thumb': `${String(inputImage[0]?.m_thumb)}`,
                's_thumb': `${String(inputImage[1]?.s_thumb)}`,
                'like': 0,
                'user_id': `${session.user.id}`,
                'user_name': `${session.user.name}`,
                'user_email': `${session.user.email}`,

            }

            if(formData.get("M_name")== ""){
                alert("메뉴이름을 적어줘")
                
            }else if(formData.get("kategori") == ""){
                alert("카테고리를 선택해줘")
            }else if(formData.get("whfl")== ""){
                alert("조리방식을 적어줘")
            }else if(formData.get("재료")== ""){
                alert("재료를 적어줘")
            }else if(formData.get("tip")== ""){
                alert("요리설명을 적어줘")
            }else if(formData.get("조리1")== ""){
                alert("요리설명을 적어줘")
            }else {
                dataCrl('insert', '', a)
            router.push('/mypage')
            }
            




        }
    }

    return (
        <div className='reg'>
            {/* 추가하기 폼 */}
            <form encType='multipart/form-data' ref={elform} onSubmit={addRecipe}>
                <article>
                    <h3>메뉴 이름</h3>
                    <input type="text" name='M_name' placeholder='예)소고기 미역국' />
                </article>

                <article >
                    <h3>메인 이미지</h3>
                    <div className='m_img'> 
                
                        <img src={preImg[0]}/>
                        <p>메뉴 대표 사진을 등록해 주세요.</p>
                        <label htmlFor="file0">
                            <div className="btn-upload">파일 선택</div>
                        </label>
                        <input type="file" name='M_img' id="file0" onChange={(e)=>{viewfile(e,0)}} />
                    </div>
                </article>

                <article >
                    <h3>서브 이미지</h3>
                    <div className='m_img'>
                        <img src={preImg[1]} />
                        <p>메뉴 썸네일 사진을 등록해 주세요.</p>
                        <label htmlFor="file1">
                            <div className="btn-upload">파일 선택</div>
                        </label>
                        <input type="file" name='M_img' id="file1" onChange={(e)=>{viewfile(e,1)}} />
                    </div>
                </article>

                <article>
                    <h3>메뉴 소개</h3>
                    <input type="text" name='tip' placeholder='메뉴를 간단하게 소개해주세요.' />
                </article>

                <article className='ketegori'>
                    <h3>종류 선택</h3>
                    <ul>
                        <li>
                            <label>카테고리</label>
                            <select name="kategori" >
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
                            <select name="whfl">
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
                    <textarea name="재료" id="" placeholder='예) 불린미역 3컵, 소고기 200g , 소금 약간, 멸치액젓 2스푼, 간장 4스푼, 다진마늘 1스푼, 청주 1스푼'></textarea><br />
                </article>

                <article>
                    <h3>조리 순서</h3>
                    <ol>
                        <li className='cooking'>
                            1. <input type="text" name='조리1' placeholder='예) 소고기는 기름기를 떼어내고 적당한 크기로 잘라주세요.' />
                            <div className='cooking_img'>
                                <img src={preImg[2]} />
                                <label htmlFor="file2">
                                    <div className="btn-upload">파일 선택</div>
                                </label>
                                <input type="file" name='M_img' id="file2" onChange={(e)=>{viewfile(e,2)}} />
                            </div>

                        </li>
                        <li className='cooking'>
                            2. <input type="text" name='조리2' placeholder='예) 준비된 양념으로 먼저 고기를 조물조물 재워 둡니다.' />
                            <div className='cooking_img'>
                                <img src={preImg[3]} />
                                <label htmlFor="file3">
                                    <div className="btn-upload">파일 선택</div>
                                </label>
                                <input type="file" name='M_img' id="file3" onChange={(e)=>{viewfile(e,3)}} />
                            </div>
                        </li>
                        <li className='cooking'>
                            3. <input type="text" name='조리3' placeholder='예) 그 사이 양파와 버섯, 대파도 썰어서 준비하세요.' />
                            <div className='cooking_img'>
                                <img src={preImg[4]} />
                                <label htmlFor="file4">
                                    <div className="btn-upload">파일 선택</div>
                                </label>
                                <input type="file" name='M_img' id="file4" onChange={(e)=>{viewfile(e,4)}}/>
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
                            <label htmlFor="file5">
                                <div className="btn-upload">파일 선택</div>
                            </label>
                            <input type="file5" name='M_img' id="file" />
                        </li>
                        <li>
                            <img src="/images/add_photo.png" />
                            <label htmlFor="file6">
                                <div className="btn-upload">파일 선택</div>
                            </label>
                            <input type="file6" name='M_img' id="file" />
                        </li>
                        <li>
                            <img src="/images/add_photo.png" />
                            <label htmlFor="file7">
                                <div className="btn-upload">파일 선택</div>
                            </label>
                            <input type="file7" name='M_img' id="file" />
                        </li>
                        <li>
                            <img src="/images/add_photo.png" />
                            <label htmlFor="file8">
                                <div className="btn-upload">파일 선택</div>
                            </label>
                            <input type="file8" name='M_img' id="file" />
                        </li>
                    </ul>

                </article>

                <article>
                    <h3>태그</h3>
                    <input type="text" name='tag' /><br />
                </article>


                <article className='open_btn'>
                    <select name="open">    
                        <option value="공개">공개</option>
                        <option value="비공개">비공개</option>
                    </select>
                    <input type="submit" value='등록하기' />
                    {/* <input type="submit" value='수정하기' /> */}
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

export default RecipeReg;