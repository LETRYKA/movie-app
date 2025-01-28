import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Search, Clapperboard, Menu } from 'lucide-react';

const Header = (props: any) => {
    const { } = props;

    return (
        <div className="w-full h-20 bg-gradient-to-b from-[#0E1012]/90 to-[black]/0 flex justify-between z-50 pr-10 pl-10 lg:pl-24 lg:pr-24">
            <div className="flex flex-row h-full w-auto justify-start items-center gap-10 mt-2">
                <img src="/imgs/logo.png" width={79} height={48} />
                <Select>
                    <SelectTrigger className="hidden w-[180px] lg:flex">
                        <Clapperboard width={18} className="mr-2" />
                        <SelectValue placeholder="Genre" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <Search color="white" className="hidden cursor-pointer lg:flex" />
            </div>
            <div className="flex flex-row h-full w-auto justify-start items-center mt-2">
                <Menu className="flex stroke-white mr-5 cursor-pointer lg:hidden" />
                <p className="hidden text-base text-white mr-4 lg:flex">Hello Username!</p>
                <Avatar className="relative z-30">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                    <div className="absolute w-11 h-11 bg-[aqua] right-[93.5px] rounded-[50%] z-20"></div>
                </Avatar>
            </div>
        </div>
    );

};

export default Header;