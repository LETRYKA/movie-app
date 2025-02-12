export const CatCard = (props: { logo: string; video: string; onClick: () => void }) => {
    const { logo, video, onClick } = props;

    return (

        <div onClick={onClick} className="relative overflow-hidden w-full h-auto aspect-[4/2] flex justify-center items-center rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-110 shadow-lg cursor-pointer border-[2px] border-[#35384311] hover:border-[#353843]">
            <img src={logo} className="relative w-16 sm:w-36 group z-10" />
            <div className="absolute w-full h-full flex justify-center items-center inset-0 bg-gradient-to-t from-[#161a20] to-[#1c1f2a] transition-all duration-200 ease-in-out opacity-100 hover:opacity-0 z-10">
                <img src={logo} className="relative w-16 sm:w-36 group z-10" />
            </div>
            <video className="w-full h-full object-cover absolute inset-0 rounded-lg z-0" autoPlay muted loop>
                <source src={video} type="video/mp4" />
            </video>
        </div>

    );

};