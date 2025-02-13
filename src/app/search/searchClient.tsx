"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CardComp } from "@/components";
import { Search } from 'lucide-react';
import axios from 'axios';

const SearchClient = () => {
    const [inputValue, setInputValue] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [searchData, setSearchData] = useState<any[]>([]);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const searchQuery = searchParams.get('id') || '';

    const searchDetailedData = async () => {
        if (!searchQuery) return;

        try {
            setIsSearchLoading(true);

            const [tvResponse, movieResponse] = await Promise.all([
                axios.get(`${process.env.TMDB_BASE_URL}/search/tv?query=${searchQuery}&language=en-US&page=1`, {
                    headers: { Authorization: `Bearer ${process.env.TMDB_API_TOKEN}` },
                }),
                axios.get(`${process.env.TMDB_BASE_URL}/search/movie?query=${searchQuery}&language=en-US&page=1`, {
                    headers: { Authorization: `Bearer ${process.env.TMDB_API_TOKEN}` },
                }),
            ]);

            let searchResults = [
                ...tvResponse.data.results.map((item: any) => ({ ...item, type: 'tv' })),
                ...movieResponse.data.results.map((item: any) => ({ ...item, type: 'movie' })),
            ];

            const detailedResults = await Promise.all(
                searchResults.map(async (item) => {
                    const details = await axios.get(
                        `${process.env.TMDB_BASE_URL}/${item.type}/${item.id}?language=en-US&append_to_response=credits,videos,reviews`,
                        {
                            headers: { Authorization: `Bearer ${process.env.TMDB_API_TOKEN}` },
                            params: {
                                language: "en-US",
                                append_to_response: "images, type",
                                include_image_language: "en",
                            },
                        }
                    );
                    return details.data;
                })
            );

            setSearchData(detailedResults);
        } catch (error) {
            console.error("Error fetching details:", error);
        } finally {
            setIsSearchLoading(false);
        }
    };

    useEffect(() => {
        searchDetailedData();
        setInputValue(searchQuery);
    }, [searchQuery]);

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <div className='w-[80%] flex flex-col justify-center mt-40'>
                <div className='w-full h-16 bg-[#090b13] rounded-xl flex justify-between items-center p-4'>
                    <input 
                        onKeyDown={(e) => e.key === "Enter" && router.push(`/search?id=${inputValue}`)} 
                        onChange={inputHandler} 
                        type='text' 
                        value={inputValue} 
                        className='w-full h-full bg-[#090b13] outline-none text-white text-base font-regular pl-4'
                    />
                    <Search onClick={() => router.push(`/search?id=${inputValue}`)} className='stroke-white w-10 cursor-pointer' />
                </div>
                <p className='text-slate-500 mt-4'>Results for: <span className='text-white font-bold'>{`"${searchQuery}"`}</span></p>
            </div>
            <div className='w-[80%] h-auto mt-10 mb-20'>
                <CardComp movieData={searchData} slideTitle="" search={true} isSearchLoading={isSearchLoading} />
            </div>
        </div>
    );
};

export default SearchClient;
