"use client"
import { useRouter, useParams } from 'next/navigation'
import GenreCardComp from '@/components/GenreCardComp'
import { useState, useEffect } from 'react'
import { DataType } from '@/types/DataType'
import axios from 'axios'
import React from 'react'
import CardComp from '@/components/CardComp'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const Genre = () => {
    const params = useParams();

    const { id, page } = useParams();
    const genreId = params.id
    const router = useRouter();
    const currentPage = params.page
    const [genreData, setGenreData] = useState<DataType[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const genre = await axios.get(
                `${process.env.TMDB_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc&with_genres=${genreId}`,
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
            setGenreData(genre.data.results);
            setTotalPages(genre.data.total_pages);
            console.log(genre.data.total_pages)
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setErrorMessage("Failed to fetch popular movies.");
            console.error(err);
        }
    };

    const handlePageChange = (pageNumber: number) => {
        router.push(`/genre/${genreId}/${pageNumber}`);
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    return (
        <div className='w-full h-full flex flex-col items-center flex justify-center items-center'>
            <div className='w-[80%] mt-52'>
                <CardComp movieData={genreData} vertical={true} />
            </div>
            <div className='w-[80%] mt-10 mb-52'>
                <Pagination className="w-auto float-right">
                    <PaginationContent className="bg-foregroud text-background">
                        <PaginationItem>
                            <PaginationPrevious className={`${currentPage < 2 && `opacity-50`}`}
                                href='#'
                                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} />
                        </PaginationItem>
                        {[...Array(totalPages).slice(1, 5).keys()].map((pageNum) => (
                            <PaginationItem key={pageNum + 1}>
                                <PaginationLink
                                    href='#'
                                    onClick={() => handlePageChange(pageNum + 1)}
                                    isActive={currentPage === pageNum + 1}>
                                    {pageNum + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext className={`${currentPage === totalPages && `opacity-50`}`}
                                href='#'
                                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

export default Genre
