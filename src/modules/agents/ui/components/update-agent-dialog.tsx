import {ResponsiveDialog} from "@/components/responsive-dialog";
import {AgentForm} from "@/modules/agents/ui/components/agent-form";
import {AgentGetOne} from "@/modules/agents/types";

interface Props{
    open:boolean
    onOpenChange:(open:boolean) => void
    initialValues:AgentGetOne
}

export const UpdateAgentDialog = ({open,onOpenChange,initialValues}:Props) => {
    return <ResponsiveDialog title="Edit Agent" description="Edit the Agent details" open={open} onOpenChange={onOpenChange}>
        <AgentForm
            onSuccess={()=>onOpenChange(false)}
            onCancel={()=>onOpenChange(false)}
            initialValues={initialValues}
        />
    </ResponsiveDialog>
};

