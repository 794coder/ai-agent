
import {
    AgentsView, AgentsViewError,
    AgentsViewLoading
} from "@/modules/agents/ui/views/agent-views";
import {getQueryClient, trpc} from "@/trpc/server";
import {HydrationBoundary,dehydrate} from "@tanstack/react-query";
import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {ListHeader} from "@/modules/agents/ui/components/list-header";
import {headers} from "next/headers";
import {auth} from "@/lib/auth"
import {redirect} from "next/navigation";
import type {SearchParams} from "nuqs";
import {loadSearchParams} from "@/modules/agents/params";

interface Props{
    searchParams:Promise<SearchParams>
}

const Agents = async({searchParams}:Props) => {
    const filters=await loadSearchParams(searchParams);
    const session=await auth.api.getSession({
        headers:await headers()
    });
    if(!session) redirect("/sign-in")
    const queryClient=getQueryClient()
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
        ...filters
    }))
    return <>
        <ListHeader/>
        <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading/>}>
            <ErrorBoundary fallback={<AgentsViewError/>}>
                <AgentsView/>
            </ErrorBoundary>
        </Suspense>
        </HydrationBoundary>
    </>
};

export default Agents;