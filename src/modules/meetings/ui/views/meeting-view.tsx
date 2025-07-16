"use client"


import {useTRPC} from "@/trpc/client";
import {useSuspenseQuery} from "@tanstack/react-query";
import {LoadingState} from "@/components/loading-state";
import {ErrorState} from "@/components/error-state";
import {DataTable} from "@/components/data-table";
import {columns} from "@/modules/meetings/ui/components/columns"
import {EmptyState} from "@/components/empty-state";
import {useRouter} from "next/navigation";
import {useMeetingFilters} from "@/modules/meetings/hooks/use-meeting-filters";
import {DataPagination} from "@/components/data-pagination";

export const MeetingView=()=>{
    const trpc=useTRPC()
    const router=useRouter()
    const [filters,setFilters]=useMeetingFilters()
    const {data}=useSuspenseQuery(
        trpc.meetings.getMany.queryOptions({
            ...filters,
        })
    )
    return <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <DataTable columns={columns} data={data.items}
                   onRowClick={(row)=>router.push(`/meetings/${row.id}`)}
        />
        <DataPagination page={filters.page} totalPages={data.totalPages} onPageChange={(page)=>setFilters({page})}/>
        {data.items.length===0&&<EmptyState title={"Create a Meeting"} description={"" +
            "Create a meeting to connect with others. Each meeting lets you" +
            " collaborate,share ideas and interact with participants in real" +
            " time"}/>}
    </div>
}

export const MeetingsViewLoading=()=>{
    return <LoadingState title="Loading Meetings" description="This may take a few seconds..."/>
}

export const MeetingsViewError=()=>{
    return <ErrorState title="Error Loading Meetings" description="Something went wrong"/>
}