import React, { useState, useEffect } from 'react'
import { RiNotification3Line } from 'react-icons/ri';
import { BsFillPersonFill } from 'react-icons/bs';
import { getUser } from '../utils/Common'; 

const CircularDiv = "h-12 w-12 flex items-center justify-center rounded-full border-[1px] border-slate-900 cursor-pointer"

const Header = () => {
    const [user, setUser] = useState(getUser());
    useEffect(() => {
        setUser(getUser());
    },[])
    
    return (
        <div className='h-20 border-b-[1px] border-stone-900 flex items-center justify-end px-8 mx-10'>
            <div className={`${CircularDiv} mr-8`}>
                <RiNotification3Line size={25}/>
            </div>
            <div className='flex items-center w-1/4 justify-around'>
                <div className={CircularDiv}>
                    <BsFillPersonFill size={25}/>
                </div>
                <h4>Good Morning {user.name}</h4>
            </div>
        </div>
    )
}

export default Header
