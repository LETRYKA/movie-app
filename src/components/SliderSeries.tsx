import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SliderSeriesSkeleton from "./skeleton/SliderSeriesSkeleton";
import { ChevronRight, Star, Play } from 'lucide-react';
import { Card, CardContent } from "./ui/card";
import { useState, useEffect } from 'react';
import { DataType } from "@/types/DataType";
import Link from "next/link";
import axios from 'axios';

export const SliderSeries = (props: { movieData: DataType[]; slideTitle: string; type: boolean; category: string; }) => {
    const { movieData, slideTitle, type, category } = props;
    const [detailedMovieData, setDetailedMovieData] = useState<DataType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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
            console.log(`Detailed Data:`, tvDetailedData)
        } catch (error) {
            console.error("Error fetching TV series details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const releaseDate = (tv: DataType) => {
        const get = tv.last_air_date;
        const response = get?.toString().split('-', 1);
        return response ? response[0] : "";
    }

    useEffect(() => {
        fetchDetailedData();
    }, [movieData]);

    return (
        <div>
            {isLoading ? (<SliderSeriesSkeleton type={type} />) :
                (<div className="w-full flex justify-center items-center overflow-hidden">
                    <div className="w-full flex justify-start flex-col overflow-hidden">
                        <div className="flex flex-row justify-between">
                            <div className="h-6 ml-2 mb-3 flex flex-row justify-center items-center">
                                <div className="w-[2px] h-full bg-[--secondary-active]"></div>
                                <h1 className="text-xl text-[--text-color] font-semibold ml-2">{slideTitle}</h1>
                            </div>
                            <Link href={`/more/series/${category}/1`}>
                                <h1
                                    className="text-base text-slate-400 font-medium flex flex-row cursor-pointer mr-10">
                                    See more <ChevronRight width={18} className="ml-1" />
                                </h1>
                            </Link>
                        </div>
                        <Carousel className="w-full relative [mask-image:linear-gradient(to_right,#000_85%,transparent_100%)]">
                            <CarouselContent className='pl-2 pt-2'>
                                {detailedMovieData.map((tv) => (
                                    <CarouselItem key={tv.id} className={`${type ? 'basis-[70%]' : 'basis-[40%]'} ${type ? 'sm:basis-[50%]' : 'sm:basis-[28%]'} ${type ? 'md:basis-[35%]' : 'md:basis-[23%]'} ${type ? 'lg:basis-[27%]' : 'lg:basis-[18%]'} ${type ? 'xl:basis-[19%]' : 'xl:basis-[13%]'}`}>
                                        <div className="p-1">
                                            <Link href={`/info/series/${tv.id}`}>
                                                <Card className={`${type ? ('h-auto') : ('h-auto')} ${type ? 'aspect-[4/2]' : 'aspect-[7/10]'} bg-slate-700 overflow-hidden cursor-pointer border border-[--main-border] bg-cover bg-center transform transition-transform duration-200 ease-in-out hover:scale-105`} style={{ backgroundImage: type ? `url(${process.env.TMDB_IMAGE_SERVICE_URL}/w780/${tv?.images?.backdrops?.[0]?.file_path || tv?.backdrop_path})` : `url(${process.env.TMDB_IMAGE_SERVICE_URL}/w780/${tv?.images?.posters?.[0]?.file_path || tv?.backdrop_path})` }} >
                                                    <CardContent className="card flex relative items-center justify-center h-full">
                                                        {type && (
                                                            <div className="absolute inset-0 w-full h-full flex overflow-hidden group">
                                                                <div className="w-full h-full flex justify-center transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 bg-fade-gradient-black z-0 -mb-2">
                                                                    <div className="absolute bottom-0 w-full flex flex-col justify-center items-center p-3">
                                                                        <p className="text-[--text-color] text-start text-lg font-bold flex flex-row items-center -mb-1 z-10">
                                                                            {tv.name}
                                                                        </p>
                                                                        <p className="text-slate-300 text-start text-xs font-medium flex flex-row items-center mb-0 z-10">
                                                                            {tv.number_of_episodes} EP | {releaseDate(tv)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                            {!type && <div className='mt-3 flex flex-col'>
                                                <p className="text-[--text-color] text-start text-lg font-medium">
                                                    {tv.name}
                                                </p>
                                                <div className='flex flex-row -mt-[2px]'>
                                                    <p className="text-[--text-color] text-start text-sm font-medium flex flex-row items-center ">
                                                        <Star className='fill-[--star-color] stroke-none w-[14px] mr-[4px]' /> {(tv.vote_average).toFixed(1)}
                                                    </p>
                                                    <p className="text-slate-500  text-start text-base font-medium flex flex-row items-center ml-2">
                                                        | <span className='ml-2 text-sm'>{tv?.genres?.[0]?.name}</span>
                                                    </p>
                                                </div>
                                            </div>}
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselNext className="mr-14 sm:mr-20 -mt-10 sm:-mt-14 md:-mt-20 lg:-mt-10 xl:-mt-5 z-20" />
                        </Carousel>
                    </div>
                </div>)}
        </div>
    );
};