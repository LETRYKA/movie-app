import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Carousel, CarouselContent, CarouselItem, CarouselNext } from '../ui/carousel'
import { ChevronRight } from 'lucide-react'

const SliderSeriesSkeleton = (props: any) => {
    const { type } = props;
    return (
        <div className="w-full flex justify-center items-center pb-5 overflow-hidden">
            <div className="w-full flex justify-start flex-col overflow-hidden ml-[5.5%]">
                <div className="flex flex-row justify-between">
                    <Skeleton className="text-xl bg-gray-700 w-28 h-8 font-bold mb-5 ml-3"></Skeleton>
                    <h1 className="text-base text-slate-400 font-medium flex flex-row cursor-pointer mr-10">
                        See more <ChevronRight width={18} className="ml-1" />
                    </h1>
                </div>
                <Carousel className="w-full relative">
                    <CarouselContent className="pl-2 pt-2">
                        {Array(10).fill().map((_, index) => (
                            <CarouselItem key={index} className={`${type ? 'basis-[80%]' : 'basis-[36%]'} ${type ? 'sm:basis-[50%]' : 'sm:basis-[23%]'} ${type ? 'md:basis-[35%]' : 'md:basis-[23%]'} ${type ? 'lg:basis-[27%]' : 'lg:basis-[18%]'} ${type ? 'xl:basis-[19%]' : 'xl:basis-[13%]'}`}>
                                <div className="p-1">
                                    <Skeleton className={`${type ? 'aspect-[4/2]' : 'aspect-[7/10]'} w-full bg-gray-700 rounded-md`} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext className="mr-14 sm:mr-20 -mt-5 z-20" />
                </Carousel>
            </div>
        </div>
    )
}

export default SliderSeriesSkeleton