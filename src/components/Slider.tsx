import { Carousel, CarouselContent, CarouselItem, CarouselNext } from "@/components/ui/carousel";
import SSlider from '@/components/skeleton/SliderSkeleton'
import { ChevronRight, Star } from 'lucide-react';
import { Card, CardContent } from "./ui/card";
import { useState, useEffect } from 'react';
import Link from "next/link";
import axios from 'axios';

const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

interface Movie {
    id: number;
    title: string;
    posterPath: string;
    vote_average: number;
    backdrop_path: string;
    genres?: Array<{ name: string }>;
    images?: {
        backdrops?: Array<{ file_path: string }>;
    };
}

const Slider = (props: { movieData: Movie[]; slideTitle: string; category: string; }) => {
    const { movieData, slideTitle, category } = props;
    const [detailedMovieData, setDetailedMovieData] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDetailedData = async () => {
        try {
            setIsLoading(true);
            const requests = movieData.map((movie) =>
                axios.get(`${TMDB_BASE_URL}/movie/${movie.id}`, {
                    headers: {
                        Authorization: `Bearer ${TMDB_API_TOKEN}`,
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
            console.error("Error fetching movie details", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDetailedData();
    }, [movieData]);

    return (
        <div>
            {isLoading ? (<SSlider />) :
                (<div className="w-full flex justify-center items-center">
                    <div className="w-full flex justify-start flex-col overflow-hidden">
                        <div className="flex flex-row justify-between">
                            <div className="h-6 ml-2 mb-5 flex flex-row justify-center items-center">
                                <div className="w-[2px] h-full bg-[--secondary-active]"></div>
                                <h1 className="text-xl text-[--text-color] font-semibold ml-2">{slideTitle}</h1>
                            </div>
                            <Link href={`/more/${category}/1`}>
                                <h1
                                    className="text-base text-slate-400 font-medium flex flex-row cursor-pointer mr-10">
                                    See more <ChevronRight width={18} className="ml-1" />
                                </h1>
                            </Link>
                        </div>

                        <Carousel className="w-full relative">
                            <CarouselContent className="pl-2">
                                {detailedMovieData.map((movie) => (
                                    <CarouselItem
                                        key={movie.id}
                                        className="basis-[70%] sm:basis-[50%] md:basis-[35%] lg:basis-[27%] xl:basis-[19%] ml-1 mt-2">
                                        <Link href={`/info/movie/${movie.id}`}>
                                            <Card
                                                className="bg-slate-700 aspect-[4/2] h-auto overflow-hidden cursor-pointer border border-[--main-border] bg-cover bg-center transform transition-transform duration-200 ease-in-out hover:scale-105"
                                                style={{
                                                    backgroundImage: `url(${process.env.TMDB_IMAGE_SERVICE_URL}/w780/${movie?.images?.backdrops?.[0]?.file_path || movie.backdrop_path || 'default.jpg'})`,
                                                }}>
                                                <CardContent className="card flex items-center justify-center h-48 p-6" />
                                            </Card>
                                        </Link>

                                        <div className="mt-3 flex flex-col">
                                            <p className="text-[--text-color] text-start text-lg font-medium">{movie.title}</p>
                                            <div className="flex flex-row -mt-[2px]">
                                                <p className="text-[--text-color] text-start text-sm font-medium flex flex-row items-center">
                                                    <Star className="fill-[--star-color] w-[14px] stroke-none mr-1" />{' '}
                                                    {(movie.vote_average).toFixed(1)}
                                                </p>
                                                <p className="text-slate-500 text-start text-base font-medium flex flex-row items-center ml-2">
                                                    |{' '}
                                                    <span className="ml-2 text-sm">
                                                        {movie?.genres?.[0]?.name || ''}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselNext className="mr-20 -mt-10 z-20" />
                        </Carousel>
                        <div className="absolute w-24 h-60 bg-fade-gradient-hr mt-7 right-0 z-10"></div>
                    </div>
                </div >)}
        </div >
    );
};

export default Slider;
