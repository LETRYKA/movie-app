import { useState, useEffect } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

interface Movie {
    id: number;
    title: string;
    posterPath: string;
    vote_average: number;
    backdrop_path: string;
}

const Slider = (props: { movieData: Movie[]; slideTitle: string; }) => {
    const { movieData, slideTitle } = props;
    const [detailedMovieData, setDetailedMovieData] = useState<[{}]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const fetchDetailedData = async () => {
        try {
            setIsLoading(true);
            const requests = movieData.map((movie) =>
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
            setDetailedMovieData(movieDetailedData);

            console.log("Slider detailed movie", movieDetailedData);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDetailedData();
    }, [movieData]);

    return (
        <div>
            <div className="w-full flex justify-center items-center pb-5" >
                <div className="w-full flex justify-start flex-col overflow-hidden ml-[4%]">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-xl text-white font-bold mb-5 pl-2">{slideTitle}</h1>
                        <h1 className="text-base text-slate-400 font-medium flex flex-row cursor-pointer mr-10">See more <ChevronRight width={18} className="ml-1" /></h1>
                    </div>
                    <Carousel className="w-full relative">
                        <CarouselContent className='pl-2'>
                            {detailedMovieData.map((movie) => (
                                <CarouselItem key={movie.id} onClick={() => router.push(`/info/movie/${movie.id}`)} className="basis-4/12 md:basis-2/5 lg:basis-1/5">
                                    <div className="p-1">
                                        {isLoading ? (
                                            <Skeleton className="w-full h-48 bg-gray-700 rounded-md" />) : (
                                            <Card className="overflow-hidden cursor-pointer border border-[#353843] bg-cover bg-center transform transition-transform duration-300 ease-in-out hover:scale-105" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movie?.images?.backdrops?.[0]?.file_path || movie.backdrop_path})` }} >
                                                <CardContent className="card flex items-center justify-center h-48 p-6">
                                                </CardContent>
                                            </Card>
                                        )}
                                        <div className='mt-3 flex flex-col'>
                                            <p className="text-white text-start text-lg font-medium">
                                                {isLoading ? (<Skeleton className="w-full h-5 sm:h-6 bg-gray-700 rounded-md" />) : (movie.title)}
                                            </p>
                                            <div className='flex flex-row'>
                                                <p className="text-white text-start text-base font-medium flex flex-row items-center ">
                                                    <Star className='fill-[#f5c518] stroke-none w-4 mr-2' /> {(movie.vote_average).toFixed(1)}
                                                </p>
                                                <p className="text-slate-500 text-start text-base font-medium flex flex-row items-center ml-2">
                                                    | <span className='ml-2 text-sm'>{movie?.genres?.[0]?.name}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselNext className="mr-20 -mt-10 z-20" />
                    </Carousel>
                    <div className="absolute w-60 h-60 bg-fade-gradient-hr mt-7 right-0 z-10"></div>
                </div>
            </div >
        </div>
    );

};

export default Slider;