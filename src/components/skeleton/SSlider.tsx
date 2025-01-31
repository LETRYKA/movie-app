import { Carousel, CarouselContent, CarouselItem, CarouselNext } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

interface Movie {
    id: number;
}

const SSlide = (props: { movieData: Movie[]; slideTitle: string; }) => {
    const { movieData, slideTitle } = props;

    return (
        <div>
            <div className="w-full flex justify-center items-center pb-5">
                <div className="w-full flex justify-start flex-col overflow-hidden ml-[5.5%]">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-xl text-white font-bold mb-5 pl-2">{slideTitle}</h1>
                        <h1 className="text-base text-slate-400 font-medium flex flex-row cursor-pointer mr-10">
                            See more
                        </h1>
                    </div>
                    <Carousel className="w-full relative">
                        <CarouselContent className='pl-2'>
                            {movieData.map((movie) => (
                                <CarouselItem key={movie.id} className="basis-4/12 md:basis-2/5 lg:basis-1/6">
                                    <div className="p-1">
                                        <Skeleton className="h-40 w-full bg-gray-700 rounded-md" />
                                        <div className="mt-3 flex flex-col">
                                            <Skeleton className="w-full h-5 sm:h-6 bg-gray-700 rounded-md" />
                                            <Skeleton className="w-20 h-4 mt-2 bg-gray-700 rounded-md" />
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
        <SSlide movieData={array} slideTitle="Top Movies" />
    );
}
