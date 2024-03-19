"use client";

import { useEffect, useState } from "react";

interface keyInterface {
    id: number,
    text: string
}

function Recent({ setValue, handleSearch2 }: any) {

    const [keywords, setKeywords] = useState<keyInterface[]>([])


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const result = localStorage.getItem('keywords') || '[]';
            setKeywords(JSON.parse(result))
        }
    }, [])

    useEffect(() => {
        if (keywords.length) {
            localStorage.setItem('keywords', JSON.stringify(keywords));
        }
    }, [keywords])


    const removeKeyword = (id: number) => {
        const nextKeyword = keywords.filter((keyword) => {
            return keyword.id != id
        })
        setKeywords(nextKeyword)
    }

    const clearKeyword = () => {
        setKeywords([])
    }

    const keywordBtn = (name: any) => {
        setValue(name);
        handleSearch2(name);
    }

    return (
        <div className="recently">
            {keywords.length ? (
                <div className="recent-top">
                    <p>최근 검색어</p>
                    <button type="button" className="del-all-btn" onClick={clearKeyword}>
                        전체 삭제
                    </button>
                </div>
            ) : (
                <div></div>
            )}

            <div className="list-overflow">
                <ul>
                    {keywords.length ? (
                        keywords.map((k) => (
                            <li key={k.id}>
                                <span className="recent-word" onClick={() => keywordBtn(k.text)}>{k.text}</span>
                                <button className="remove-btn" type="button" onClick={() => removeKeyword(k.id)}>
                                    x
                                </button>
                            </li>
                        ))
                    ) : (
                        <div>최근 검색어가 없습니다</div>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Recent;