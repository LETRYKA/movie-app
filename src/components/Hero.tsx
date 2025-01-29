import { Button } from "@/components/ui/button"
import { Play, Info } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Hero = (props: { movieData: []; }) => {
    const { movieData } = props;

    const firstMovie = movieData[0];
    const secondMovie = movieData[1];

    return (
        <Carousel className="relative h-[600px] sm:h-[967px]">
            <div className="bg-fade-gradient-v absolute bottom-0 w-full -mt-10 h-40 z-10"></div>
            <CarouselContent className="flex">
                <CarouselItem className="m-0 p-0">
                    <div className="relative w-full pr-14 pl-14 sm:p-0 h-[600px] sm:h-[967px] bg-[url(/imgs/cover.jpg)] bg-cover bg-top flex justify-center sm:justify-start items-center">
                        <div className="sm:ml-[8%] z-10 mt-36 sm:mt-16">
                            <img src="/imgs/title.png" className="w-[70%] -mt-4 sm:w-[23%]" />
                            <p className="text-sm sm:text-base text-white w-full sm:w-[40%]">{firstMovie?.overview}</p>
                            <div className="flex flex-row gap-4 mt-8">
                                <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[#1A1D29] flex items-center"><Play className="fill-[#1A1D29]" />Play</Button>
                                <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[white] flex items-center bg-transparent hover:bg-[black]/40 hover:text-[white]"><Info className="stroke-[white]" />About more</Button>
                            </div>
                        </div>
                        <div className="absolute w-full h-full bg-custom-gradient z-0"></div>
                    </div>
                </CarouselItem>
                <CarouselItem className="m-0 p-0">
                    <div className="relative w-full pr-14 pl-14 sm:p-0 h-[600px] sm:h-[967px] bg-[url(/imgs/cover.jpg)] bg-cover bg-top flex justify-center sm:justify-start items-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${firstMovie?.backdrop_path})` }}>
                        <div className="sm:ml-[8%] z-10 mt-36 sm:mt-16">
                            <img src={`https://image.tmdb.org/t/p/w500/qmVvIjoREyAyiPqk321qJV7oNbD.png`} className="w-[60%] mb-8 sm:w-[23%]" />
                            <p className="text-sm sm:text-base text-white w-full sm:w-[40%]">{firstMovie?.overview}</p>
                            <div className="flex flex-row gap-4 mt-8">
                                <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[#1A1D29] flex items-center"><Play className="fill-[#1A1D29]" />Play</Button>
                                <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[white] flex items-center bg-transparent hover:bg-[black]/40 hover:text-[white]"><Info className="stroke-[white]" />About more</Button>
                            </div>
                        </div>
                        <div className="absolute w-full h-full bg-custom-gradient z-0"></div>
                    </div>
                </CarouselItem>
                <CarouselItem className="m-0 p-0">
                    <div className="relative w-full pr-14 pl-14 sm:p-0 h-[600px] sm:h-[967px] bg-[url(/imgs/cover.jpg)] bg-cover bg-top flex justify-center sm:justify-start items-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${secondMovie?.backdrop_path})` }}>
                        <div className="sm:ml-[8%] z-10 mt-36 sm:mt-16">
                            <img src={`https://image.tmdb.org/t/p/w500/wEuiG5gakvzTthDVz0X5gfEz7T1.png`} className="w-[60%] mb-8 sm:w-[23%]" />
                            <p className="text-sm sm:text-base text-white w-full sm:w-[40%]">{secondMovie?.overview}</p>
                            <div className="flex flex-row gap-4 mt-8">
                                <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[#1A1D29] flex items-center"><Play className="fill-[#1A1D29]" />Play</Button>
                                <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[white] flex items-center bg-transparent hover:bg-[black]/40 hover:text-[white]"><Info className="stroke-[white]" />About more</Button>
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