"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EpisodesSkeleton from "./skeleton/EpisodesSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { DataType } from "@/types/DataType";
import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import Link from "next/link";
import axios from 'axios';


export const Episodes = (props: { seriesData: DataType }) => {
    const { seriesData } = props;
    const [episodesData, setEpisodesData] = useState<DataType[]>([]);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchInfo = async () => {
        try {
            setIsLoading(true);
            const seasonsData = await Promise.all(
                seriesData.seasons.map(async (season: any) => {
                    const seasonResponse = await axios.get(
                        `${process.env.TMDB_BASE_URL}/tv/${seriesData.id}/season/${season.season_number}`,
                        {
                            headers: {
                                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                            },
                            params: { language: "en-US" },
                        }
                    );
                    return seasonResponse.data;
                })
            );
            seriesData.seasonsDetails = seasonsData;
            setEpisodesData(seasonsData);
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false);
            setErrorMessage("Failed to fetch movie details.");
            console.error(err);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640);
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (seriesData) {
            fetchInfo();
        }
    }, [seriesData]);

    return (
        <div>
            {isLoading ? (<EpisodesSkeleton />) :
                (<div className="relative w-full flex justify-center items-center mb-20 px-8 sm:pl-10 lg:pl-24 z-20">
                    <Tabs defaultValue="season-1" className="w-full">
                        {episodesData.map((season, index) => (
                            <TabsList key={season._id} className="ml-2 mb-2 bg-[--darker-background] text-white">
                                <TabsTrigger value={`season-${season.season_number}`} className="data-[state='active']:bg-[#FFFFFF]">
                                    {season.name || `Season ${season.season_number}`}
                                </TabsTrigger>
                            </TabsList>
                        ))}

                        {episodesData.map((season, index) => (
                            <TabsContent key={season.id} value={`season-${season.season_number}`} className="w-full">
                                <Card className="bg-transparent border-0 w-full shadow-none">
                                    <CardContent className="p-0">
                                        <Carousel orientation={`${isSmallScreen ? 'vertical' : 'horizontal'}`} className={`w-full max-w-full ${isSmallScreen ? `[mask-image:linear-gradient(to_bottom,#000_85%,transparent_100%)]` : `[mask-image:linear-gradient(to_right,#000_85%,transparent_100%)]`}`}>
                                            <CarouselContent className={`-ml-1 pt-10 sm:pt-0 ${isSmallScreen ? 'h-[1000px]' : 'h-auto'}`} >
                                                {season.episodes.map((episode) => (
                                                    <CarouselItem key={episode.id} className="pt-1 basis-1/5 sm:basis-[56%] md:basis-[35%] lg:basis-[27%] xl:basis-[23%] pl-2">
                                                        <div className="p-1 sm:pt-2">
                                                            <Link href={`/watch/series/${seriesData.id}/${season.season_number}/${episode.episode_number}`}>
                                                                <Card
                                                                    style={{
                                                                        backgroundImage: `url(${process.env.TMDB_IMAGE_SERVICE_URL}/original${episode?.still_path})`,
                                                                    }}
                                                                    className="mt-0 sm:mt-2 bg-slate-700 group transform-transition duration-300 ease-in-out hover:scale-105 w-full h-auto flex justify-center items-center aspect-[4/2] bg-cover bg-center border-[--main-border] cursor-pointer">
                                                                    <CardContent className="flex items-center justify-center p-6 relative w-full h-full">
                                                                        <Play strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-310 ease-in-out stroke-none fill-white w-8 h-8 opacity-0 group-hover:opacity-100" />
                                                                        <p className="absolute right-4 bottom-3 text-white text-sm font-medium bg-black/40 rounded-lg py-1 px-2">
                                                                            {episode.runtime} min
                                                                        </p>
                                                                    </CardContent>
                                                                </Card>
                                                            </Link>
                                                            <div className="mt-2 flex flex-col">
                                                                <p className="text-white text-start text-base font-bold">
                                                                    Episode {episode.episode_number}
                                                                </p>
                                                                <div className="flex flex-row">
                                                                    <p className="text-slate-500 text-start text-sm font-medium flex flex-row items-center">
                                                                        {episode.name}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                            <CarouselNext className="mr-24" />
                                        </Carousel>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>)
            }
        </div >
    );
};
