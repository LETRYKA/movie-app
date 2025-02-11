import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Clapperboard } from 'lucide-react';
import { DataType } from '@/types/DataType';
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import axios from 'axios';

export const GenreMenu = (props: DataType[]) => {
    const router = useRouter();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
    const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);

    const fetchGenre = async () => {
        setIsLoading(true);
        try {
            const genre = await axios.get(
                `${process.env.TMDB_BASE_URL}/genre/movie/list?language=en`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
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
        let updateGenres = selectedGenreIds.includes(genreId)
            ? selectedGenreIds.filter((item) => item !== genreId)
            : [...selectedGenreIds, genreId];

        setSelectedGenreIds(updateGenres);

        const urlCheck = window.location.pathname.startsWith("/info/movie")
            ? "/genre"
            : window.location.pathname.startsWith("/genre")
                ? "/genre"
                : "/genre";

        const genre = encodeURIComponent(updateGenres.join(","));
        router.push(`${urlCheck}/${genre}/1`);
    };

    useEffect(() => {
        if (params.id) {
            if (window.location.pathname.startsWith("/genre")) {
                const decodedIds = decodeURIComponent(Array.isArray(params.id) ? params.id.join(",") : params.id).split(",");
                setSelectedGenreIds(decodedIds);
            } else {
                setSelectedGenreIds([]);
            }
        }
    }, [params.id]);



    useEffect(() => {
        fetchGenre();
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='bg-transparent'>
                <Button variant="outline">
                    <Clapperboard width={18} className="mr-2" />
                    Genres
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className="mt-2 w-auto bg-[--darker-background] text-white border-[#353843]">
                <DropdownMenuLabel className="text-lg ml-2">Genres</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#353843]" />
                <DropdownMenuGroup className="w-[170px] sm:w-[240px] md:w-[320px] lg:w-[650px] h-auto flex flex-row flex-wrap gap-4 justify-start items-center py-6 px-7">
                    {genres.map((item) => {
                        const genreId = item.id.toString();
                        const isSelected = selectedGenreIds.includes(genreId);
                        return (
                            <div key={item.name} className="w-auto group-hover:bg-red-600">
                                <Badge
                                    onClick={() => genreHandler(genreId)}
                                    className={`bg-[--widget-background] hover:bg-[--secondary-active] cursor-pointer ${isSelected ? "bg-[--secondary-active] text-white" : "text-[--text-color]"}`}>
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
