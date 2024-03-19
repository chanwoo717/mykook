'use client';
import { usePathname, useRouter } from "next/navigation";
import FuncScrap from '@/components/UIUX/FuncScrap';
import FuncLike from './FuncLike';
import "../style/scrap.scss";
import "../style/recipe_wid.scss";
import FuncComment from "./FuncComment";



function RecipeWid({ dataID,selectName,data4 }: any) {
    
    const router: any = useRouter();
    const url = usePathname();
    const link = (name: any) => {
        let urlname = dataID.filter((obj: any) => name == obj.name);
        let url: any = urlname[0].seq;
        router.push(`/home/${url}`);
    }

    const sortRecipesBySeq = (recipes: any[]) => {
        return recipes.slice().sort((a, b) => a.seq - b.seq);
    }

    const sortRecipesByLike = (recipes: any[]) => {
        return recipes.slice().sort((a, b) => b.like - a.like );
    }


    let sortedRecipes = [...dataID];

    if(selectName=='latest'){
        sortedRecipes = sortRecipesBySeq(dataID);
    } else if (selectName=='star'){
        sortedRecipes = sortRecipesByLike(dataID);
    }

    const recipeList= sortedRecipes.filter((obj:any) => obj.m_thumb !="")

    return (
        <>
            <div className="recipeWid_box">
                <div className="recipeWid">
                    {recipeList.map((obj: any, k: number) => (
                        <div key={k}>
                            <div>
                                <figure>
                                    <div className='scrap_position'><img className='menu_img' src={obj.m_thumb} /><FuncScrap obj ={obj} /></div>   
                                    <figcaption>
                                        <div className='flex'>
                                            <h2 onClick={() => { link(obj.name) }}>{obj.name}</h2>
                                        </div>
                                        
                                        <p>{obj.tip}</p>
                                        <div className="recipeWidBtn">
                                            <div className="commentBox" onClick={() => { link(obj.name) }}><FuncComment obj={obj} data4={data4}/></div>
                                            <FuncLike obj={obj} />
                                            <div style={url=="/mypage"?{display:"block"}:{display:"none"}}>수정</div>
                                            <div style={url=="/mypage"?{display:"block"}:{display:"none"}}>삭제</div>
                                        </div>
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


export default RecipeWid;