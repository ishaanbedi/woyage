import { BarChart } from "@tremor/react";
import { Card } from "@/components/ui/card";
function ViewsBarChart({
  data,
  dateRange,
}: {
  data: Analytics[];
  dateRange: string;
}) {
  function generateDailyViews(data: Analytics[], dateRange: string) {
    var totalDays = 0;
    switch (dateRange) {
      case "today":
        totalDays = 0;
        break;
      case "yesterday":
        totalDays = 1;
        break;
      case "7":
        totalDays = 7;
        break;
      case "30":
        totalDays = 30;
        break;
      case "90":
        totalDays = 90;
        break;
      case "365":
        totalDays = 365;
        break;
      case "all":
        totalDays = -1;
        break;
    }
    var array: { name: string; Views: number }[] = [];
    if (totalDays === 0) {
      var currentTime = new Date();
      for (let i = 0; i <= currentTime.getHours() + 1; i++) {
        var count = 0;
        for (let j = 0; j < data.length; j++) {
          var added_time = new Date(data[j].added_time);
          var added_hour = added_time.getHours();
          if (added_hour === i) {
            count++;
          }
        }
        array.push({
          name: i === 0 ? "12 AM" : i === 12 ? "12 PM" : i > 12 ? i - 12 + " PM" : i + " AM",
          Views: count,
        });
      }
      return array;
    }

    if (totalDays === 1) {
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      var yesterdayStartHour = new Date(yesterday.setHours(0, 0, 0, 0));
      var yesterdayEndHour = new Date(yesterday.setHours(23, 59, 59, 999));
      for (let i = 0; i <= 24; i++) {
        var count = 0;
        for (let j = 0; j < data.length; j++) {
          var added_time = new Date(data[j].added_time);
          if (added_time >= yesterdayStartHour && added_time <= yesterdayEndHour) {
            var added_hour = added_time.getHours();
            if (added_hour === i) {
              count++;
            }
          }
        }
        array.push({
          name: i === 0 ? "12 AM" : i === 12 ? "12 PM" : i > 12 ? i - 12 + " PM" : i + " AM",
          Views: count,
        });
      }
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
        name: dateString.split("-").reverse().join("-"),
        Views: count,
      });
    }
    array.sort((a, b) => {
      var dateA = new Date(a.name);
      var dateB = new Date(b.name);
      return dateA.getTime() - dateB.getTime();
    });
    array.reverse();
    return array;
  }

  return (
    <>
      <Card>
        <BarChart
          data={generateDailyViews(data, dateRange)}
          index="name"
          categories={['Views']}
          colors={['blue']}
          yAxisWidth={48}
        />
      </Card>
    </>
  );
}

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

export default ViewsBarChart;

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