"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import BrowsersCard from "./BrowsersCard";
import CountryCard from "./CountryCard";
import DeviceCard from "./DeviceCard";
import OSCard from "./OSCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AnalyticsPage = ({
  user,
  params,
}: {
  user: User;
  params: { slug: string };
}) => {
  const userEmail = user.email;
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState("1");
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
    } else {
      setData(data);
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
    setLoading(false);
  }, [user, params, dateRange]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (data === null || data.length === 0) {
    return <div>No data found</div>;
  }
  return (
    <section>
      <div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Last 24 hours" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Last hour</SelectItem>
            <SelectItem value="1">Last 24 hours</SelectItem>
            <SelectItem value="2">Last 7 days</SelectItem>
            <SelectItem value="3">Last 30 days</SelectItem>
            <SelectItem value="4">Last 90 days</SelectItem>
            <SelectItem value="5">Last 365 days</SelectItem>
            <SelectItem value="6">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <BrowsersCard data={data} />
        <CountryCard data={data} />
        <DeviceCard data={data} />
        <OSCard data={data} />
      </div>
    </section>
  );
};

export default AnalyticsPage;
