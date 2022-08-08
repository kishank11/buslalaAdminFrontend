import React from 'react'

const View = ({ title }) => {
    return (
        <button className='bg-amber-600 h-7 w-20 rounded-md text-white'>
            {title}
        </button>
    )
}

export default View
