
const CatCard = (props: any) => {
    const { logo, video } = props;

    return (

        <div className="relative overflow-hidden w-64 h-36 flex justify-center items-center rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer border-[2px] border-transparent hover:border-[#353843]">
            <div className="absolute w-full h-full flex justify-center items-center inset-0 bg-gradient-to-t from-[#20212c] to-[#2e303d] hover:from-transparent hover:to-transparent z-10">
                <img src={logo} className="relative z-10" />
            </div>
            <video className="w-full h-full object-cover absolute inset-0 rounded-lg z-0" autoPlay muted loop>
                <source src={video} type="video/mp4" />
            </video>
        </div>

    );

};

export default CatCard;