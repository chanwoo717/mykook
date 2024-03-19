"use client";
import Bookmark from '@/components/service/Bookmark';
import RecipeList from '@/components/service/RecipeList';
import React from 'react';
import '../../components/style/bookmark.scss';
import Topbutton from '@/components/UIUX/Topbutton';
function Page() {
    const idx = "북마크";
    return (
        
        <div className='bookmark_page'>
            <Bookmark idx={idx}/>
            <Topbutton/>
        </div>
    );
}

export default Page;