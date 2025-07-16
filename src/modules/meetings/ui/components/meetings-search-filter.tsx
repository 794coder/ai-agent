
import {Input} from "@/components/ui/input";
import {SearchIcon} from "lucide-react";
import {useMeetingFilters} from "@/modules/meetings/hooks/use-meeting-filters";


export const SearchFilter=()=>{
    const [filters,setFilter]=useMeetingFilters()
    return (
        <div className="relative">
            <Input
                placeholder="Filter by name"
                className="h-9 bg-white w-[200px] pl-7"
                value={filters.search}
                onChange={e=>setFilter({search:e.target.value})}
            />
            <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"/>
        </div>
    )
}