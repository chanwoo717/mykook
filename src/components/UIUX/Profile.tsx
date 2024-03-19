import React from 'react';
import "@/components/style/mypage.scss";

function Profile({session}:any) {
    return (
        <div className='profile'>
            <figure>
                <img src={`${session.user.image}`}></img>
                <figcaption>
                    <p>{session.user.name}</p>
                    <p>{session.user.email}</p>
                </figcaption>
            </figure>
        </div>
    );
}

export default Profile;