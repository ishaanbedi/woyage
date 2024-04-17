"use client";
const isValidDomain = require("is-valid-domain");
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChartIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/toaster";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import { ArrowRight, Info, Settings } from "lucide-react";

const SitesList = ({ user }: { user: User }) => {
  const [sites, setSites] = useState<
    { domain_name: string; website_id: string }[]
  >([]);
  const [updatedSiteDomain, setUpdatedSiteDomain] = useState("");
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const supabase = createClient();
  const fetchSites = async () => {
    const { data, error } = await supabase
      .from("site_domains")
      .select()
      .eq("email", user.email);
    if (error) {
      console.error("error fetching sites:", error);
      return;
    }
    setSites(data);
  };
  const deleteSite = async (domain: string) => {
    const { error } = await supabase
      .from("site_domains")
      .delete()
      .eq("domain_name", domain);
    if (error) {
      console.error("error deleting site:", error);
      return;
    }
    fetchSites();
  };
  const sanitizeDomain = (domain: string) => {
    const withPath = domain
      .replace(/(^\w+:|^)\/\/(www\.)?/, "")
      .replace(/\/$/, "");
    const withoutPath = withPath.split("/")[0];
    return withoutPath;
  };
  const updateSite = async () => {
    // this is temporary to allow localhost for testing, you may comment this block if you want
    if (updatedSiteDomain.includes("localhost")) {
      const { error } = await supabase
        .from("site_domains")
        .update({ domain_name: updatedSiteDomain })
        .eq("domain_name", sites[0].domain_name);
      if (error) {
        console.error("error updating site:", error);
        return;
      }
      setUpdatedSiteDomain("");
      setSettingsDialogOpen(false);
      fetchSites();
      return;
    }
    const domain = sanitizeDomain(updatedSiteDomain);
    if (!isValidDomain(domain)) {
      toast.error("Invalid domain name");
      return;
    }
    const { error } = await supabase
      .from("site_domains")
      .update({ domain_name: domain })
      .eq("domain_name", sites[0].domain_name);
    if (error) {
      console.error("error updating site:", error);
      return;
    }
    setUpdatedSiteDomain("");
    setSettingsDialogOpen(false);
    fetchSites();
  };
  useEffect(() => {
    fetchSites();
  }, [user]);
  supabase
    .channel("site_domains")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "site_domains" },
      fetchSites,
    )
    .subscribe();
  return (
    <section className="max-w-4xl mx-auto">
      {sites.length === 0 ? (
        <p>No sites added yet.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S No.</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Stats</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sites.map(
              (
                site: { domain_name: string; website_id: string },
                index: number,
              ) => (
                <TableRow>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium ">
                    {site.domain_name.length > 30
                      ? `${site.domain_name.slice(0, 30)}...`
                      : site.domain_name}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger>
                          <Button>
                            <Settings size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{site.domain_name}</DialogTitle>
                          </DialogHeader>
                          <div>
                            <div className="flex flex-col space-y-2">
                              <span>
                                <span className="flex items-center space-x-1 mt-2">
                                  <Label htmlFor="siteID">Site ID</Label>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Info size={12} />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="text-center">
                                          This is the unique identifier for your
                                          site.
                                          <br />
                                          Mention this ID in support requests to
                                          help us identify your site.
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </span>
                                <Input
                                  type="text"
                                  id="siteID"
                                  value={site.website_id}
                                  readOnly
                                  disabled
                                  className="mt-2"
                                />
                              </span>
                              <span>
                                <span className="flex items-center space-x-1 mt-2">
                                  <Label htmlFor="domain">Domain</Label>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Info size={12} />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="text-center">
                                          The authorized domain name for your
                                          site, whose traffic will be tracked.
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </span>
                                <Input
                                  className="mt-2"
                                  type="text"
                                  id="domain"
                                  placeholder={site.domain_name}
                                  value={updatedSiteDomain}
                                  onChange={(e) =>
                                    setUpdatedSiteDomain(e.target.value)
                                  }
                                />
                              </span>
                              <span>
                                <span className="flex items-center space-x-1 mt-2">
                                  <Label htmlFor="tracking-code">
                                    Tracking Code
                                  </Label>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Info size={12} />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="text-center">
                                          Copy this code and paste it in the
                                          &lt;head&gt; section of your website.
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </span>
                                <Input
                                  className="mt-2"
                                  type="text"
                                  id="tracking-code"
                                  value={`<script defer src="${process.env.NEXT_PUBLIC_SITE_URL}/track.js" data-website-id="${site.website_id}"></script>`}
                                  readOnly
                                  disabled
                                />
                              </span>
                              <span className="flex space-x-2 pt-4">
                                <Button
                                  disabled={!updatedSiteDomain}
                                  onClick={updateSite}
                                >
                                  Update
                                </Button>
                                <Button
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      `<script defer src="${process.env.NEXT_PUBLIC_SITE_URL}/track.js" data-website-id="${site.website_id}"></script>`,
                                    );
                                    toast("Tracking code copied to clipboard.");
                                  }}
                                >
                                  Copy Tracking Code
                                </Button>
                              </span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button variant={"destructive"}>
                            <TrashIcon />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the site.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteSite(site.domain_name)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/${site.website_id}`}>
                      <Button>
                        View Now <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      )}
      <Toaster />
    </section>
  );
};

export default SitesList;
