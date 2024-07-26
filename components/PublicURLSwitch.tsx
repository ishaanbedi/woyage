"use client"
import { Switch } from "@/components/ui/switch";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "./ui/button";
import { CopyIcon } from "@radix-ui/react-icons";

const PublicURLSwitch = ({ site }: {
    site:
    { website_id: string; public_url: boolean; domain_name: string; } | null;
}) => {
    const supabase = createClient();
    const [isChecked, setIsChecked] = useState(site!.public_url);
    useEffect(() => {
        setIsChecked(site!.public_url);
    }, [site]);
    return (
        <div className="flex flex-row items-center space-x-1">
            <Switch
                defaultChecked={site!.public_url}
                onCheckedChange={async (e) => {
                    try {
                        await supabase
                            .from("site_domains")
                            .update({ public_url: e })
                            .eq("website_id", site!.website_id);
                        setIsChecked(e);
                        toast.success(`Public URL ${e ? "enabled" : "disabled"}`);
                    } catch (error) {
                        toast.info("Failed to update public URL");
                    }
                }}
            />
            {/* <div>
                {isChecked ? (
                    <Button variant={"ghost"} size={"icon"} onClick={() => {
                        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SITE_URL}/shared/${site!.website_id}`);
                        toast.success("Public URL copied to clipboard");
                    }}>
                        <CopyIcon />
                    </Button>
                ) : (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="cursor-not-allowed">
                                <Button variant={"ghost"} size={"icon"} disabled>
                                    <CopyIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="text-center">
                                First enable Public URL Sharing
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                )}
            </div> */}
        </div>
    );
}

export default PublicURLSwitch;