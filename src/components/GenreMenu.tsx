import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clapperboard } from 'lucide-react';
import axios from 'axios';

const GenreMenu = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);
    const searchedGenreIds = searchParams.get("genreId");

    const fetchGenre = async () => {
        setIsLoading(true);
        try {
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
            setGenres(genre.data.genres);
        } catch (err) {
            setErrorMessage("Failed to fetch genres.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const genreHandler = (genreId: string) => {
        const updateGenres = selectedGenreIds.includes(genreId)
            ? selectedGenreIds.filter((item) => item !== genreId)
            : [...selectedGenreIds, genreId];

        setSelectedGenreIds(updateGenres);

        const queryParms = new URLSearchParams();
        queryParms.set("genreId=", updateGenres.join(","));
        router.push(`/genre/${updateGenres.join(",")}/1`);

    };

    useEffect(() => {
        fetchGenre();
    }, [searchedGenreIds]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Clapperboard width={18} className="mr-2" />
                    Genres
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-52 mt-2 w-auto bg-[#101116] text-white border-[#353843]">
                <DropdownMenuLabel className="text-lg ml-2">Genres</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#353843]" />
                <DropdownMenuGroup className="w-[650px] flex flex-row flex-wrap gap-3 justify-start items-center py-4 px-7">
                    {genres.map((item) => {
                        const genreId = item.id.toString();
                        const isSelected = selectedGenreIds.includes(genreId);
                        return (
                            <div key={item.name} className="w-auto group-hover:bg-red-600">
                                <Badge
                                    onClick={() => genreHandler(genreId)}
                                    className={`bg-[#242631] hover:bg-[#67BDFF] cursor-pointer ${isSelected ? "bg-[#67BDFF]" : ""}`}
                                >
                                    {item.name}
                                </Badge>
                            </div>
                        );
                    })}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default GenreMenu;
