"use client"

import { MovieDetailType } from '@/types/MovieDetailType';
import { Play, Plus, UsersRound } from 'lucide-react';
import DetailedTab from '@/components/DetailedTab';
import { Button } from '@/components/ui/button';
import CardComp from '@/components/CardComp';
import Episodes from '@/components/Episodes';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import YouTube from 'react-youtube';
import axios from 'axios';


const Movie = (props: any) => {
    const { } = props;
    const [infoMovie, setInfoMovie] = useState<MovieDetailType>();
    const [similarMovies, setSimilarMovies] = useState([]);
    const [showTrailer, setShowTrailer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const fetchInfo = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `${process.env.TMDB_BASE_URL}/tv/${params.id}`,
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
            console.log("SERIES", response.data)
            setInfoMovie(response.data);

        } catch (err) {
            setIsLoading(false);
            setErrorMessage("Failed to fetch movie details.");
            console.error(err);
        }
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const similar = await axios.get(
                `${process.env.TMDB_BASE_URL}/tv/${infoMovie.id}/recommendations?language=en-US&page=1`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                    },
                }
            );

            setSimilarMovies(similar.data.results);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setErrorMessage("Failed to fetch popular movies.");
            console.error(err);
        }
    };

    const releaseDate = () => {
        const get = infoMovie?.last_air_date
        const response = get?.split('-', 1)
        return response;
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    useEffect(() => {
        if (showTrailer) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [showTrailer]);

    useEffect(() => {
        if (infoMovie) {
            fetchData();
        }
    }, [infoMovie]);

    return (
        <div className='relative'>
            {/* Trailer */}
            {showTrailer && (<div className='absolute top-0 w-full h-full flex justify-center items-center z-50 backdrop-blur-[4px]'>
                <YouTube videoId={infoMovie?.videos?.results?.[0]?.key} className='z-10' opts={{ width: "850", height: "480", playerVars: { autoplay: 1 } }} />
                <div onClick={() => setShowTrailer(false)} className='absolute w-full h-full bg-black z-0 opacity-50'></div>
            </div>)}
            {/* Page */}
            <div className='h-[800px] sm:h-auto'>
                <div className="relative w-full pr-14 pl-14 sm:p-0 h-[600px] sm:h-[967px] bg-cover bg-top flex justify-center sm:justify-start items-center bg-fixed" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${infoMovie?.backdrop_path})` }}>
                    <div className="bg-fade-gradient-v absolute bottom-0 w-full -mt-10 h-40 z-10"></div>
                    <div className="flex flex-col sm:ml-[8%] z-10 mt-[600px] sm:mt-40 lg:mt-16 justify-center items-center sm:justify-start sm:items-start">
                        <img src={`https://image.tmdb.org/t/p/w780/${infoMovie?.images?.logos?.[1]?.file_path || infoMovie?.images?.logos?.[0]?.file_path}`} className="w-80 -mt-4 sm:w-96 mb-8" />
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
                            <p className='text-white text-sm font-medium'>{releaseDate()} • {infoMovie?.number_of_seasons} Seasons</p>
                        </div>
                        <p className='text-slate-400 text-sm font-medium mt-2'>{infoMovie?.genres?.[0]?.name} | {infoMovie?.genres?.[1]?.name} | {infoMovie?.genres?.[2]?.name}</p>
                        <div className="flex flex-row gap-4 mt-8">
                            <Button onClick={() => router.push(`/watch/${infoMovie?.id}`)} variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[#1A1D29] flex items-center"><Play className="fill-[#1A1D29]" />PLAY</Button>
                            <Button onClick={() => { setShowTrailer(true); window.scrollTo({ top: 0, behavior: "smooth" }) }} variant="outline" className="hidden sm:flex pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[white] items-center bg-transparent hover:bg-[black]/40 hover:text-[white]">TRAILER</Button>
                            <Button variant="outline" className="pt-5 pb-5 pl-3 pr-3 text-base font-bold text-[white] flex items-center bg-transparent hover:bg-[black]/40 hover:text-[white] rounded-full"><Plus /></Button>
                            <Button variant="outline" className="hidden sm:flex pt-5 pb-5 pl-3 pr-3 text-base font-bold text-[white] items-center bg-transparent hover:bg-[black]/40 hover:text-[white] rounded-full"><UsersRound /></Button>
                        </div>
                        <p className="hidden sm:flex text-sm sm:text-base text-slate-400 w-[80%] lg:w-[47%] mt-7 overflow-hidden h-[100px] md:h-auto">{infoMovie?.overview}</p>
                    </div>
                    <div className="absolute w-full h-full bg-custom-gradient z-0"></div>
                </div>
            </div>
            <Episodes seriesData={infoMovie} />
            <DetailedTab movieData={infoMovie} series={true} />
            <CardComp movieData={similarMovies} series={true} slideTitle="Similar Movies" />
        </div>
    );

};

export default Movie;