"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

const page = () => {
    return (
        <div className='w-full h-screen flex flex-col'>
            <div className='w-full flex justify-center items-center my-40'>
                <img src='/imgs/logo.png' width={300} />
            </div>
            <p className='text-white text-lg'>TEST</p>
        </div>
    )
}

export default page