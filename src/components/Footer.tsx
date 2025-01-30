
const Footer = (props: any) => {
    const { } = props;

    return (
        <div id="footer" className="w-full bg-[#090B13] flex flex-col justify-center items-center pt-16 pb-10">
            <a href="/home"><img src="/imgs/logo.png" width={92} /></a>
            <ul className="flex flex-row justify-center flex-wrap text-white text-xs sm:text-sm font-ligth mt-10 gap-8 pl-8 pr-8">
                <li>Política de privacidad</li>
                <li>Política de privacidad</li>
                <li>Política de privacidad</li>
                <li>Política de privacidad</li>
                <li>Política de privacidad</li>
            </ul>
            <p className="w-[70%] lg:w-2/6 text-center text-white text-xs sm:text-sm font-ligth mt-10">Disney+ es un servicio por suscripción de pago, su contenido está sujeto a disponibilidad. El servicio Disney+ es comercializado por Disney DTC LATAM, Inc., 2400 W Alameda AVE., Burbank CA 91521.</p>
            <p className="w-7/12 text-center text-white text-xs sm:text-sm font-ligth mt-10">© BasePlus. Developed by LETRYKA</p>
        </div>
    );

};

export default Footer;