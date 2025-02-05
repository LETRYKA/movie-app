"use client"
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react';
import CardComp from '@/components/CardComp';

const SearchPage = () => {
    const [inputValue, setInputValue] = useState('');
    const params = useParams()
    const router = useRouter()

    const inputHandler = (e: any) => {
        setInputValue(e.target.value)
    }

    const searchSpellCheck = () => {
        if (params.id) {
            const search = params.id;
            const result = search.toString().replaceAll("%20", " ");
            return result
        }
        return '';
    }

    useEffect(() => {
        setInputValue(searchSpellCheck());
    }, []);

    const searchHandler = (inputValue: any) => {
        if (inputValue) {
            if (inputValue.length > 0) {
                router.push(`/search/${inputValue}`)
            }
            else {
                return
            }
        }
    }

    const handleKeyDown = (event, inputValue) => {
        if (event.key === "Enter") {
            searchHandler(inputValue);
        }
    };

    console.log(inputValue)

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <div className='w-[80%] flex flex-col justify-center mt-40'>
                <div className='w-full h-16 bg-[#090b13] rounded-xl flex justify-between items-center p-4'>
                    <input onKeyDown={(e) => handleKeyDown(e, inputValue)} onChange={inputHandler} type='text' value={inputValue} className='w-full h-full bg-[#090b13] outline-none text-white text-base font-regular pl-4'></input>
                    <Search onClick={() => searchHandler(inputValue)} className='stroke-white w-10 cursor-pointer' />
                </div>
                <p className='text-slate-500 mt-4'>Results of your search: <span className='text-white font-bold'>{`"${searchSpellCheck()}"`}</span></p>
            </div>
            <div className='w-[80%] h-auto mt-10 mb-20'>
                <CardComp movieData={searchSpellCheck()} slideTitle="" search={true} />
            </div>
        </div>
    )
}

export default SearchPage