import React from 'react';

function FuncComment({obj, data4}:any) {

    if(!data4){
        return <>
        <img src="/images/pencil.png" alt="" />
        <p></p>
    </>;
    }
    let oneComment = data4.filter((comment:any)=>comment.seq == obj.seq)
    

    return (
        <>
            <img src="/images/pencil.png" alt="" />
            <p>{oneComment.length}</p>
        </>
    );
}

export default FuncComment;