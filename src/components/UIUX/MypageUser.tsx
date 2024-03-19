import React from 'react';

function MypageUser({ session }: any) {
    return (
        <div className='myrecipeUser'>
            <p>{session.user.email}</p>
        </div>
    );
}

export default MypageUser;