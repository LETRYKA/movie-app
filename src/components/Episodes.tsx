"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import router, { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { Play } from 'lucide-react'
import axios from 'axios';
import React from 'react'

const Episodes = (props: any) => {
    const { seriesData } = props;
    const [episodesData, setEpisodesData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const fetchInfo = async () => {
        try {
            setIsLoading(true);

            // Fetch Episode from all Seasons
            const seasonsData = await Promise.all(
                seriesData.seasons.map(async (season) => {
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
            setEpisodesData(seasonsData)
            console.log("EPISODE DATA", seasonsData)

        } catch (err) {
            setIsLoading(false);
            setErrorMessage("Failed to fetch movie details.");
            console.error(err);
        }
    };

    useEffect(() => {
        if (seriesData) {
            fetchInfo();
        }
    }, [seriesData]);

    return (
        <div className='relative w-full flex justify-center items-center mb-20 px-8 sm:px-10 lg:px-24 bg-[#1b1d29] z-20'>
            <Tabs defaultValue="season-1" className="w-full">
                {episodesData.map((season, index) => (
                    <TabsList key={season._id} className="ml-2 mb-2 bg-[#101116] text-white">
                        <TabsTrigger value={`season-${season.season_number}`} className="">
                            {season.name || `Season ${season.season_number}`}
                        </TabsTrigger>
                    </TabsList>
                ))}
                {episodesData.map((season, index) => (
                    <TabsContent key={season._id} value={`season-${season.season_number}`}>
                        <Card className="bg-transparent border-0 w-full shadow-none">
                            <CardContent className="p-0">
                                <Carousel className="w-full max-w-full">
                                    <CarouselContent className="-ml-1">
                                        {season.episodes.map((episode, episodeIndex) => (
                                            <CarouselItem key={episode.id} className="sm:basis-[56%] md:basis-[35%] lg:basis-[27%] xl:basis-[23%] pl-2">
                                                <div className="p-1">
                                                    <Card onClick={() => router.push(`/watch/series/${seriesData.id}/${season.season_number}/${episode.episode_number}`)}
                                                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${episode?.still_path})` }} className="bg-slate-700 group transform-transition duration-300 ease-in-out hover:scale-105 w-full h-auto flex justify-center items-center aspect-[4/2] bg-cover bg-center border-[#353843] cursor-pointer">
                                                        <CardContent className="flex items-center justify-center p-6 relative w-full h-full">
                                                            <Play strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-310 ease-in-out stroke-none fill-white w-8 h-8 opacity-0 group-hover:opacity-100" />
                                                            <p className="absolute right-4 bottom-3 text-white text-sm font-medium bg-black/40 rounded-lg py-1 px-2">{episode.runtime} min</p>
                                                        </CardContent>
                                                    </Card>
                                                    <div className='mt-2 flex flex-col'>
                                                        <p className="text-white text-start text-base font-bold">
                                                            Episode {episode.episode_number}
                                                        </p>
                                                        <div className='flex flex-row'>
                                                            <p className="text-slate-500 text-start text-sm font-medium flex flex-row items-center ">
                                                                {(episode.name)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <div className="absolute w-28 h-60 bg-fade-gradient-hr right-0 -top-5 z-10"></div>
                                    <CarouselNext />
                                </Carousel>
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

export default Episodes