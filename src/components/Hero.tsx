import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MovieDetailType } from '@/types/MovieDetailType';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Info } from 'lucide-react';
import YouTube from "react-youtube";
import axios from 'axios';

const Hero = (props: { movieData: Movie[] }) => {
    const { movieData } = props;
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [detailedMovieData, setDetailedMovieData] = useState<MovieDetailType>([]);

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
            console.log(`TEST`, movies)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDetailedData();
    }, [movieData]);

    const firstMovie = detailedMovieData[0];
    const secondMovie = detailedMovieData[1];


    return (
        <Carousel className="relative h-[600px] sm:h-[867px]" plugins={[
            Autoplay({
                delay: 6000,
            }),
        ]}>
            <div className="bg-fade-gradient-v absolute bottom-0 w-full -mt-10 h-40 z-10"></div>
            <CarouselContent className="flex">
                <CarouselItem className="m-0 p-0">
                    <div className="relative w-full pr-14 pl-14 sm:p-0 h-[600px] sm:h-[867px] bg-[url(/imgs/cover.jpg)] bg-cover bg-top flex justify-center sm:justify-start items-center">
                        {/* <div className="absolute relative w-screen h-screen inset-0 bg-red-800 flex justify-center items-center border">
                            <YouTube
                                videoId={detailedMovieData?.[19]?.videos?.results?.[0]?.key}
                                className='absolute inset-0 w-screen h-[150%] border-none -top-20'
                                opts={{
                                    width: "100%",
                                    height: "100%",
                                    playerVars: {
                                        autoplay: 1,
                                        controls: 0,
                                        mute: 1,
                                        loop: 1,
                                        vq: 'large',
                                    }
                                }}
                            />
                        </div> */}
                        <div className="sm:ml-[8%] z-10 mt-36 sm:mt-16">
                            <img src="/imgs/title.png" className="w-[70%] -mt-4 sm:w-96" />
                            <div className="text-sm sm:text-base text-white w-full sm:w-[40%]">
                                {isLoading ? (<div className='flex flex-col gap-2'> <Skeleton className="w-full h-5 sm:h-6 bg-gray-700 rounded-md" /> <Skeleton className="w-full h-5 sm:h-6 bg-gray-700 rounded-md" /> <Skeleton className="w-full h-5 sm:h-6 bg-gray-700 rounded-md" /></div>) :
                                    (firstMovie?.overview)}
                            </div>
                            <div className="flex flex-row gap-4 mt-8">
                                <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[#1A1D29] flex items-center"><Play className="fill-[#1A1D29]" />PLAY</Button>
                                <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[white] flex items-center bg-transparent hover:bg-[black]/40 hover:text-[white]"><Info className="stroke-[white]" />INFO</Button>
                            </div>
                        </div>
                        <div className="absolute w-full h-full bg-custom-gradient z-0"></div>
                    </div>
                </CarouselItem>
                <CarouselItem className="m-0 p-0">
                    <div className="relative w-full pr-14 pl-14 sm:p-0 h-[600px] sm:h-[867px] bg-[url(/imgs/cover.jpg)] bg-cover bg-top flex justify-center sm:justify-start items-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${firstMovie?.backdrop_path})` }}>
                        <div className="sm:ml-[8%] z-10 mt-36 sm:mt-16">
                            <img src={`https://image.tmdb.org/t/p/w780/${firstMovie?.images?.logos?.[0]?.file_path}`} className="w-[60%] mb-8 sm:w-96" />
                            <p className="text-sm sm:text-base text-white w-full sm:w-[40%]">{firstMovie?.overview}</p>
                            <div className="flex flex-row gap-4 mt-8">
                                <Button onClick={() => router.push(`/watch/${firstMovie.id}`)} variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[#1A1D29] flex items-center"><Play className="fill-[#1A1D29]" />PLAY</Button>
                                <Button onClick={() => router.push(`/info/movie/${firstMovie.id}`)} variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[white] flex items-center bg-transparent hover:bg-[black]/40 hover:text-[white]"><Info className="stroke-[white]" />INFO</Button>
                            </div>
                        </div>
                        <div className="absolute w-full h-full bg-custom-gradient z-0"></div>
                    </div>
                </CarouselItem>
                <CarouselItem className="m-0 p-0">
                    <div className="relative w-full pr-14 pl-14 sm:p-0 h-[600px] sm:h-[867px] bg-[url(/imgs/cover.jpg)] bg-cover bg-top flex justify-center sm:justify-start items-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${secondMovie?.backdrop_path})` }}>
                        <div className="sm:ml-[8%] z-10 mt-36 sm:mt-16">
                            <img src={`https://image.tmdb.org/t/p/w780/${secondMovie?.images?.logos?.[0]?.file_path}`} className="w-[60%] mb-8 sm:w-96" />
                            <p className="text-sm sm:text-base text-white w-full sm:w-[40%]">{secondMovie?.overview}</p>
                            <div className="flex flex-row gap-4 mt-8">
                                <Button onClick={() => router.push(`/watch/${secondMovie.id}`)} variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[#1A1D29] flex items-center"><Play className="fill-[#1A1D29]" />PLAY</Button>
                                <Button onClick={() => router.push(`/info/movie/${secondMovie.id}`)} variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[white] flex items-center bg-transparent hover:bg-[black]/40 hover:text-[white]"><Info className="stroke-[white]" />INFO</Button>
                            </div>
                        </div>
                        <div className="absolute w-full h-full bg-custom-gradient z-0"></div>
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    );

};

export default Hero;