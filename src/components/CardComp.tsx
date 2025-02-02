"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import React from 'react'
import axios from 'axios';

const CardComp = (props: any) => {
    const { movieData, slideTitle, series, search } = props;
    const [detailedMovieData, setDetailedMovieData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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

            searchResults.sort((a, b) => {
                if (a.popularity > b.popularity) return -1;
                if (a.popularity < b.popularity) return 1;
                return 0;
            });

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

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const releaseDate = (movie) => {
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

    const runTime = (movie) => {
        const get = movie?.runtime;
        if (typeof get !== 'number' || get <= 0) {
            return '';
        }
        const hr = parseInt((get / 60).toFixed(2).toString().split('.', 1));
        const min = parseInt((get % 60).toFixed(2).toString().split('.', 1));

        if (hr > 0) {
            return (`${hr} h ${min} min`)
        } else {
            return (`${min} min`)
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
        <div className='w-full px-8 sm:px-10 lg:px-24 mb-20'>
            <h1 className="text-xl text-white font-semibold mb-3 pl-4">{slideTitle}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 p-4">
                {detailedMovieData.slice(0, 12).map((movie, index) => (
                    <Card key={movie.id} onClick={() => router.push(movie.seasons ? `/info/series/${movie.id}` : `/info/movie/${movie.id}`)} className="aspect-[4/2] h-auto cursor-pointer bg-slate-800 shadow-md bg-cover bg-center relative overflow-hidden border-[#353843] rounded-lg transition-transform duration-300 ease-in-out hover:scale-105" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movie?.images?.backdrops?.[0]?.file_path || movie.backdrop_path})` }}>
                        <CardHeader>
                            <div className="absolute inset-0 w-full h-full group flex justify-end items-start">
                                <div className="absolute -bottom-3 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 bg-fade-gradient-black w-full h-full"></div>
                                <div className="absolute w-full transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 bottom-0 flex justify-center items-center flex-col">
                                    <p className="text-white text-lg font-bold z-10 text-center">
                                        {movie.type ? movie.name : movie.title}
                                    </p>
                                    <p className="text-slate-300 text-start text-xs font-medium mb-4 z-10">
                                        {`${releaseDate(movie)} |`} {movie.seasons ? `${movie?.seasons?.[0]?.episode_count} EP` : runTime(movie)}
                                    </p>
                                </div>
                                <p className="transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 text-white text-start text-base font-medium flex flex-row items-center mt-3 mr-3 bg-black/20 px-2 rounded-lg">
                                    <Star className='fill-[#f5c518] stroke-none w-4 mr-2' /> {(movie.vote_average).toFixed(1)}
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default CardComp