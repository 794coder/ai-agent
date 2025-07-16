"use client"
import {Button} from "@/components/ui/button";
import {PlusIcon, XCircleIcon} from "lucide-react";
import {
    NewMeetingDialog
} from "@/modules/meetings/ui/components/new-meeting-dialog";
import {useState} from "react";
import {
    SearchFilter
} from "@/modules/meetings/ui/components/meetings-search-filter";
import {StatusFilter} from "@/modules/meetings/ui/components/status-filter";
import {AgentIdFilter} from "@/modules/meetings/ui/components/agent-id-filter";
import {useMeetingFilters} from "@/modules/meetings/hooks/use-meeting-filters";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";


export const MeetingsListHeader = () => {
    const [filters,setFilters]=useMeetingFilters()
    const [isDialogOpen,setIsDialogOpen]=useState(false)
    const isAnyfilterModified=!!filters.status||!!filters.agentId||!!filters.search;
    const onClearFilters=()=>{
        setFilters({
            status:null,
            agentId: "",
            search:"",
            page:1
        }).then(()=>{})
    }
    return (
        <>
            <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
            <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h5 className="font-medium text-xl">My Meetings</h5>
                <Button onClick={()=>setIsDialogOpen(true)}>
                    <PlusIcon/>
                    New Meeting
                </Button>
            </div>
                <ScrollArea>
                <div className="flex items-center gap-x-2 p-1">
                    <SearchFilter/>
                    <StatusFilter/>
                    <AgentIdFilter/>
                    {
                        isAnyfilterModified && (
                            <Button variant={"outline"} onClick={onClearFilters}>
                                <XCircleIcon className="size-4"/>
                                Clear
                            </Button>
                        )
                    }
                </div>
                    <ScrollBar orientation={"horizontal"}/>
                </ScrollArea>
            </div>
        </>
    );
};
