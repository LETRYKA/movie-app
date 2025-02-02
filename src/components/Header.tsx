"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Clapperboard, Menu } from 'lucide-react';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Header = (props: any) => {
    const { } = props;
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState();
    const router = useRouter();

    const inputHandler = (e) => {
        setInputValue(e.target.value)
    }

    const inputShow = () => {
        setShowInput(prev => !prev);
    };

    const searchHandler = (inputValue) => {
        if (inputValue) {
            if (inputValue.length > 0) {
                router.push(`/search/${inputValue}`)
            }
            else {
                return
            }
        }
    }

    return (
        <div className="w-full h-20 bg-gradient-to-b from-[#0E1012]/90 to-[black]/0 flex justify-between z-30 pr-10 pl-10 lg:pl-24 lg:pr-24">
            <div className="flex flex-row h-full w-auto justify-start items-center gap-10 mt-2 z-10">
                <a href="/home"><img src="/imgs/logo.png" width={79} height={48} /></a>
                <Select>
                    <SelectTrigger className="hidden w-[180px] lg:flex">
                        <Clapperboard width={18} className="mr-2" />
                        <SelectValue placeholder="Genre" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <input type="text" placeholder="Search" onChange={inputHandler} className={`bg-transparent outline-none border-b-2 text-white pb-1 transition-all duration-500 -ml-2 ${showInput ? 'w-72' : 'w-0'}`}></input>
                <Search onClick={() => (inputShow(), searchHandler(inputValue))} color="white" className="hidden cursor-pointer lg:flex -ml-6" />
            </div>
            <div className="flex flex-row h-full w-auto justify-start items-center mt-2">
                <Menu className="flex stroke-white mr-5 cursor-pointer lg:hidden" />
                <p className="hidden text-base text-white mr-4 lg:flex z-10">Hello Username!</p>
                <Avatar className="relative z-30">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                    <div className="absolute w-11 h-11 bg-[#1c2c2c] right-[93.5px] rounded-[50%] z-20"></div>
                </Avatar>
            </div>
        </div>
    );

};

export default Header;