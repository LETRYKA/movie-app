import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const DetailedTabSkeleton = () => {
    return (
        <div className="relative w-full flex justify-center items-center px-8 sm:px-10 lg:px-24 mb-20 z-10 bg-[#1b1d29]">
            <Tabs defaultValue="casts" className="w-full">
                <TabsList className="grid w-full sm:w-[400px] grid-cols-2 text-white">
                    <TabsTrigger value="casts">
                        <Skeleton className="w-[100px] h-6 bg-gray-700 rounded-md" />
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="casts">
                    <Card className="bg-transparent border-0 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-white">
                                <Skeleton className="w-32 h-6 bg-gray-700 rounded-md" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-4 mb-3">
                            {Array(6).fill(null).map((_, index) => (
                                <div key={index} className="flex flex-row justify-start items-center gap-3">
                                    <Skeleton className="w-12 h-12 bg-gray-700 rounded-full" />
                                    <div className="flex flex-col">
                                        <Skeleton className="w-20 h-3 bg-gray-700 rounded-md" />
                                        <Skeleton className="w-24 h-3 mt-2 bg-gray-600 rounded-md" />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default DetailedTabSkeleton