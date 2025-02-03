import { Carousel, CarouselContent, CarouselItem, CarouselNext } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

interface Movie {
    id: number;
}

const SliderSkeleton = (props: { movieData: Movie[]; slideTitle: string; }) => {
    const { movieData, slideTitle } = props;

    return (
        <div>
            <div className="w-full flex justify-center items-center pb-5">
                <div className="w-full flex justify-start flex-col overflow-hidden ml-[5.5%]">
                    <div className="flex flex-row justify-between">
                        <Skeleton className="text-xl bg-gray-700 w-28 h-8 font-bold mb-5 ml-3"></Skeleton>
                        <h1 className="text-base text-slate-400 font-medium flex flex-row cursor-pointer mr-10">
                            See more
                        </h1>
                    </div>
                    <Carousel className="w-full relative">
                        <CarouselContent className='pl-2'>
                            {movieData.map((movie) => (
                                <CarouselItem key={movie.id} className="basis-[80%] sm:basis-[50%] md:basis-[35%] lg:basis-[27%] xl:basis-[19%]">
                                    <div className="p-1">
                                        <Skeleton className="aspect-[4/2] h-auto w-full bg-gray-700 rounded-lg" />
                                        <div className="mt-3 flex flex-col">
                                            <Skeleton className="w-[70%] h-4 sm:h-5 bg-gray-700 rounded-md" />
                                            <Skeleton className="w-[30%] h-2 sm:h-3 bg-gray-700 mt-2 rounded-sm" />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselNext className="mr-20 -mt-10 z-20" />
                    </Carousel>
                    <div className="absolute w-60 h-60 bg-fade-gradient-hr mt-7 right-0 z-10"></div>
                </div>
            </div>
        </div>
    );
};

const array = Array.from({ length: 10 }, (_, index) => ({ id: index + 1 }));

export default function Page() {
    return (
        <SliderSkeleton movieData={array} slideTitle="Top Movies" />
    );
}
