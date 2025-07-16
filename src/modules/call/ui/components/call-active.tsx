import Link from "next/link";
import Image from "next/image";
import {CallControls, SpeakerLayout} from "@stream-io/video-react-sdk";


interface Props{
    onLeave: () => void;
    meetingName: string;
}
export const CallActive=({onLeave,meetingName}:Props)=>{
    return (
        <div className="flex flex-col justify-between p-4 h-full text-white">
            <div className="bg-[#101213] rounded-full p-4 flex items-center gap-4">
                <Link href={"/"} className="flex justify-center items-center bg-white/10 p-1 rounded-full w-fit">
                    <Image src={"/logo.svg"} alt={"logo"} width={22} height={22} />
                </Link>
                <h4 className="text-base">
                    {meetingName}
                </h4>
            </div>
            <SpeakerLayout/>
            <div className="rounded-full bg-[#101213] px-4">
                <CallControls onLeave={onLeave}/>
            </div>
        </div>
    )
}