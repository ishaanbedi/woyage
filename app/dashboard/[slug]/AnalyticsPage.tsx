"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import SelectionToggle from "./SelectionToggle";
import ViewsBarChart from "./ViewsBarChart";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import DevicesCard from "./DevicesCard";
import CountryCard from "./CountryCard";
import PathsCard from "./PathsCard";
import ReferrersCard from "./ReferrersCard";

interface Analytics {
  id: string;
  path: string;
  browser: string;
  referrer: string;
  os: string;
  device: string;
  country: string;
  website_id: string;
  pk: string;
  domain: string;
  added_time: string;
  language: string;
}
const AnalyticsPage = ({
  user,
  params,
  domain,
}: {
  user: User;
  params: { slug: string };
  domain: string;
}) => {
  const userEmail = user.email;
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Analytics[]>([]);
  const [dateRange, setDateRange] = useState("2");
  const fetchRecords = async () => {
    var timeFilter;
    switch (dateRange) {
      case "0":
        timeFilter = new Date(
          new Date().setHours(new Date().getHours() - 1),
        ).toISOString();
        break;
      case "1":
        timeFilter = new Date(
          new Date().setDate(new Date().getDate() - 1),
        ).toISOString();
        break;
      case "2":
        timeFilter = new Date(
          new Date().setDate(new Date().getDate() - 7),
        ).toISOString();
        break;
      case "3":
        timeFilter = new Date(
          new Date().setDate(new Date().getDate() - 30),
        ).toISOString();
        break;
      case "4":
        timeFilter = new Date(
          new Date().setDate(new Date().getDate() - 90),
        ).toISOString();
        break;
      case "5":
        timeFilter = new Date(
          new Date().setDate(new Date().getDate() - 365),
        ).toISOString();
        break;
      case "6":
        timeFilter = new Date(new Date().setFullYear(1970)).toISOString();
        break;
    }
    const { data, error } = await supabase
      .from("analytics")
      .select("*")
      .eq("id", params.slug)
      .filter("added_time", "gt", timeFilter);
    if (error) {
      console.error(error);
      setLoading(false);
    } else {
      setData(data);
      setLoading(false);
    }
  };
  supabase
    .channel("site_domains")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "analytics" },
      fetchRecords,
    )
    .subscribe();
  useEffect(() => {
    fetchRecords();
  }, [user, params, dateRange]);

  if (loading) {
    return (
      <section className="container mx-auto p-4 min-h-[92vh]">
        <div className="flex justify-center items-center min-h-[80vh]">
          <LoaderCircle className="animate-spin" />
        </div>
      </section>
    );
  }
  if ((data === null || data.length === 0) && !loading) {
    return (
      <section className="container mx-auto p-4 min-h-[92vh]">
        <div className="flex justify-end items-center mb-4">
          <SelectionToggle dateRange={dateRange} setDateRange={setDateRange} />
        </div>
        <div className="flex space-y-4 flex-col justify-center items-center min-h-[50vh]  max-w-2xl mx-auto">
          <h1 className="text-2xl font-semibold">No data available</h1>
          <p className="text-primary/50 text-sm text-wrap text-center">
            Possible reasons might be that you have not added the tracking code,
            there is no traffic to your website, or the date range you selected
            has no data.
          </p>
          <p className="text-primary/50 text-sm text-wrap text-center">
            If you think this is an error, please{" "}
            <Link className="underline underline-offset-4" href="/support">
              contact support
            </Link>
            .
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="container mx-auto p-4">
      <div className="flex lg:md:sm:justify-between justify-end items-center mb-4">
        {domain && (
          <h1 className="text-2xl font-semibold lg:md:sm:block hidden">
            {domain}
          </h1>
        )}

        <SelectionToggle dateRange={dateRange} setDateRange={setDateRange} />
      </div>
      <ViewsBarChart data={data} dateRange={dateRange} />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <DevicesCard data={data} />
        <CountryCard data={data} />
        <PathsCard data={data} />
        <ReferrersCard data={data} />
      </div>
    </section>
  );
};

export default AnalyticsPage;
