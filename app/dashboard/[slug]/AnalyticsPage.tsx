"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import BrowsersCard from "./BrowsersCard";
import CountryCard from "./CountryCard";
import DeviceCard from "./DeviceCard";
import OSCard from "./OSCard";
import SelectionToggle from "./SelectionToggle";
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
}
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
      <SelectionToggle dateRange={dateRange} setDateRange={setDateRange} />
      <BarChartUsageExample data={data} dateRange={dateRange} />
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

import { BarChart } from "@tremor/react";
function BarChartUsageExample({
  data,
  dateRange,
}: {
  data: Analytics[];
  dateRange: string;
}) {
  function generateDailyViews(data: Analytics[], dateRange: string) {
    var totalDays = 0;
    switch (dateRange) {
      case "0":
        totalDays = 0;
        break;
      case "1":
        totalDays = 1;
        break;
      case "2":
        totalDays = 7;
        break;
      case "3":
        totalDays = 30;
        break;
      case "4":
        totalDays = 90;
        break;
      case "5":
        totalDays = 365;
        break;
      case "6":
        totalDays = -1;
        break;
    }
    var array: { name: string; Views: number }[] = [];
    if (totalDays === 0) {
      for (let i = 0; i < 24; i++) {
        var date = new Date();
        date.setHours(date.getHours() - i);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var hour = date.getHours();
        var dateString = year + "-" + month + "-" + day + " " + hour + ":00";
        var count = 0;
        for (let j = 0; j < data.length; j++) {
          var added_time = new Date(data[j].added_time);
          var added_day = added_time.getDate();
          var added_month = added_time.getMonth() + 1;
          var added_year = added_time.getFullYear();
          var added_hour = added_time.getHours();
          var added_dateString =
            added_year +
            "-" +
            added_month +
            "-" +
            added_day +
            " " +
            added_hour +
            ":00";
          if (dateString === added_dateString) {
            count++;
          }
        }
        array.push({
          name: dateString,
          Views: count,
        });
      }
      array.sort(function (a, b) {
        return new Date(a.name).getTime() - new Date(b.name).getTime();
      });
      return array;
    }
    if (totalDays === -1) {
      const sortedData = data.sort((a, b) => {
        return (
          new Date(a.added_time).getTime() - new Date(b.added_time).getTime()
        );
      });
      if (sortedData.length === 0) {
        return [];
      }
      const firstYear = new Date(sortedData[0].added_time).getFullYear();
      const currentYear = new Date().getFullYear();

      const yearlyViews: { [key: string]: number } = {};
      sortedData.forEach((record) => {
        const year = new Date(record.added_time).getFullYear();
        yearlyViews[year] = (yearlyViews[year] || 0) + 1;
      });

      for (let year = firstYear; year <= currentYear; year++) {
        if (!(year in yearlyViews)) {
          yearlyViews[year] = 0;
        }
      }

      const array = Object.keys(yearlyViews).map((year) => ({
        name: year,
        Views: yearlyViews[year],
      }));
      array.sort((a, b) => parseInt(a.name) - parseInt(b.name));
      return array;
    }

    for (let i = 0; i < totalDays; i++) {
      var date = new Date();
      date.setDate(date.getDate() - i);
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var dateString = year + "-" + month + "-" + day;
      var count = 0;
      for (let j = 0; j < data.length; j++) {
        var added_time = new Date(data[j].added_time);
        var added_day = added_time.getDate();
        var added_month = added_time.getMonth() + 1;
        var added_year = added_time.getFullYear();
        var added_dateString = added_year + "-" + added_month + "-" + added_day;
        if (dateString === added_dateString) {
          count++;
        }
      }
      array.push({
        name: dateString,
        Views: count,
      });
    }
    array.sort(function (
      a: { name: string; Views: number },
      b: { name: string; Views: number },
    ) {
      var dateA = new Date(a.name),
        dateB = new Date(b.name);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
    return array;
  }

  return (
    <>
      <BarChart
        className="mt-6"
        data={generateDailyViews(data, dateRange)}
        index="name"
        categories={["Views"]}
        yAxisWidth={48}
      />
    </>
  );
}
