import "@/components/style/home_detail.scss";
import RecipeList from '@/components/service/RecipeList';

function Page({params}:any) {
    const idx = "홈세부"
    const detailUrl = params.detail;
    

    return (
        <RecipeList idx={idx} detailUrl={detailUrl} />
    );
}

export default Page;


