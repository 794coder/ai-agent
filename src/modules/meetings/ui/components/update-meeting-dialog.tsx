import {ResponsiveDialog} from "@/components/responsive-dialog";
import {MeetingGetOne} from "@/modules/meetings/types";
import {MeetingForm} from "@/modules/meetings/ui/components/meeting-form";

interface Props{
    open:boolean
    onOpenChange:(open:boolean) => void
    initialValues:MeetingGetOne
}

export const UpdateMeetingDialog = ({open,onOpenChange,initialValues}:Props) => {
    return <ResponsiveDialog title="Edit Meeting" description="Edit the Meeting details" open={open} onOpenChange={onOpenChange}>
        <MeetingForm
            onSuccess={()=>onOpenChange(false)}
            onCancel={()=>onOpenChange(false)}
            initialValues={initialValues}
        />
    </ResponsiveDialog>
};

