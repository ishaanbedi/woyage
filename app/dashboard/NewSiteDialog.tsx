"use client";
import { Button } from "@/components/ui/button";
const isValidDomain = require("is-valid-domain");
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/toaster";
const NewSiteDialog = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [domainName, setDomainName] = useState("");
  const supabase = createClient();
  const sanitizeDomain = (domain: string) => {
    const withPath = domain.replace(/(^\w+:|^)\/\//, "").replace(/\/$/, "");
    const withoutPath = withPath.split("/")[0];
    return withoutPath;
  };

  const addSite = async () => {
    const domain = sanitizeDomain(domainName);
    if (!isValidDomain(domain)) {
      toast.error("Invalid domain name");
      return;
    }
    const { error } = await supabase
      .from("site_domains")
      .insert([{ email: user.email, domain_name: domain }]);
    if (error) {
      if (error.code === "23505") {
        toast.error("Site already exists.");
      } else {
        toast.error("Failed to add site");
      }
      return;
    }
    setIsOpen(false);
    setDomainName("");
  };
  return (
    <div>
      <Button size={"lg"} onClick={() => setIsOpen(true)}>
        New Site +
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Site</DialogTitle>
            <DialogDescription>
              Add a new site and start tracking immediately.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div>
              <Label htmlFor="site_domain" className="text-right">
                Site Domain
              </Label>
              <Input
                id="site_domain"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
              />
            </div>
            <span className="text-[0.7rem] flex justify-center items-center pt-2 text-center text-primary/50">
              Make sure to add your domain without the protocol (http:// or
              https://) and without any path (e.g. /about).
            </span>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={addSite}
              disabled={domainName === ""}
            >
              Add Site
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
};

export default NewSiteDialog;
