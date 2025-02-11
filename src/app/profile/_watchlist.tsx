import React from 'react'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Watchlist = () => {
	return (
		<div className='w-full h-full'>
			<Tabs defaultValue="watchHistory" className="w-full">
				<TabsList className="grid w-full sm:w-[600px] grid-cols-3 bg-[--darker-background] text-white">
					<TabsTrigger className="data-[state='active']:bg-[#FFFFFF]" value="watchHistory">Watch History</TabsTrigger>
					<TabsTrigger className="data-[state='active']:bg-[#FFFFFF]" value="watchList">Watch List</TabsTrigger>
					<TabsTrigger className="data-[state='active']:bg-[#FFFFFF]" value="liked">Liked</TabsTrigger>
				</TabsList>
				<TabsContent value="watchHistory">
					<Card className='bg-transparent border-0 shadow-none'>
						<CardHeader>
							<CardTitle className='text-white'>Watch History</CardTitle>
						</CardHeader>
						<CardContent className="">
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="watchList">
					<Card className='bg-transparent border-0 shadow-none'>
						<CardHeader>
							<CardTitle className='text-white'>Watch List</CardTitle>
						</CardHeader>
						<CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-10">
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="liked">
					<Card className='bg-transparent border-0 shadow-none'>
						<CardHeader>
							<CardTitle className='text-white'>Liked Movies</CardTitle>
						</CardHeader>
						<CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-10">
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default Watchlist