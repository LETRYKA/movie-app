"use client"
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import React from 'react'

const WatchSeries = (props: any) => {
    const { } = props;
    const params = useParams();
    const router = useRouter();

    const embedUrl = "https://embed.su/embed/tv";
    const { id, season, episode } = params;

    return (
        <div>
            <div className='w-full h-screen flex justify-center items-center'>
                <iframe className="w-full h-full" src={`${embedUrl}/${params.id}/${params.season}/${params.episode}`} allowFullScreen title="Video Embed"></iframe>
                <button onClick={() => router.push(`../../../../info/series/${params.id}`)} className='absolute top-3 left-7 flex flex-row text-white text-base'><ChevronLeft width={18} />Back</button>
            </div>
        </div>
    )
}

export default WatchSeries;