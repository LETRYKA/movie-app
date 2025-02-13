"use client"
import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { CardComp } from "@/components"
import { Search } from 'lucide-react';
import axios from 'axios'

const SearchPage = () => {
    const [inputValue, setInputValue] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter()
    const [isSearchLoading, setIsSearchLoading] = useState(false)
    const [searchData, setSearchData] = useState<any[]>([])

    const inputHandler = (e: any) => {
        setInputValue(e.target.value)
    }

    const searchSpellCheck = () => {
        const search = searchParams.get('id') || '';
        return search.replaceAll("%20", " ");
    }

    const searchDetailedData = async () => {
        try {
            setIsSearchLoading(true);
            // Fetch tv
            const tvResponse = await axios.get(
                `${process.env.TMDB_BASE_URL}/search/tv?query=${searchSpellCheck()}&language=en-US&page=1`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                    },
                }
            );

            // Fetch movie
            const movieResponse = await axios.get(
                `${process.env.TMDB_BASE_URL}/search/movie?query=${searchSpellCheck()}&language=en-US&page=1`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                    },
                }
            );

            // movie tv data in array
            let searchResults = [
                ...tvResponse.data.results.map((item: any) => ({ ...item, type: 'tv' })),
                ...movieResponse.data.results.map((item: any) => ({ ...item, type: 'movie' }))
            ];

            // Detaileddata
            const detailedData = searchResults.map(async (item) => {
                const details = await axios.get(
                    `${process.env.TMDB_BASE_URL}/${item.type}/${item.id}?language=en-US&append_to_response=credits,videos,reviews`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                        },
                        params: {
                            language: "en-US",
                            append_to_response: "images, type",
                            include_image_language: "en",
                        },
                    }
                );
                return details.data;
            });
            const detailedResults = await Promise.all(detailedData);
            setSearchData(detailedResults)
            console.log("Detailed Data:", detailedResults);

        } catch (error) {
            console.error("Error fetching details:", error);
        } finally {
            setIsSearchLoading(false);
        }
    };

    const searchHandler = (inputValue: any) => {
        if (inputValue) {
            if (inputValue.length > 0) {
                router.push(`/search?id=${inputValue}`);
            }
            else {
                return
            }
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, inputValue: string) => {
        if (event.key === "Enter") {
            searchHandler(inputValue);
        }
    };

    useEffect(() => {
        searchDetailedData();
        setInputValue(searchSpellCheck());
    }, [searchParams.get('id')]);

    useEffect(() => {
        const searchDelay = setTimeout(() => {
            if (inputValue.length > 0) {
                router.push(`/search?id=${inputValue}`);
            }
        }, 500);

        return () => clearTimeout(searchDelay);
    }, [inputValue]);

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
                <CardComp movieData={searchData} slideTitle="" search={true} isSearchLoading={isSearchLoading} />
            </div>
        </div>
    )
}

export default SearchPage
