"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DetailedTabSkeleton from "./skeleton/DetailedTabSkeleton"
import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import React from 'react'
import axios from 'axios';

const DetailedTab = (props: any) => {
  const { movieData, slideTitle, series } = props;
  const [detailedMovieData, setDetailedMovieData] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchInfo = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/${series ? 'tv' : 'movie'}/${movieData.id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          },
          params: {
            language: "en-US",
            append_to_response: "reviews,credits",
            include_image_language: "en",
          },
        }
      );
      setDetailedMovieData(response.data);
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false);
      setErrorMessage("Failed to fetch movie details.");
      console.error(err);
    }
  };

  console.log(detailedMovieData)

  const reviewDate = (movie) => {
    const get = movie.updated_at
    const slice = get.split('T', 1)
    return slice
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (movieData) {
      fetchInfo();
    }
  }, [movieData]);

  return (
    <div> {isLoading ? (<DetailedTabSkeleton />) :
      (<div className='relative w-full flex justify-center items-center px-8 sm:px-10 lg:px-24 mb-20'>
        <Tabs defaultValue={`${isSmallScreen ? '' : 'casts'}`} className="w-full">
          <TabsList className="grid w-full sm:w-[400px] grid-cols-2 bg-[--darker-background] text-white">
            <TabsTrigger className="data-[state='active']:bg-[white]" value="casts">Casts</TabsTrigger>
            <TabsTrigger className="data-[state='active']:bg-[white]" value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="casts">
            <Card className='bg-transparent border-0 shadow-none'>
              <CardHeader>
                <CardTitle className='text-white'>Top Casts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-4 mb-3">
                {detailedMovieData?.credits?.cast?.slice(0, 6).map((movie, index) => (
                  <div key={movie.id} className='flex flex-row justify-start items-center gap-3'>
                    <div className='bg-cover bg-center w-12 h-12 rounded-full' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.profile_path})` }}></div>
                    <div className='flex flex-col'>
                      <p className='text-white font-semibold text-sm'>{movie.character}</p>
                      <p className='text-slate-400 font-medium text-xs'>{movie.name}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews">
            <Card className='bg-transparent border-0 shadow-none'>
              {/* <Card className='bg-[#101116] border-[#353843]'> */}
              <CardHeader>
                <CardTitle className='text-white'>Reviews</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {detailedMovieData?.reviews?.results?.slice(0, 2).map((movie, index) => (
                  <div key={movie.id} className='w-full'>
                    <div className='w-full h-auto border border-[--main-border] rounded-lg flex flex-col justfiy-center items-center'>
                      <div className='w-[90%] lg:w-[95%] mt-4 flex flex-row justify-between'>
                        <div className='flex flex-row gap-3'>
                          <div className='bg-cover bg-center w-10 h-10 rounded-full' style={{ backgroundImage: `url(https://tr.rbxcdn.com/180DAY-4ab626f2df7ffe788a3b06500d127a99/420/420/Hat/Webp/noFilter)` }}></div>
                          <div className='flex flex-col'>
                            <p className='text-white font-semibold text-sm'>{movie.author}</p>
                            <p className='text-slate-400 font-medium text-sm'>{reviewDate(movie)}</p>
                          </div>
                        </div>
                        {movie.author_details?.rating ? (<p className='flex flex-row items-center font-bold text-white text-base'><Star className='fill-[--star-color] stroke-none w-4 mr-1' /> {(movie.author_details?.rating)}<span className='text-slate-500 font-medium ml-1 text-sm'>/10</span></p>)
                          : (<p className='text-slate-500 font-medium ml-1 text-sm'>No rating</p>)
                        }
                      </div>
                      <div className='w-[90%] lg:w-[95%] my-5 h-auto border border-[--main-border] rounded-lg p-5'>
                        <p className='text-slate-400 text-sm leading-relaxed'>{movie.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>)}
    </div>
  )
}

export default DetailedTab