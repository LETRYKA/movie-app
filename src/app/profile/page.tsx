import React from 'react'
import Watchlist from './_watchlist'
import { ImageUp } from 'lucide-react';

const Profile = () => {
	return (
		<div className='w-full h-full'>
			<div className='w-full h-full flex justify-center items-center mt-28'>
				<div className='w-[80%] h-screen rounded-2xl overflow-hidden'>
					<div className='relative w-full h-60 bg-pink-400 rounded-xl group'>
						<div className='opacity-0 transition-all duration-250 ease-in-out group-hover:opacity-100 absolute bg-black/20 px-3 py-1 rounded-lg right-4 bottom-4 flex justify-center items-center text-sm cursor-pointer'><ImageUp className='w-4 mr-2' />Add cover photo</div>
					</div>
					<div className='flex flex-row -mt-10 ml-14 justify-cent items-center'>
						<div className='w-32 h-32 relative rounded-full overflow-hidden flex justify-center items-center bg-[--main-background]'>
							<div className='w-28 h-28 group relative rounded-full overflow-hidden bg-cover bg-center bg-[url(https://github.com/shadcn.png)]'>
								<div className='opacity-0 transition-all duration-250 ease-in-out group-hover:opacity-100 w-full h-full bg-black/40 flex justify-center items-center cursor-pointer'>
									<ImageUp />
								</div>
							</div>
						</div>
						<div className='flex flex-col ml-4 mt-5'>
							<h1 className='text-[--text-color] text-xl font-semibold'>Dummy User</h1>
							<p className='text-slate-500 text-sm font-medium'>@dummyuser</p>
						</div>
					</div>
					<div className='mt-12'>
						<Watchlist />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile