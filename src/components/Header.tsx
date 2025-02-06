"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Clapperboard, Menu } from 'lucide-react';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import GenreMenu from "./GenreMenu";

const Header = (props: any) => {
    const { } = props;
    const [errorMessage, setErrorMessage] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState();
    const [genreData, setGenreData] = useState([])
    const router = useRouter();

    const fetchGenre = async () => {
        try {
            setIsLoading(true);
            const genre = await axios.get(
                `${process.env.TMDB_BASE_URL}/genre/movie/list?language=en`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                    },
                    params: {
                        language: "en-US",
                        append_to_response: "images,credits,videos",
                        include_image_language: "en",
                    },
                }
            );
            setGenreData(genre.data.genres);
            setIsLoading(false);
            console.log(`DATA`, genre.data.genres)
        } catch (err) {
            setIsLoading(false);
            setErrorMessage("Failed to fetch popular movies.");
            console.error(err);
        }
    };

    const inputHandler = (e: any) => {
        setInputValue(e.target.value)
    }

    const inputShow = () => {
        setShowInput(prev => !prev);
    };

    const searchHandler = (inputValue: any) => {
        if (inputValue) {
            if (inputValue.length > 0) {
                router.push(`/search/${inputValue}`)
                setInputValue("")
            }
            else {
                return
            }
        }
    }

    const handleKeyDown = (event, inputValue) => {
        if (event.key === "Enter") {
            searchHandler(inputValue);
            inputShow()
        }
    };

    useEffect(() => {
        fetchGenre();
    }, []);

    return (
        <div className="w-full h-20 bg-gradient-to-b from-[#0E1012]/50 to-[black]/0 flex justify-between z-30 pr-10 pl-10 lg:pl-24 lg:pr-24">
            <div className="flex flex-row h-full w-auto justify-start items-center gap-10 mt-2 z-10">
                <a href="/home"><img src="/imgs/logo.png" width={79} height={48} /></a>
                <GenreMenu />
                {/* <Select onValueChange={(value) => router.push(`/genre/${value}/1`)}>
                    <SelectTrigger className="hidden w-[180px] lg:flex">
                        <Clapperboard width={18} className="mr-2" />
                        <SelectValue placeholder="Genre" />
                    </SelectTrigger>
                    <SelectContent>
                        {genreData.map((genre, i) => (
                            <SelectItem key={i} onSelect={() => router.push(`/genre/${genre.id}/${genre.name}`)} value={genre.id}>{genre.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select> */}
                <input onKeyDown={(e) => handleKeyDown(e, inputValue)} type="text" placeholder="Search" onChange={inputHandler} className={`bg-transparent outline-none border-b-2 text-white pb-1 transition-all duration-500 -ml-2 ${showInput ? 'w-72' : 'w-0'}`}></input>
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