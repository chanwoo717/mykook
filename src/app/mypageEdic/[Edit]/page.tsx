"use client";
import { useStore } from '@/components/recipe_store/all_store';
import RecipeEdit from '@/components/service/RecipeEdit';
import { useSession } from 'next-auth/react';
import React from 'react';

function Page() {

    let { data, dataCrl } = useStore();
    const { data: session, status }: any = useSession();
    
    return (
        <div>
            <RecipeEdit data={data} dataCrl={dataCrl} session={session} />
        </div >
    );
}

export default Page;