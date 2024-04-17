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
    const OSCounts: { [OS: string]: number } = {};
    logs.forEach((log) => {
      const OSName = log.os.toLowerCase();
      if (OSCounts[OSName]) {
        OSCounts[OSName]++;
      } else {
        OSCounts[OSName] = 1;
      }
    });
    const OSStats: OSStats[] = [];
    for (const OS in OSCounts) {
      OSStats.push({ name: OS, value: OSCounts[OS] });
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
