"use client";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Server } from "lucide-react";
import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Watch = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    const [selectedServer, setSelectedServer] = useState(`${process.env.NEXT_PUBLIC_STREAM_BINGE}/movie/`);

    const servers = [
        { id: "ONE", url: `${process.env.NEXT_PUBLIC_STREAM_VIDLINK}/movie/`, name: "Server 1" },
        { id: "TWO", url: `${process.env.NEXT_PUBLIC_STREAM_CC}/movie/`, name: "Server 2" },
        { id: "THREE", url: `${process.env.NEXT_PUBLIC_STREAM_EMBED}/movie/`, name: "Server 3" },
        { id: "FOUR", url: `${process.env.NEXT_PUBLIC_STREAM_SEVENX}/movie/`, name: "Server 4" },
        { id: "FIVE", url: `${process.env.NEXT_PUBLIC_STREAM_BINGE}/movie/`, name: "Server 5" },
    ];

    return (
        <div className="relative w-full h-screen flex justify-center items-center">
            <iframe className="w-full h-full" src={`${selectedServer}${id}`} allowFullScreen title="Video Embed"></iframe>

            <button
                onClick={() => router.push(`../../info/movie/${params.id}`)}
                className="absolute top-5 sm:top-3 left-3  sm:left-7 flex flex-row text-white text-base">
                <ChevronLeft width={18} /> Back
            </button>

            {/* Server */}
            <div className="absolute top-3 right-3 sm:right-7 sm:top-6">
                <Select onValueChange={(value) => setSelectedServer(value)}>
                    <SelectTrigger className="w-[180px] border-[#353843] text-white bg-black/10 backdrop-blur-md">
                        <SelectValue placeholder="Server 5" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#101116] text-slate-200 border-[#353843]">
                        <SelectGroup>
                            <SelectLabel className="flex flex-row justify-start items-center"><Server className="w-3 mr-2" />Choose Server</SelectLabel>
                            <hr className="mt-1 mb-2 border-t-[#353843]" />
                            {servers.map((server) => (
                                <SelectItem key={server.id} value={server.url}>
                                    {server.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default Watch;
