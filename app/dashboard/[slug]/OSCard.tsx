import { BarList, Card } from "@tremor/react";
interface OSStats {
  name: string;
  value: number;
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
const OSCard = ({ data }: { data: Analytics[] }) => {
  function getOSStats(logs: Analytics[]): OSStats[] {
    const OSCounts: { [OS: string]: { count: number; originalCase: string } } =
      {};
    logs.forEach((log) => {
      const OSName = log.os.toLowerCase();
      const originalCaseName = log.os;
      if (OSCounts[OSName]) {
        OSCounts[OSName].count++;
      } else {
        OSCounts[OSName] = { count: 1, originalCase: originalCaseName };
      }
    });

    const OSStats: OSStats[] = [];
    for (const OS in OSCounts) {
      OSStats.push({
        name: OSCounts[OS].originalCase,
        value: OSCounts[OS].count,
      });
    }

    return OSStats;
  }

  return (
    <Card className="mt-2 h-96 overflow-y-auto">
      <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
        Operating System
      </h3>
      <BarList data={getOSStats(data)} />
    </Card>
  );
};
export default OSCard;
