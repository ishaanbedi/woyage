"use client";
import {
  BarList,
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@tremor/react";

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
function getReferrersStats(logs: Analytics[]): ReferrersStats[] {
  const referrersCounts: {
    [path: string]: { count: number; originalCase: string };
  } = {};
  logs.forEach((log) => {
    const referrer = log.referrer === "" ? "Direct" : log.referrer;
    const referrerKey = referrer.toLowerCase();
    if (referrersCounts[referrerKey]) {
      referrersCounts[referrerKey].count += 1;
    } else {
      referrersCounts[referrerKey] = { count: 1, originalCase: referrer };
    }
  });

  const referrersStats: ReferrersStats[] = [];
  for (const referrers in referrersCounts) {
    referrersStats.push({
      name: referrersCounts[referrers].originalCase,
      value: referrersCounts[referrers].count,
    });
  }
  return referrersStats;
}
const ReferrersCard = ({ data }: { data: Analytics[] }) => {
  return (
    <Card className="mt-2 h-96 overflow-y-auto">
      <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        Referrers
      </p>
      <div className="mt-3">
        <BarList data={getReferrersStats(data)} />
      </div>
    </Card>
  );
};

export default ReferrersCard;

interface ReferrersStats {
  name: string;
  value: number;
}
