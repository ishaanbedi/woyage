"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
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
  const [dateRange, setDateRange] = useState("today");

  const fetchRecords = async () => {
    var timeFilter;
    // sampleDate = "2024-04-24T20:19:03+00:00"
    var floorDate;
    var ceilDate;
    switch (dateRange) {
      case "today":
        floorDate = new Date();
        floorDate.setHours(0, 0, 0, 0);
        ceilDate = new Date();
        ceilDate.setHours(23, 59, 59, 999);
        break;
      case "yesterday":
        floorDate = new Date();
        floorDate.setDate(floorDate.getDate() - 1);
        floorDate.setHours(0, 0, 0, 0);
        ceilDate = new Date();
        ceilDate.setDate(ceilDate.getDate() - 1);
        ceilDate.setHours(23, 59, 59, 999);
        break;
      case "7":
        floorDate = new Date();
        floorDate.setDate(floorDate.getDate() - 7);
        floorDate.setHours(0, 0, 0, 0);
        ceilDate = new Date();
        ceilDate.setHours(23, 59, 59, 999);
        break;
      case "30":
        floorDate = new Date();
        floorDate.setDate(floorDate.getDate() - 30);
        floorDate.setHours(0, 0, 0, 0);
        ceilDate = new Date();
        ceilDate.setHours(23, 59, 59, 999);
        break;
      case "90":
        floorDate = new Date();
        floorDate.setDate(floorDate.getDate() - 90);
        floorDate.setHours(0, 0, 0, 0);
        ceilDate = new Date();
        ceilDate.setHours(23, 59, 59, 999);
        break;
      case "365":
        floorDate = new Date();
        floorDate.setDate(floorDate.getDate() - 365);
        floorDate.setHours(0, 0, 0, 0);
        ceilDate = new Date();
        ceilDate.setHours(23, 59, 59, 999);
        break;
      case "all":
        floorDate = new Date("2021-01-01");
        ceilDate = new Date();
        break;
    }
    const { data, error } = await supabase
      .from("analytics")
      .select("*")
      .eq("id", params.slug)
      .lte("added_time", ceilDate?.toISOString())
      .gte("added_time", floorDate?.toISOString());

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


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const SelectionToggle = ({
  dateRange,
  setDateRange,
}: {
  dateRange: string;
  setDateRange: (value: string) => void;
}) => {
  return (
    <div>
      <Select value={dateRange} onValueChange={setDateRange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Last 7 days" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="yesterday">Yesterday</SelectItem>
          <SelectItem value="7">Last 7 days</SelectItem>
          <SelectItem value="30">Last 30 days</SelectItem>
          <SelectItem value="90">Last 90 days</SelectItem>
          <SelectItem value="365">Last 365 days</SelectItem>
          <SelectItem value="all">All time</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};