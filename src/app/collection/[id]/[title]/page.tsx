"use client"

import React, { useState, useEffect } from 'react'
import { DataType } from '@/types/DataType'
import { useParams } from 'next/navigation'
import { CardComp } from "@/components"
import axios from 'axios'

const page = () => {
    const params = useParams();
    const studioId = Array.isArray(params.id) ? params.id[0] : params.id;
    const [collectionData, setCollectionData] = useState<DataType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchMoviesByStudio = async (studioId: string) => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `${process.env.TMDB_BASE_URL}/discover/movie`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                    },
                    params: {
                        with_companies: studioId,
                        language: "en-US",
                        append_to_response: "images,credits,videos",
                        include_image_language: "en",
                    },
                }
            );
            setCollectionData(response.data.results);
            setIsLoading(false);
            console.log(`Movies from studio ${studioId}`, response.data.results);
        } catch (err) {
            setIsLoading(false);
            setErrorMessage("Failed to fetch movies by studio.");
            console.error(err);
        }
    };


    useEffect(() => {
        if (studioId) {
            fetchMoviesByStudio(studioId);
        }
    }, [studioId]);

    return (
        <div className='w-full h-full relative flex flex-col'>
            <div className='w-full h-full absolute inset-0 bg-cover bg-fixed opacity-80 -z-10 ' style={{ backgroundImage: `url(/imgs/${params.title}-bg.jpg)` }}>
                <div className='absolute w-full h-full bg-black/50'></div>
            </div>
            <div className='w-full flex justify-center items-center mt-52 mb-10 sm:mb-32'>
                <img src={`/imgs/${params.title}.jpg`} className='w-52 sm:w-[450px]' />
            </div>
            <div className='w-[100%] h-auto px-10 sm:px-20 mb-32'>
                <CardComp movieData={collectionData} />
            </div>
            <div className='absolute bottom-0 w-full h-72 bg-fade-gradient-v -z-10'></div>
        </div>
    )
}

export default page
