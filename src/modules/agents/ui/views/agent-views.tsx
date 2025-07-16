"use client"

import {useTRPC} from "@/trpc/client";
import  {useSuspenseQuery} from "@tanstack/react-query";
import {LoadingState} from "@/components/loading-state";
import {ErrorState} from "@/components/error-state";
import {DataTable} from "@/components/data-table";
import {columns} from "@/modules/agents/ui/components/columns";
import {EmptyState} from "@/components/empty-state";
import {useAgentFilters} from "@/modules/agents/hooks/use-agent-filters";
import {
    DataPagination
} from "@/modules/agents/ui/components/agent-data-pagination";
import {useRouter} from "next/navigation";



export const AgentsView=()=>{
    const router=useRouter()
    const [filters,setFilters]=useAgentFilters()
    const trpc=useTRPC()
    const {data}=useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters
    }))

    return <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <DataTable columns={columns} data={data.items}
                   onRowClick={(row)=>router.push(`/agents/${row.id}`)}/>
        <DataPagination
            page={filters.page}
            totalPages={data.totalPages}
            onPageChange={(page)=>setFilters({page:page})}
        />
        {data.items.length===0&&<EmptyState title={"Create an Agent"} description={"" +
            "Create an agent to join your meetings.Each agent will follow" +
            " your instructions."}/>}
    </div>
}

export const AgentsViewLoading=()=>{
    return <LoadingState title="Loading Agents" description="This may take a few seconds..."/>
}

export const AgentsViewError=()=>{
    return <ErrorState title="Error Loading Agents" description="Something went wrong"/>
}