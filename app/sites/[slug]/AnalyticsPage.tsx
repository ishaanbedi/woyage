"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import BrowsersCard from "./BrowsersCard";
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
  const [data, setData] = useState([]);
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
  return (
    <div>
      <BrowsersCard data={data} />
    </div>
  );
};

export default AnalyticsPage;
