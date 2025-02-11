"use client"

import React from 'react'
import { DataType } from '@/types/DataType'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { CardComp } from "@/components"
import axios from 'axios'


const page = () => {
    const params = useParams();
    const collectionId = params.id
    const [collectionData, setCollectionData] = useState<DataType[]>([]);
    const [collectionMovies, setCollectionMovies] = useState<DataType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [uiData, setUiData] = useState({
        logo: "",
        background: "",
    });


    const fetchData = async () => {
        try {
            setIsLoading(true);
            const collection = await axios.get(
                `${process.env.TMDB_BASE_URL}/collection/${collectionId}?language=en-US`,
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
            setCollectionData(collection.data.parts);
            console.log(`FIRST DATA`, collection.data.parts)

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setErrorMessage("Failed to fetch popular movies.");
            console.error(err);
        }
    };

    const fetchDetailedData = async () => {
        try {
            setIsLoading(true);
            const requests = collectionData.map((movie) =>
                axios.get(`${process.env.TMDB_BASE_URL}/movie/${movie.id}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                    },
                    params: {
                        language: "en-US",
                        append_to_response: "images,credits,videos",
                        include_image_language: "en",
                    },
                })
            );

            const responses = await Promise.all(requests);
            const movieDetailedData = responses.map((res) => res.data);
            setCollectionMovies(movieDetailedData);
        } catch (error) {
            console.error("Error fetching movie details", error);
        } finally {
            setIsLoading(false);
        }
    };


    console.log(`T_T`, collectionMovies)

    const decorHandler = () => {
        if (collectionId === "10") {
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchDetailedData();
    }, [collectionData]);

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full h-screen absolute bg-cover bg-fixed opacity-80 -z-10' style={{ backgroundImage: `url(/imgs/sw-col-bg.webp)` }}>
                <div className='absolute w-full h-full bg-black/40'></div>
            </div>
            <div className='w-full flex justify-center items-center mt-72 mb-40'>
                <img src={`${process.env.TMDB_IMAGE_SERVICE_URL}/original/${collectionMovies?.[0]?.images.logos?.[0]?.file_path}`} width={400} />
            </div>
            <div className='w-[100%] h-auto px-20 mb-32'>
                <CardComp movieData={collectionData} slideTitle="" />
            </div>
        </div>
    )
}

export default page