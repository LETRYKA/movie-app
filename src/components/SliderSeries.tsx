import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChevronRight, Star, Play } from 'lucide-react';
import { Card, CardContent } from "./ui/card";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
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
}

const SliderSeries = (props: { movieData: Movie[]; slideTitle: string; }) => {
    const { movieData, slideTitle, type } = props;
    const [detailedMovieData, setDetailedMovieData] = useState<[{}]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const fetchDetailedData = async () => {
        try {
            setIsLoading(true);

            const requests = movieData.map((tv) =>
                axios.get(`${process.env.TMDB_BASE_URL}/${tv.media_type === 'movie' ? 'movie' : 'tv'}/${tv.id}`, {
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
            const tvDetailedData = responses.map((res) => res.data);
            setDetailedMovieData(tvDetailedData);
            console.log(`SDARA`, tvDetailedData)
        } catch (error) {
            console.error("Error fetching TV series details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const releaseDate = (tv) => {
        const get = tv.last_air_date
        const response = get?.split('-', 1)
        return response;
    }

    useEffect(() => {
        fetchDetailedData();
    }, [movieData]);

    return (
        <div>
            <div className="w-full flex justify-center items-center pb-5 overflow-hidden">
                <div className="w-full flex justify-start flex-col overflow-hidden ml-[5.5%]">
                    <div className="flex flex-row justify-between">
                        <div className="h-6 ml-2 mb-3 flex flex-row justify-center items-center">
                            <div className="w-[2px] h-full bg-red-500"></div>
                            <h1 className="text-xl text-white font-semibold ml-2">{slideTitle}</h1>
                        </div>
                        <h1 className="text-base text-slate-400 font-medium flex flex-row cursor-pointer mr-10">See more <ChevronRight width={18} className="ml-1" /></h1>
                    </div>
                    <Carousel className="w-full relative">
                        <CarouselContent className='pl-2 pt-2'>
                            {detailedMovieData.map((tv) => (
                                <CarouselItem key={tv.id} onClick={() => router.push(`/info/series/${tv.id}`)} className={`${type ? 'basis-[80%]' : 'basis-[36%]'} ${type ? 'sm:basis-[50%]' : 'sm:basis-[23%]'} ${type ? 'md:basis-[35%]' : 'md:basis-[23%]'} ${type ? 'lg:basis-[27%]' : 'lg:basis-[18%]'} ${type ? 'xl:basis-[19%]' : 'xl:basis-[13%]'}`}>
                                    <div className="p-1">
                                        <Card className={`${type ? ('h-auto') : ('h-auto')} ${type ? 'aspect-[4/2]' : 'aspect-[7/10]'} overflow-hidden cursor-pointer border border-[#353843] bg-cover bg-center transform transition-transform duration-300 ease-in-out hover:scale-105`} style={{ backgroundImage: type ? `url(https://image.tmdb.org/t/p/w780/${tv?.images?.backdrops?.[0]?.file_path})` : `url(https://image.tmdb.org/t/p/w780/${tv?.images?.posters?.[0]?.file_path})` }} >
                                            <CardContent className="card flex relative items-center justify-center h-48">
                                                {type && <div className="absolute w-full h-full flex flex-col justify-center items-center overflow-hidden group">
                                                    <div className="absolute w-full h-full flex justify-center transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 bg-fade-gradient-black z-0 -mb-3">
                                                        <div className="absolute bottom-3 flex flex-col justify-center items-center">
                                                            <p className="text-white text-start text-lg font-bold flex flex-row items-center -mb-1 z-10">
                                                                {tv.name}
                                                            </p>
                                                            <p className="text-slate-300 text-start text-xs font-medium flex flex-row items-center mb-10 z-10">
                                                                {tv.number_of_episodes} EP | {releaseDate(tv)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>}
                                            </CardContent>
                                        </Card>
                                        {!type && <div className='mt-3 flex flex-col'>
                                            <p className="text-white text-start text-lg font-medium">
                                                {tv.name}
                                            </p>
                                            <div className='flex flex-row -mt-[2px]'>
                                                <p className="text-white text-start text-sm font-medium flex flex-row items-center ">
                                                    <Star className='fill-[#f5c518] stroke-none w-[14px] mr-[4px]' /> {(tv.vote_average).toFixed(1)}
                                                </p>
                                                <p className="text-slate-500 text-start text-base font-medium flex flex-row items-center ml-2">
                                                    | <span className='ml-2 text-sm'>{tv?.genres?.[0]?.name}</span>
                                                </p>
                                            </div>
                                        </div>}
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselNext className="mr-14 sm:mr-20 -mt-5 z-20" />
                    </Carousel>
                    <div className={`hidden sm:flex absolute w-24 ${type ? 'h-[16%]' : 'h-[30%]'} bg-fade-gradient-hr mt-11 sm:mr-0 right-0 z-10`}></div>
                </div>
            </div>
        </div >
    );

};

export default SliderSeries;