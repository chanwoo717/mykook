"use client";
import Search from '@/components/UIUX/Search';
import RecipeList from '@/components/service/RecipeList';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from '@/components/recipe_store/all_store';
import '../../components/style/search.scss';


function Page() {

    const idx = "정사각형";
    const index = "가로";
    const searchParams = useSearchParams()
    const searchQuery = searchParams && searchParams.get("q");

    let { data, dataCrl } = useStore();
    
    useEffect(() => {
        dataCrl('all', '','');
    }, [])

    return (

        <div className='search-page'>
            <Search defaultValue={searchQuery} />
            <h2>Recommended</h2>
            
            <RecipeList idx={idx} />
            
            <h2>Most Liked</h2>
            <RecipeList idx={index}/>
            
        </div>
    );
}

export default Page;