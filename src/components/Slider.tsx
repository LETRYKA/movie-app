import { Button } from "@/components/ui/button"
import { Play, Info, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";

const Slider = (props: any) => {
    const { } = props;

    return (
        <div>
            < div className="w-full flex justify-center items-center pb-20" >
                <div className="w-full flex justify-start flex-col overflow-hidden ml-20">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-xl text-white font-bold mb-5">Popular Movies</h1>
                        <h1 className="text-base text-slate-400 font-medium flex flex-row cursor-pointer mr-10">See more <ChevronRight width={18} className="ml-1" /></h1>
                    </div>
                    <Carousel className="w-full relative">
                        <CarouselContent className="-ml-1">
                            {Array.from({ length: 10 }).map((_, index) => (
                                <CarouselItem key={index} className="pl-1 md:basis-1/5 lg:basis-1/5">
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex items-center justify-center h-48 p-6">
                                                <span className="text-2xl font-semibold">{index + 1}</span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselNext className="mr-20 z-20" />
                    </Carousel>
                    <div className="absolute w-60 h-60 bg-fade-gradient-hr mt-7 -mr-8 right-0 z-10"></div>
                </div>
            </div >
        </div>
    );

};

export default Slider;