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
function getPathStats(logs: Analytics[]): PathStats[] {
  const pathCounts: {
    [path: string]: { count: number; originalCase: string };
  } = {};
  logs.forEach((log) => {
    const pathName = log.path.toLowerCase();
    const originalCaseName = log.path;
    if (pathCounts[pathName]) {
      pathCounts[pathName].count++;
    } else {
      pathCounts[pathName] = {
        count: 1,
        originalCase: originalCaseName,
      };
    }
  });

  const pathStats: PathStats[] = [];
  for (const path in pathCounts) {
    pathStats.push({
      name: pathCounts[path].originalCase,
      value: pathCounts[path].count,
    });
  }
  return pathStats;
}
const PathsCard = ({ data }: { data: Analytics[] }) => {
  return (
    <Card className="mt-2 h-96">
      <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        Paths
      </p>
      <div className="mt-3 h-72 overflow-y-auto">
        <BarList data={getPathStats(data)} />
      </div>
    </Card>
  );
};

export default PathsCard;

interface PathStats {
  name: string;
  value: number;
}
