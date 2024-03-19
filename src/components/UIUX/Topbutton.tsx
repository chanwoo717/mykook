import React, { useEffect, useState } from 'react';
import "@/components/style/topbutton.scss";
function Topbutton() {
    const topMove = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    return (
        <div className={`scrollToTopButton ${isVisible ? 'visible' : ''}`} onClick={topMove}>
        <img src="/images/top_2.png" alt="" />
    </div>
    );
}

export default Topbutton;