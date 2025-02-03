import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Card, CardContent } from '../ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext } from '../ui/carousel'

const EpisodesSkeleton = () => {
    return (
        <div className="relative w-full flex justify-center items-center mb-20 px-8 sm:px-10 lg:px-24 bg-[#1b1d29] z-20">
            <Tabs defaultValue="season-1" className="w-full">
                <TabsList className="ml-2 mb-2 text-white">
                    <TabsTrigger value='#'>
                        <Skeleton className="w-[120px] h-6 bg-gray-700 rounded-md" />
                    </TabsTrigger>
                </TabsList>

                {Array(3).fill('').map((_, index) => (
                    <TabsContent key={index} value={`season-${index + 1}`}>
                        <Card className="bg-transparent border-0 w-full shadow-none">
                            <CardContent className="p-0">
                                <Carousel className="w-full max-w-full">
                                    <CarouselContent className="-ml-1">
                                        {Array(5).fill('').map((_, idx) => (
                                            <CarouselItem key={idx} className="sm:basis-[56%] md:basis-[35%] lg:basis-[27%] xl:basis-[23%] pl-2">
                                                <div className="p-1">
                                                    <Skeleton className="bg-slate-700 w-full h-auto flex justify-center items-center aspect-[4/2] bg-cover bg-center cursor-pointer">
                                                        <CardContent className="flex items-center justify-center p-6 relative w-full h-full">
                                                            <Skeleton className="w-8 h-8 bg-white rounded-full" />
                                                        </CardContent>
                                                    </Skeleton>
                                                    <div className="mt-2 flex flex-col">
                                                        <Skeleton className="w-1/2 h-6 bg-gray-700 rounded-md" />
                                                        <Skeleton className="w-1/4 h-4 bg-gray-600 rounded-md mt-2" />
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

export default EpisodesSkeleton