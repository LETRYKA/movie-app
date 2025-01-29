import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Play, Info } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";


interface Movie {
    id: number;
    title: string;
    posterPath: string;
    vote_average: number;
    overview: string;
    backdrop_path: string;
}

const Hero = (props: { movieData: Movie[] }) => {
    const { movieData, setIsLoading, isLoading } = props;

    const [detailedMovieData, setDetailedMovieData] = useState([]);

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
        <Carousel className="relative h-[600px] sm:h-[867px]">
            <div className="bg-fade-gradient-v absolute bottom-0 w-full -mt-10 h-40 z-10"></div>
            <CarouselContent className="flex">
                <CarouselItem className="m-0 p-0">
                    <div className="relative w-full pr-14 pl-14 sm:p-0 h-[600px] sm:h-[867px] bg-[url(/imgs/cover.jpg)] bg-cover bg-top flex justify-center sm:justify-start items-center">
                        <div className="sm:ml-[8%] z-10 mt-36 sm:mt-16">
                            <img src="/imgs/title.png" className="w-[70%] -mt-4 sm:w-[23%]" />
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
                    <div className="relative w-full pr-14 pl-14 sm:p-0 h-[600px] sm:h-[967px] bg-[url(/imgs/cover.jpg)] bg-cover bg-top flex justify-center sm:justify-start items-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${firstMovie?.backdrop_path})` }}>
                        <div className="sm:ml-[8%] z-10 mt-36 sm:mt-16">
                            <img src={`https://image.tmdb.org/t/p/w780/${firstMovie?.images?.logos?.[0]?.file_path}`} className="w-[60%] mb-8 sm:w-[23%]" />
                            <p className="text-sm sm:text-base text-white w-full sm:w-[40%]">{firstMovie?.overview}</p>
                            <div className="flex flex-row gap-4 mt-8">
                                <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[#1A1D29] flex items-center"><Play className="fill-[#1A1D29]" />PLAY</Button>
                                <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[white] flex items-center bg-transparent hover:bg-[black]/40 hover:text-[white]"><Info className="stroke-[white]" />INFO</Button>
                            </div>
                        </div>
                        <div className="absolute w-full h-full bg-custom-gradient z-0"></div>
                    </div>
                </CarouselItem>
                <CarouselItem className="m-0 p-0">
                    <div className="relative w-full pr-14 pl-14 sm:p-0 h-[600px] sm:h-[967px] bg-[url(/imgs/cover.jpg)] bg-cover bg-top flex justify-center sm:justify-start items-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${secondMovie?.backdrop_path})` }}>
                        <div className="sm:ml-[8%] z-10 mt-36 sm:mt-16">
                            <img src={`https://image.tmdb.org/t/p/w780/${secondMovie?.images?.logos?.[0]?.file_path}`} className="w-[60%] mb-8 sm:w-[23%]" />
                            <p className="text-sm sm:text-base text-white w-full sm:w-[40%]">{secondMovie?.overview}</p>
                            <div className="flex flex-row gap-4 mt-8">
                                <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[#1A1D29] flex items-center"><Play className="fill-[#1A1D29]" />PLAY</Button>
                                <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[white] flex items-center bg-transparent hover:bg-[black]/40 hover:text-[white]"><Info className="stroke-[white]" />INFO</Button>
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