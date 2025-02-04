"use client"
import { Play, Plus, UsersRound } from 'lucide-react';
import DetailedTab from '@/components/DetailedTab';
import { Button } from '@/components/ui/button';
import CardComp from '@/components/CardComp';
import Episodes from '@/components/Episodes';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface MovieResponse {
    id: number;
    backdrop_path: string;
    release_date: string;
    runtime: number;
    genres: { name: string }[];
    images: { logos: { file_path: string }[] };
    release_dates: { results: { iso_3166_1: string, release_dates: { certification: string }[] }[] };
    videos: { results: { type: string, key: string }[] };
    overview: string;
    number_of_seasons: number;
    last_air_date: number;
}

const Movie = (props: {}) => {
    const { } = props;
    const [infoMovie, setInfoMovie] = useState<MovieResponse | null>(null);
    const [similarMovies, setSimilarMovies] = useState<any[]>([]);
    const [showTrailer, setShowTrailer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [onLoad, setOnLoad] = useState(false);
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
            console.log("SERIES", response.data);
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
                `${process.env.TMDB_BASE_URL}/tv/${infoMovie?.id}/recommendations?language=en-US&page=1`,
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
        const get = infoMovie?.last_air_date;
        const response = get?.toString().split('-', 1);
        return response;
    };

    const getTrailer = () => {
        const trailers = infoMovie?.videos?.results?.filter(video => video.type === 'Trailer');
        const trailerKey = trailers?.[0]?.key;
        return trailerKey;
    };

    const handleLoad = () => {
        setOnLoad(true);
    };

    useEffect(() => {
        fetchInfo();

        const timeoutId = setTimeout(() => {
            handleLoad();
        }, 2000);
        return () => {
            clearTimeout(timeoutId);
        };
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
            {showTrailer && (<div className='absolute top-0 w-full h-screen flex justify-center items-center z-50 backdrop-blur-[4px]'>
                <iframe
                    width="60%"
                    height="60%"
                    src={`https://www.youtube.com/embed/${getTrailer()}?autoplay=1&controls=1&fs=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className='z-50' />
                <div onClick={() => setShowTrailer(false)} className='absolute w-full h-full bg-black z-0 opacity-50'></div>
            </div>)}
            {/* Page */}
            <div className='h-[800px] sm:h-auto'>
                <div className="relative sm:overflow-hidden w-full pr-14 pl-14 sm:p-0 h-[600px] sm:h-[967px] bg-cover bg-top md:bg-fixed flex justify-center sm:justify-start items-center" style={{ backgroundImage: `url(${process.env.TMDB_IMAGE_SERVICE_URL}/original/${infoMovie?.backdrop_path})` }}>
                    {!onLoad && (
                        <div></div>
                    )}
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${getTrailer()}?autoplay=1&mute=1&controls=0&fs=1&loop=1&playlist=${getTrailer()}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className={`scale-150 absolute top-0 hidden lg:flex lg:-mt-20 z-0 transition-opacity ${onLoad ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <div className="bg-fade-gradient-v absolute bottom-0 w-full -mt-10 h-40 z-10"></div>
                    <div className="flex flex-col sm:ml-[8%] z-10 mt-[600px] sm:mt-40 lg:mt-16 justify-center items-center sm:justify-start sm:items-start">
                        <img src={`${process.env.TMDB_IMAGE_SERVICE_URL}/w780/${infoMovie?.images?.logos?.[1]?.file_path || infoMovie?.images?.logos?.[0]?.file_path}`} className="w-80 -mt-4 sm:w-96 mb-8" />
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
                        <p className='text-slate-400 text-sm font-medium mt-2'>
                            {infoMovie?.genres?.[0]?.name}
                            {infoMovie?.genres?.[1]?.name && infoMovie?.genres?.[1]?.name.length > 0 ? `| ${infoMovie.genres[1].name}` : ""}
                            {infoMovie?.genres?.[2]?.name && infoMovie?.genres?.[2]?.name.length > 0 ? `| ${infoMovie.genres[2].name}` : ""}
                        </p>
                        <div className="flex flex-row gap-4 mt-8">
                            <Button onClick={() => router.push(`/watch/series/${infoMovie?.id}/1/1`)} variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[#1A1D29] flex items-center"><Play className="fill-[#1A1D29]" />PLAY</Button>
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
            <div className='px-8 sm:px-10 lg:px-24 mb-20'>
                <CardComp movieData={similarMovies} series={true} slideTitle="Similar Movies" />
            </div>
        </div>
    );
};

export default Movie;
