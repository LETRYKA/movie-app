import React from 'react'
import { CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const CardCompSkeleton = (props: any) => {
    const { vertical } = props;

    return (
        <div className="w-30p">
            <h1 className="text-xl text-white font-semibold mb-3">
                <Skeleton className="w-48 h-6 bg-gray-700 rounded-md" />
            </h1>
            <div
                className={`grid ${vertical ? "grid-cols-2" : "grid-cols-1"}
                ${vertical ? "sm:grid-cols-3" : "sm:grid-cols-2"}
                ${vertical ? "lg:grid-cols-4" : "lg:grid-cols-3"}
                ${vertical ? "2xl:grid-cols-5" : "2xl:grid-cols-4"} gap-6`}>
                {Array(8).fill().map((_, index) => (
                    <div
                        key={index}
                        className={`${vertical ? "aspect-[7/10]" : "aspect-[4/2]"} h-auto cursor-pointer bg-slate-800 shadow-md bg-cover bg-center relative overflow-hidden border-[#353843] rounded-lg`}>
                        <Skeleton className="absolute inset-0 w-full h-full bg-gray-700 rounded-lg" />
                        <CardHeader>
                            <div className="absolute inset-0 w-full h-full group flex justify-end items-start">
                                <Skeleton className="w-16 h-6 bg-gray-600 rounded-md absolute bottom-3 right-3" />
                            </div>
                        </CardHeader>
                        <CardContent />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardCompSkeleton