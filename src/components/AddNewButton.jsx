import React from 'react'

const AddNewButton = ({ title }) => {
    return (
        <button className='cursor-pointer h-12 w-64 border-2 border-black shadow-bs2 hover:shadow-bs1 transition-all duration-200'>
            <h3 className='text-base'>{title}</h3>
        </button>
    )
}

export default AddNewButton
