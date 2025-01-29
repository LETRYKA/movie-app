import { Button } from '@/components/ui/button';
import { Play, Plus, UsersRound } from 'lucide-react';

const Movie = (props: any) => {
    const { } = props;

    return (
        <div>
            <div className="relative w-full pr-14 pl-14 sm:p-0 h-[800px] sm:h-[967px] bg-[url(/imgs/nosbg.jpg)] bg-cover bg-top flex justify-center sm:justify-start items-center">
                <div className="flex flex-col sm:ml-[8%] z-10 mt-36 sm:mt-16">
                    <img src="/imgs/noslog.png" className="w-[70%] -mt-4 sm:w-[320px]" />
                    <div className='flex flex-row justify-start items-center gap-2'>
                        <div className='flex justify-center items-center w-0 h-0 bg-[#32343e] p-3 pl-5 pr-5 rounded-md'>
                            <p className='text-white text-sm font-semibold'>18+</p>
                        </div>
                        <div className='flex justify-center items-center w-0 h-0 bg-[#32343e] p-3 pl-5 pr-5 rounded-md'>
                            <p className='text-white text-sm font-bold'>HD</p>
                        </div>
                        <div className='flex justify-center items-center w-0 h-0 bg-[#32343e] p-3 pl-5 pr-5 rounded-md'>
                            <p className='text-white text-sm font-medium'>CC</p>
                        </div>
                        <p className='text-white text-sm font-medium'>2024 • 2 h 12 min</p>
                    </div>
                    <p className='text-slate-400 text-sm font-medium mt-2'>Science fiction | Action Adventure</p>
                    <div className="flex flex-row gap-4 mt-8">
                        <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[#1A1D29] flex items-center"><Play className="fill-[#1A1D29]" />PLAY</Button>
                        <Button variant="outline" className="pt-5 pb-5 pl-8 pr-8 text-base font-bold text-[white] flex items-center bg-transparent hover:bg-[black]/40 hover:text-[white]">TRAILER</Button>
                        <Button variant="outline" className="pt-5 pb-5 pl-3 pr-3 text-base font-bold text-[white] flex items-center bg-transparent hover:bg-[black]/40 hover:text-[white] rounded-full"><Plus /></Button>
                        <Button variant="outline" className="pt-5 pb-5 pl-3 pr-3 text-base font-bold text-[white] flex items-center bg-transparent hover:bg-[black]/40 hover:text-[white] rounded-full"><UsersRound /></Button>
                    </div>
                    <p className="text-sm sm:text-base text-slate-400 w-full sm:w-[40%] mt-7">Natasha Romanoff, alias Black Widow, lucha contra una peligrosa conspiración mientras enfrenta su peor batalla hasta ahora: el pasado que dejó atrás antes de convertirse en vengadora. Ser espía no fue nada fácil, pero es momento de volver a las raíces aunque el mal aceche en cada paso.</p>
                </div>
                <div className="absolute w-full h-full bg-custom-gradient z-0"></div>
            </div>
        </div>
    );

};

export default Movie;