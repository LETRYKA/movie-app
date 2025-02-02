
const Footer = (props: any) => {
    const { } = props;

    return (
        <div id="footer" className="w-full bg-[#090B13] flex flex-col justify-center items-center pt-16 pb-10">
            <a href="/home"><img src="/imgs/logo.png" width={92} /></a>
            <ul className="flex flex-row justify-center flex-wrap text-white text-xs sm:text-sm font-ligth mt-10 gap-8 pl-8 pr-8 cursor-pointer">
                <li>Terms of Use</li>
                <li>Privacy Policy</li>
                <li>FAQ</li>
                <li>Contact Us</li>
                <li>DMCA Policy</li>
            </ul>
            <p className="w-[70%] lg:w-2/6 text-center text-white text-xs sm:text-sm font-ligth mt-10">Deze site linkt naar content van derden en host geen bestanden. Auteursrechtkwesties dienen te worden gericht aan de betreffende provider.</p>
            <p className="w-7/12 text-center text-white text-xs sm:text-sm font-ligth mt-10">© Nextjs+. Developed by LETRYKA</p>
        </div>
    );

};

export default Footer;