import React from 'react';
import {
    MeetingsViewError, MeetingsViewLoading,
    MeetingView
} from "@/modules/meetings/ui/views/meeting-view";
import {getQueryClient, trpc} from "@/trpc/server";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {ErrorBoundary} from "react-error-boundary";
import {Suspense} from "react";
import {
    MeetingsListHeader
} from "@/modules/meetings/ui/components/meetings-list-header";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import type {SearchParams} from "nuqs/server";
import {loadSearchParams} from "@/modules/meetings/params";

interface Props{
    searchParams:Promise<SearchParams>
}
const Meetings = async({searchParams}:Props) => {
    const filters=await loadSearchParams(searchParams);
    const queryClient=getQueryClient()
    void queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({
            ...filters,
        })
    )
    const session=await auth.api.getSession({
        headers:await headers()
    })
    if(!session) redirect("/sign-in")
    return <>
        <MeetingsListHeader/>
        <HydrationBoundary state={dehydrate((queryClient))}>
        <Suspense fallback={<MeetingsViewLoading/>}>
            <ErrorBoundary fallback={<MeetingsViewError/>}>
                <MeetingView/>
            </ErrorBoundary>
        </Suspense>
    </HydrationBoundary>
    </>
};

export default Meetings;