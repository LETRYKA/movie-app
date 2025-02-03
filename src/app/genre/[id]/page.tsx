"use client"
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { DataType } from '@/types/DataType'
import axios from 'axios'
import React from 'react'

const Genre = () => {
    const params = useParams();
    const genreId = params.id
    const [genreData, setGenreData] = useState<DataType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const fetchData = async () => {
        try {
            setIsLoading(true);
            const genre = await axios.get(
                `${process.env.TMDB_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                    },
                    params: {
                        language: "en-US",
                        append_to_response: "images,credits,videos",
                        include_image_language: "en",
                    },
                }
            );
            setGenreData(genre.data.results);
            console.log(`FIRST DATA`, genre.data.results)

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setErrorMessage("Failed to fetch popular movies.");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='w-full h-full flex items-center'>
            <h1></h1>
        </div>
    )
}

export default Genre