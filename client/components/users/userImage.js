// UserImage.js
import React, { useEffect, useState } from 'react';
import { Image } from "@nextui-org/react";

const UserImage = ({user}) => {
    const [style, setStyle] = useState({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: '1.25em'
    });

    useEffect(() => {
        const hashCode = (str) => {
            let hash = 0;
            if(str)
                for (let i = 0; i < str.length; i++) {
                    hash = str.charCodeAt(i) + ((hash << 5) - hash);
                }
            return hash;
        };
        
        const intToRGB = (i) => {
            const c = (i & 0x00FFFFFF)
                .toString(16)
                .toUpperCase();
            return '#' + '00000'.substring(0, 6 - c.length) + c;
        };
        
        const getProfileColor = () => {
            const color =  intToRGB(hashCode(localStorage.getItem('auth_token')));
            return color;
        };
    
        setStyle((prevStyle) => ({
            ...prevStyle,
            backgroundColor: getProfileColor(),
        }));
    }, []);

    return (
        <section style={style} className='w-full h-full rounded-full'>
            <img 
                src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/user/${user.user_id}/1.png`} 
                alt={`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}
                style={{style}}
                className='w-full h-full object-cover rounded-full'
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.replaceWith(document.createTextNode(e.target.alt));
                }}
            />        
        </section>
    );
};

export default UserImage;