"use client";
const isValidDomain = require("is-valid-domain");
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
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
import { TrashIcon } from "@radix-ui/react-icons";
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
import { ArrowRight, Info, LoaderCircle, Settings } from "lucide-react";
import Image from "next/image";
import NewSiteDialog from "./NewSiteDialog";

const SitesList = ({ user }: { user: User }) => {
  const [sites, setSites] = useState<
    { domain_name: string; website_id: string; added: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [updatedSiteDomain, setUpdatedSiteDomain] = useState("");
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [selectedSiteSettings, setSelectedSiteSettings] = useState<{
    domain_name: string;
    website_id: string;
  } | null>(null);
  const supabase = createClient();
  const fetchSites = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_domains")
      .select()
      .eq("email", user.email)
      .order("added", { ascending: false });

    if (error) {
      setLoading(false);
      console.error("error fetching sites:", error);
      return;
    }
    setLoading(false);
    setSites(data);
  };
  const deleteSite = async (domain: string) => {
    setLoading(true);
    const { error } = await supabase
      .from("site_domains")
      .delete()
      .eq("domain_name", domain);
    if (error) {
      setLoading(false);
      console.error("error deleting site:", error);
      return;
    }
    setLoading(false);
    fetchSites();
  };
  const sanitizeDomain = (domain: string) => {
    const withPath = domain.replace(/(^\w+:|^)\/\//, "").replace(/\/$/, "");
    const withoutPath = withPath.split("/")[0];
    return withoutPath;
  };

  const updateSite = async () => {
    setLoading(true);
    const domain = sanitizeDomain(updatedSiteDomain);
    if (!isValidDomain(domain)) {
      setLoading(false);
      toast.error("Invalid domain name");
      return;
    }
    const { error } = await supabase
      .from("site_domains")
      .update({ domain_name: updatedSiteDomain })
      .eq("domain_name", selectedSiteSettings?.domain_name);
    if (error) {
      if (error.code === "23505") {
        toast.error("Site already exists.");
      } else {
        toast.error("Failed to add site");
      }
      setLoading(false);
      return;
    }
    setLoading(false);
    setUpdatedSiteDomain("");
    setSettingsDialogOpen(false);
    fetchSites();
  };
  useEffect(() => {
    fetchSites();
  }, [user]);
  useEffect(() => {
    setUpdatedSiteDomain(selectedSiteSettings?.domain_name || "");
  }, [selectedSiteSettings]);
  supabase
    .channel("site_domains")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "site_domains" },
      fetchSites,
    )
    .subscribe();
  return (
    <section className="p-4 min-h-[85vh]">
      {loading ? (
        <section className="container mx-auto p-4">
          <div className="flex justify-center items-center min-h-[80vh]">
            <LoaderCircle className="animate-spin" />
          </div>
        </section>
      ) : (
        <div>
          {sites.length === 0 ? (
            <div className="flex flex-col items-center space-y-4 py-4 justify-center">
              <Image
                src="/illustrations/dashboard-empty.svg"
                width={300}
                height={300}
                alt="Add a site"
              />
              <h1 className="text-xl text-center">
                It's lonely here, add a site to get started!
              </h1>
              <NewSiteDialog user={user} />
            </div>
          ) : (
            <div>
              <div className="flex justify-end">
                <NewSiteDialog user={user} />
              </div>
              {/*
                Heads up! 👋

                This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
              */}
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="text-center">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          S.No
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Domain
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Date Added
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Actions
                        </th>
                        <th className="px-4 py-2">Stats</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-center">
                      {sites.map((site, index) => (
                        <tr>
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {site.domain_name}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {new Date(site.added).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            <div className="space-x-2">
                              <Dialog
                                open={settingsDialogOpen}
                                onOpenChange={setSettingsDialogOpen}
                              >
                                <DialogTrigger>
                                  <Button
                                    size="icon"
                                    onClick={() => {
                                      setSelectedSiteSettings(site);
                                    }}
                                  >
                                    <Settings size={16} />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>
                                      {site.domain_name}
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div>
                                    <div className="flex flex-col space-y-2">
                                      <span>
                                        <span className="flex items-center space-x-1 mt-2">
                                          <Label htmlFor="siteID">
                                            Site ID
                                          </Label>
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger>
                                                <Info size={12} />
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p className="text-center">
                                                  This is the unique identifier
                                                  for your site.
                                                  <br />
                                                  Mention this ID in support
                                                  requests to help us identify
                                                  your site.
                                                </p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        </span>
                                        <Input
                                          type="text"
                                          id="siteID"
                                          value={
                                            selectedSiteSettings?.website_id
                                          }
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
                                                  The authorized domain name for
                                                  your site, whose traffic will
                                                  be tracked.
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
                                                  Copy this code and paste it in
                                                  the &lt;head&gt; section of
                                                  your website.
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
                                              `<script defer src="${process.env.NEXT_PUBLIC_SITE_URL}/track.js" data-website-id="${selectedSiteSettings?.website_id}"></script>`,
                                            );
                                            toast(
                                              "Tracking code copied to clipboard.",
                                            );
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
                                  <Button variant={"outline"} size={"icon"}>
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
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        deleteSite(site.domain_name)
                                      }
                                    >
                                      Continue
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-2">
                            <Link href={`/dashboard/${site.website_id}`}>
                              <Button variant={"outline"}>
                                View Stats &rarr;
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <Toaster />
    </section>
  );
};

export default SitesList;
