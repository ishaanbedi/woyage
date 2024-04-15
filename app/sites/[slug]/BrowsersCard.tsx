import { BarList } from "@tremor/react";
interface BrowserStats {
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
const BrowsersCard = ({ data }: { data: Analytics[] }) => {
  function getBrowserStats(logs: Analytics[]): BrowserStats[] {
    const browserCounts: { [browser: string]: number } = {};
    logs.forEach((log) => {
      const browserName = log.browser.toLowerCase();
      if (browserCounts[browserName]) {
        browserCounts[browserName]++;
      } else {
        browserCounts[browserName] = 1;
      }
    });
    const browserStats: BrowserStats[] = [];
    for (const browser in browserCounts) {
      browserStats.push({ name: browser, value: browserCounts[browser] });
    }
    return browserStats;
  }
  return (
    <div className="shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold">Browsers</h2>
      <BarList data={getBrowserStats(data)} />
    </div>
  );
};

export default BrowsersCard;
