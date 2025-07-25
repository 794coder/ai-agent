import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {getQueryClient, trpc} from "@/trpc/server";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {CallView} from "@/modules/call/ui/views/call-view";



const Page=async({params}:{params:Promise<{meetingId:string}>})=>{
    const session=await auth.api.getSession({
        headers:await headers()
    })
    if(!session) redirect("/sign-in")
    const {meetingId}=await  params
    const queryClient=getQueryClient()
    void  queryClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({id:meetingId})
    )

    return <HydrationBoundary state={dehydrate(queryClient)}>
       <CallView meetingId={meetingId}/>
    </HydrationBoundary>
}

export default Page;