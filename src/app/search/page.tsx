"use client";
import Search from '@/components/UIUX/Search';
import RecipeList from '@/components/service/RecipeList';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from '@/components/recipe_store/all_store';
import '../../components/style/search.scss';


function Page() {

    const idx = "검색정사각형";
    const index = "검색가로";
    const searchParams = useSearchParams()
    const searchQuery = searchParams && searchParams.get("q");

    let { data, dataCrl } = useStore();
    
    useEffect(() => {
        dataCrl('all', '','');
    }, [])

    return (

        <div className='search-page'>
            <Search defaultValue={searchQuery} />
            
        </div>
    );
}

export default Page;