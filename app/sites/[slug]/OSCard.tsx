import { BarList } from "@tremor/react";
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
    <div className="shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold">Operating System</h2>
      <BarList data={getOSStats(data)} />
    </div>
  );
};
export default OSCard;
