"use client"

import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { DataType } from '@/types/DataType'
import { CardComp } from "@/components"
import axios from 'axios'
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
    const genreId = params.id;
    const router = useRouter();
    const [genreData, setGenreData] = useState<DataType[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const currentPage = Number(params.page)
    const startPage = Math.max(0, currentPage - 2);
    const slicePage = 3;
    const endPage = Math.min(totalPages, startPage + slicePage);


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
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='w-[80%] mt-52'>
                <CardComp movieData={genreData} vertical={true} />
            </div>
            <div className='w-[80%] mt-10 mb-52'>
                <Pagination className="w-auto float-right">
                    <PaginationContent className="">
                        <PaginationItem>
                            <PaginationPrevious className={`${currentPage && (currentPage < 2 && `opacity-50 hover:bg-transparent hover:text-white hover:cursor-default`)}`}
                                href='#'
                                onClick={() => currentPage && (currentPage > 1 && handlePageChange(currentPage - 1))} />
                        </PaginationItem>
                        {[...Array(totalPages).keys()].slice(startPage, endPage).map((pageNum) => (
                            <PaginationItem key={pageNum + 1}>
                                <PaginationLink
                                    href='#'
                                    onClick={() => handlePageChange(pageNum + 1)}
                                    isActive={currentPage === pageNum + 1}
                                >
                                    {(pageNum + 1)}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext className={`${currentPage && (currentPage === totalPages && `opacity-50`)}`}
                                href='#'
                                onClick={() => currentPage && (currentPage < totalPages && handlePageChange(currentPage + 1))} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

export default Genre
