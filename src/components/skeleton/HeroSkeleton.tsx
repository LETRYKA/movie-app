import { Carousel, CarouselContent } from '../ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import Autoplay from "embla-carousel-autoplay";
import React from 'react'

const HeroSkeleton = () => {
    return (
        <Carousel className="relative h-[600px] sm:h-[867px]" plugins={[Autoplay({ delay: 6000 })]} >
            <div className="bg-fade-gradient-v absolute bottom-0 w-full -mt-10 h-40 z-10"></div>
            <CarouselContent className="flex">
                <div className="relative w-full pr-14 pl-0  sm:pl-14 sm:p-0 h-[600px] sm:h-[867px] bg-fixed bg-cover bg-top flex justify-center sm:justify-start items-center">
                    <div className="sm:ml-[8%] z-10 mt-36 sm:mt-16">
                        <Skeleton className="w-[60%] sm:w-96 h-32 bg-gray-700 rounded-md mb-8" />
                        <Skeleton className="w-[40%] sm:w-[100%] h-5 bg-gray-700 rounded-md" />
                        <Skeleton className="w-[40%] sm:w-[80%] h-5 mt-2 bg-gray-700 rounded-md" />
                        <Skeleton className="w-[40%] sm:w-[40%] h-5 mt-2 bg-gray-700 rounded-md" />
                        <div className="flex flex-row gap-4 mt-8">
                            <Skeleton className="w-28 h-11 bg-gray-700 rounded-md" />
                            <Skeleton className="w-28 h-11 bg-gray-700 rounded-md" />
                        </div>
                    </div>
                </div>
            </CarouselContent>
        </Carousel>
    )
}

export default HeroSkeleton