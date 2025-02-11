"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardCompSkeleton from "./skeleton/CardCompSkeleton";
import { DataType } from "@/types/DataType";
import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import Link from "next/link";
import React from 'react'
import axios from 'axios';

export const CardComp = (props: any) => {
    const { movieData, slideTitle, series, search, vertical } = props;
    const [detailedMovieData, setDetailedMovieData] = useState<DataType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchDetailedData = async () => {
        try {
            setIsLoading(true);
            // Fetch TV By Search
            const tvResponse = await axios.get(
                `${process.env.TMDB_BASE_URL}/search/tv?query=${movieData}&language=en-US&page=1`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                    },
                }
            );

            // Fetch Movies By Search
            const movieResponse = await axios.get(
                `${process.env.TMDB_BASE_URL}/search/movie?query=${movieData}&language=en-US&page=1`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                    },
                }
            );

            // Storing in array both results
            let searchResults = [
                ...tvResponse.data.results.map(item => ({ ...item, type: 'tv' })),
                ...movieResponse.data.results.map(item => ({ ...item, type: 'movie' }))
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
            setDetailedMovieData(detailedResults)
            console.log("Detailed Data:", detailedResults);

        } catch (error) {
            console.error("Error fetching details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDetailedData = async () => {
        try {
            setIsLoading(true);
            const requests = movieData.map((movie) =>
                axios.get(`${process.env.TMDB_BASE_URL}/${series ? 'tv' : 'movie'}/${movie.id}`, {
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
            setDetailedMovieData(movieDetailedData);
            console.log(movieDetailedData)

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const releaseDate = (movie: DataType) => {
        let get = "";
        if (movie.type && movie.type.length) {
            get = movie.last_air_date
            console.log('test')
        } else {
            get = movie?.release_date
            console.log('test2')
        }
        const response = get?.split('-', 1)
        return response;
    }

    const runTime = (movie: DataType) => {
        const get = movie?.runtime;
        if (typeof get !== 'number' || get <= 0) {
            return '';
        }
        const hr = parseInt((get / 60).toFixed(2).toString().split('.', 1)[0]);
        const min = parseInt((get % 60).toFixed(2).toString().split('.', 1)[0]);

        if (hr > 0) {
            return (`${hr}h ${min}min`)
        } else {
            return (`${min}min`)
        }
    }

    if (!search) {
        useEffect(() => {
            fetchDetailedData();
        }, [movieData]);
    }

    if (search) {
        useEffect(() => {
            searchDetailedData();
        }, [movieData]);
    }

    return (
        <div> {isLoading ? (<CardCompSkeleton vertical={vertical} />) :
            (<div className='w-30p'>
                <h1 className="text-xl text-[--text-color] font-semibold mb-3">{slideTitle}</h1>
                <div className={`grid ${vertical ? "grid-cols-2" : "grid-cols-1"}
            ${vertical ? "sm:grid-cols-3" : "sm:grid-cols-2"}
            ${vertical ? "lg:grid-cols-4" : "lg:grid-cols-3"}
            ${vertical ? "2xl:grid-cols-5" : "2xl:grid-cols-4"} gap-6`}>
                    {detailedMovieData.map((movie, index) => (
                        <Link key={movie.id} href={movie.seasons ? `/info/series/${movie.id}` : `/info/movie/${movie.id}`}>
                            <Card className={`${vertical ? 'aspect-[7/10]' : 'aspect-[4/2]'} h-auto cursor-pointer bg-slate-800 shadow-md bg-cover bg-center relative overflow-hidden border-[--main-border] rounded-lg transition-transform duration-250 ease-in-out hover:scale-105`} style={{ backgroundImage: vertical ? `url(${process.env.TMDB_IMAGE_SERVICE_URL}/w780/${movie?.images?.posters?.[0]?.file_path || movie.backdrop_path})` : `url(${process.env.TMDB_IMAGE_SERVICE_URL}/w780/${movie?.images?.backdrops?.[0]?.file_path || movie.backdrop_path})` }}>
                                <CardHeader>
                                    <div className="absolute inset-0 w-full h-full group flex justify-end items-start">
                                        <div className="absolute -bottom-3 transition duration-250 ease-in-out opacity-100 sm:opacity-0 group-hover:opacity-100 bg-fade-gradient-black w-full h-full"></div>
                                        <div className="absolute w-full transition duration-250 ease-in-out opacity-100 sm:opacity-0 group-hover:opacity-100 bottom-0 flex justify-center items-center flex-col px-2">
                                            <p className="text-[--text-color] text-sm sm:text-lg font-bold z-10 text-center">
                                                {movie.type ? movie.name : movie.title}
                                            </p>
                                            <p className="text-slate-300 text-start text-xs font-medium mb-4 z-10">
                                                {`${releaseDate(movie)} |`} {movie.seasons ? `${movie?.seasons?.[0]?.episode_count} EP` : runTime(movie)}
                                            </p>
                                        </div>
                                        <p className="transition duration-300 ease-in-out opacity-100 sm:opacity-0 group-hover:opacity-100 text-[--text-color] text-start text-base font-medium flex flex-row items-center mt-3 mr-3 bg-black/20 px-2 rounded-lg">
                                            <Star className='fill-[--star-color] stroke-none w-4 mr-2' /> {(movie.vote_average).toFixed(1)}
                                        </p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div >)}
        </div >
    )
}