import { Button } from "@/components/ui/button"
import { Play, Info } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Hero = (props: any) => {
    const { } = props;

    return (
        <Carousel className="relative">
            <div className="bg-fade-gradient-v absolute bottom-0 w-full -mt-10 h-40 z-10"></div>
            <CarouselContent className="flex">
                <CarouselItem className="m-0 p-0">
                    <div id="card-container" className="relative w-full h-[967px] bg-[url(/imgs/cover.jpg)] bg-cover bg-top flex justify-start items-center">
                        <div className="card-child ml-48 z-10">
                            <img src="/imgs/title.png" className="w-80" />
                            <p id="card-about" className="text-base text-white w-[40%]">Tras la caída del Imperio Galáctico, la anarquía se ha esparcido en la Galaxia. Un pistolero solitario se abre paso por los bordes exteriores, ganándose su lugar como cazarrecompensas.</p>
                            <div className="flex flex-row gap-4 mt-8">
                                <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[#1A1D29] flex items-center"><Play className="fill-[#1A1D29]" />Play</Button>
                                <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[white] flex items-center bg-transparent hover:bg-[black]/40 hover:text-[white]"><Info className="stroke-[white]" />About more</Button>
                            </div>
                        </div>
                        <div className="absolute w-full h-full bg-custom-gradient z-0"></div>
                    </div>
                </CarouselItem>
                <CarouselItem className="m-0 p-0">
                    <div id="card-container" className="relative w-full h-[967px] bg-[url(/imgs/cover.jpg)] bg-cover bg-top flex justify-start items-center">
                        <div className="card-child ml-28 z-10">
                            <img src="/imgs/title.png" className="w-80" />
                            <p id="card-about" className="text-base text-white w-[40%]">Tras la caída del Imperio Galáctico, la anarquía se ha esparcido en la Galaxia. Un pistolero solitario se abre paso por los bordes exteriores, ganándose su lugar como cazarrecompensas.</p>
                            <div className="flex flex-row gap-4 mt-8">
                                <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[#1A1D29] flex items-center"><Play className="fill-[#1A1D29]" />Play</Button>
                                <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[white] flex items-center bg-transparent hover:bg-[black]/40 hover:text-[white]"><Info className="stroke-[white]" />About more</Button>
                            </div>
                        </div>
                        <div className="absolute w-full h-full bg-custom-gradient z-0"></div>
                    </div>
                </CarouselItem>
                <CarouselItem className="m-0 p-0">
                    <div id="card-container" className="relative w-full h-[967px] bg-[url(/imgs/cover.jpg)] bg-cover bg-top flex justify-start items-center">
                        <div className="card-child ml-28 z-10">
                            <img src="/imgs/title.png" className="w-80" />
                            <p id="card-about" className="text-base text-white w-[40%]">Tras la caída del Imperio Galáctico, la anarquía se ha esparcido en la Galaxia. Un pistolero solitario se abre paso por los bordes exteriores, ganándose su lugar como cazarrecompensas.</p>
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