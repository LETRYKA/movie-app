"use client"

import { Play, Plus, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Slider from '@/components/Slider';
import axios from 'axios';
import { MovieDetailType } from '@/types/MovieDetailType';
import YouTube from 'react-youtube';



const Movie = (props: any) => {
    const { } = props;
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [infoMovie, setInfoMovie] = useState<MovieDetailType>();

    const fetchInfo = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `${process.env.TMDB_BASE_URL}/movie/${params.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                    },
                    params: {
                        language: "en-US",
                        append_to_response: "images,credits,videos,release_dates",
                        include_image_language: "en",
                    },
                }
            );

            console.log(response.data)

            setInfoMovie(response.data);
            console.log(response.data)

        } catch (err) {
            setIsLoading(false);
            setErrorMessage("Failed to fetch movie details.");
            console.error(err);
        }
    };

    const releaseDate = () => {
        const get = infoMovie?.release_date
        const response = get?.split('-', 1)
        return response;
    }

    const runTime = () => {
        const get = infoMovie?.runtime;
        if (typeof get !== 'number' || get <= 0) {
            return '';
        }
        const hr = (get / 60).toFixed(2).toString().split('.', 1);
        const min = (get / 60).toFixed(2).toString().split('.')[1];
        const runtime = (`${hr} h ${min} min`)
        return runtime;
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div>
            <div className='h-[800px] sm:h-auto'>
                <div className="relative w-full pr-14 pl-14 sm:p-0 h-[600px] sm:h-[967px] bg-cover bg-top flex justify-center sm:justify-start items-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${infoMovie?.backdrop_path})` }}>
                    <div className="bg-fade-gradient-v absolute bottom-0 w-full -mt-10 h-40 z-10"></div>
                    <div className="flex flex-col sm:ml-[8%] z-10 mt-[600px] sm:mt-16 justify-center items-center sm:justify-start sm:items-start">
                        <img src={`https://image.tmdb.org/t/p/w780/${infoMovie?.images?.logos?.[1]?.file_path}`} className="w-[70%] -mt-4 sm:w-[320px] mb-4" />
                        <div className='flex flex-row justify-start items-center gap-2'>
                            <div className='flex justify-center items-center w-0 h-0 bg-[#32343e] p-3 pl-5 pr-5 rounded-md'>
                                <p className='text-white text-sm font-semibold'>{infoMovie?.release_dates?.results?.[41]?.release_dates?.[0]?.certification}+</p>
                            </div>
                            <div className='flex justify-center items-center w-0 h-0 bg-[#32343e] p-3 pl-5 pr-5 rounded-md'>
                                <p className='text-white text-sm font-bold'>HD</p>
                            </div>
                            <div className='flex justify-center items-center w-0 h-0 bg-[#32343e] p-3 pl-5 pr-5 rounded-md'>
                                <p className='text-white text-sm font-medium'>CC</p>
                            </div>
                            <p className='text-white text-sm font-medium'>{releaseDate()} • {(runTime())}</p>
                        </div>
                        <YouTube videoId={infoMovie?.videos.results?.[0]?.key} />
                        <p className='text-slate-400 text-sm font-medium mt-2'>{infoMovie?.genres?.[0]?.name} | {infoMovie?.genres?.[1]?.name} | {infoMovie?.genres?.[2]?.name}</p>
                        <div className="flex flex-row gap-4 mt-8">
                            <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[#1A1D29] flex items-center"><Play className="fill-[#1A1D29]" />PLAY</Button>
                            <Button variant="outline" className="hidden sm:flex pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[white] items-center bg-transparent hover:bg-[black]/40 hover:text-[white]">TRAILER</Button>
                            <Button variant="outline" className="pt-5 pb-5 pl-3 pr-3 text-base font-bold text-[white] flex items-center bg-transparent hover:bg-[black]/40 hover:text-[white] rounded-full"><Plus /></Button>
                            <Button variant="outline" className="hidden sm:flex pt-5 pb-5 pl-3 pr-3 text-base font-bold text-[white] items-center bg-transparent hover:bg-[black]/40 hover:text-[white] rounded-full"><UsersRound /></Button>
                        </div>
                        <p className="hidden sm:flex text-sm sm:text-base text-slate-400 w-full sm:w-[40%] mt-7">{infoMovie?.overview}</p>
                    </div>
                    <div className="absolute w-full h-full bg-custom-gradient z-0"></div>
                </div>
            </div>
        </div>
    );

};

export default Movie;