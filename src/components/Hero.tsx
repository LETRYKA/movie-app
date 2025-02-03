import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { MovieDetailType } from '@/types/MovieDetailType';
import { Skeleton } from "@/components/ui/skeleton";
import HeroSkeleton from "./skeleton/HeroSkeleton";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Info } from 'lucide-react';
import axios from 'axios';

const Hero = (props: { movieData: Movie[] }) => {
    const [detailedMovieData, setDetailedMovieData] = useState<MovieDetailType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { movieData } = props;
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
            const movies = responses.map((res) => res.data);
            setDetailedMovieData(movies);
        } catch (error) {
            console.error("Error fetching detailed data", error);
        } finally {
            setIsLoading(false);
        }
    };


    console.log(`LOADING TEST`, isLoading)

    useEffect(() => {
        fetchDetailedData();
    }, [movieData]);


    return (
        <div>
            {isLoading ? (<HeroSkeleton />) :
                (<Carousel className="relative h-[600px] sm:h-[867px]" plugins={[Autoplay({ delay: 6000 })]}>
                    <div className="bg-fade-gradient-v absolute bottom-0 w-full -mt-10 h-40 z-10"></div>
                    <CarouselContent className="flex">
                        {isLoading ? (
                            <div className="flex flex-col gap-2">
                                <Skeleton className="w-full h-[60%] sm:h-[80%] bg-gray-700 rounded-md" />
                                <Skeleton className="w-full h-[20%] sm:h-[10%] bg-gray-700 rounded-md" />
                            </div>
                        ) : (
                            detailedMovieData.slice(13, 17).map((movie, i) => (
                                <CarouselItem key={i} className="m-0 p-0">
                                    <div className="relative w-full pr-14 pl-14 sm:p-0 h-[600px] sm:h-[867px] bg-fixed bg-cover bg-top flex justify-center sm:justify-start items-center"
                                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path || '/default.jpg'})`, }}>
                                        <div className="sm:ml-[8%] z-10 mt-36 sm:mt-16">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w780/${movie?.images?.logos?.[0]?.file_path || movie?.backdrop_path}`}
                                                alt={`${movie?.title || 'Movie'} logo`}
                                                className="w-[60%] mb-8 sm:w-96" />
                                            <p className="text-sm sm:text-base text-white w-full sm:w-[40%]">{movie?.overview || 'No overview available'}</p>
                                            <div className="flex flex-row gap-4 mt-8">
                                                <Button
                                                    onClick={() => router.push(`/watch/movie/${movie.id}`)}
                                                    variant="outline"
                                                    className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[#1A1D29] flex items-center">
                                                    <Play className="fill-[#1A1D29]" />PLAY
                                                </Button>
                                                <Button
                                                    onClick={() => router.push(`/info/movie/${movie.id}`)}
                                                    variant="outline"
                                                    className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[white] flex items-center bg-transparent hover:bg-[black]/40 hover:text-[white]">
                                                    <Info className="stroke-[white]" />INFO
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="absolute w-full h-full bg-custom-gradient z-0"></div>
                                    </div>
                                </CarouselItem>
                            ))
                        )}
                    </CarouselContent>
                </Carousel>)}
        </div>
    );
};

export default Hero;
