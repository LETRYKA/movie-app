import { ArrowLeft } from 'lucide-react';

const Profile = (props: any) => {
    const { } = props;

    return (
        <div className="w-full h-auto p-20 flex justify-center items-center flex-col bg-[#121317]">
            <div className='flex justify-start flex-col mt-20 pr-10 pl-10 lg:p-0'>
                <a href='/home'>
                    <p className="text-[#67BDFF] text-base font-light cursor-pointer flex flex-row"><ArrowLeft width={16} className='mr-2' /> Back to Homepage</p>
                </a>
                <h1 className="text-white text-2xl font-semibold mt-4">My profile details</h1>
                <div className="w-auto lg:w-[614px] h-auto rounded-xl overflow-hidden border border-[#2f3033] mt-6">
                    <div className="w-full h-64 bg-[url(/imgs/sub.png)] bg-cover bg-center"></div>
                    <div className="w-full h-auto flex justify-between items-center p-8">
                        <div className="flex flex-col">
                            <h1 className="text-white text-base font-semibold">Sphere+</h1>
                            <p className="text-white text-base font-light mt-1">MON 10'000$</p>
                            <p className="text-[#C8C9CB] text-xs font-light mt-2">Subscription will be ends in October 31st of 2025</p>
                        </div>
                        <div className="flex flex-col text-end">
                            <p className="text-[#67BDFF] text-base font-light cursor-pointer">Switch to Lifetime Plan</p>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-[#FC6666] text-lg font-semibold mt-16 mb-20 cursor-pointer">LOG OUT</h1>
        </div>
    );

};

export default Profile;