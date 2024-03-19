//검색기능
"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent } from "react";
import { useStore } from '../recipe_store/all_store';
import { useStore3 } from '../recipe_store/result_data';
import Recent from './Recent';

interface iDefault {
    defaultValue: string | null
}


const Search = ({ defaultValue }: iDefault) => {

    const [inputValue, setValue] = useState(defaultValue);
    const router = useRouter();
    let { data, dataCrl } = useStore();
    let { data3, resultData } = useStore3();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setValue(inputValue);
    }


    const handleSearch = (e: any) => {

        e.preventDefault();

        let result: any = data.filter((obj: any) => obj.name.includes(inputValue));

        if (typeof window !== 'undefined') {
            const result = localStorage.getItem('keywords') || '[]';
            const resultObj = JSON.parse(result);
            const newKeyword = {
                id: Date.now(),
                text: inputValue
            }
            const filteredKeyword = resultObj.filter((obj: any) => obj.text.includes(inputValue));
            if (!filteredKeyword.length) {
                localStorage.setItem('keywords', JSON.stringify([...resultObj, newKeyword]))
            }
        }
        resultData(result)
        setTimeout(() => {

            if (inputValue) return router.push(`/search/${inputValue}`);
        }, 100)
    }


    const handleSearch2 = (e: any) => {

        let result: any = data.filter((obj: any) => obj.name.includes(e));

        if (typeof window !== 'undefined') {
            const result = localStorage.getItem('keywords') || '[]';
            const resultObj = JSON.parse(result);
            const newKeyword = {
                id: Date.now(),
                text: e
            }
            const filteredKeyword = resultObj.filter((obj: any) => obj.text.includes(e));

            if (!filteredKeyword.length) {
                localStorage.setItem('keywords', JSON.stringify([...resultObj, newKeyword]))
            }
        }
        resultData(result)
        if (e) return router.push(`/search/${e}`);
    }


    const handleKeyPress = (event: { key: any; }) => {
        if (event.key === "Enter") return handleSearch
    }


    useEffect(() => {
        dataCrl('all', '', '');
    }, [])


    return (
        <div className='search-sect'>
            <form onSubmit={handleSearch}>
                <input type='text' className='search-bar' id="inputId" value={inputValue ?? ""} onChange={handleChange} onKeyDown={handleKeyPress} placeholder='레시피 키워드를 입력하세요!'></input>
                <img onClick={handleSearch} src="/images/search_black.png" alt="" className='search-btn' />
            </form>
            <Recent handleSearch2={handleSearch2} setValue={setValue} inputValue={inputValue} />
        </div>
    );
}

export default Search;