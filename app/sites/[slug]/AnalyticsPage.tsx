"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import BrowsersCard from "./BrowsersCard";
import CountryCard from "./CountryCard";
import DeviceCard from "./DeviceCard";
import OSCard from "./OSCard";
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
  const fetchRecords = async () => {
    const { data, error } = await supabase
      .from("analytics")
      .select("*")
      .eq("id", params.slug);
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
  }, [user, params]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (data === null || data.length === 0) {
    return <div>No data found</div>;
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <BrowsersCard data={data} />
      <CountryCard data={data} />
      <DeviceCard data={data} />
      <OSCard data={data} />
    </div>
  );
};

export default AnalyticsPage;
