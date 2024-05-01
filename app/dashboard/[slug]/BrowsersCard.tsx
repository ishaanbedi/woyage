import { BarList, Card } from "@tremor/react";
interface BrowserStats {
  name: string;
  value: number;
}
interface BrowserStatsWithIcon extends BrowserStats {
  icon: () => JSX.Element;
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
    const browserCounts: {
      [browser: string]: { count: number; originalCase: string };
    } = {};
    logs.forEach((log) => {
      const browserName = log.browser.toLowerCase();
      const originalCaseName = log.browser;
      if (browserCounts[browserName]) {
        browserCounts[browserName].count++;
      } else {
        browserCounts[browserName] = {
          count: 1,
          originalCase: originalCaseName,
        };
      }
    });

    const browserStats: BrowserStats[] = [];
    for (const browser in browserCounts) {
      browserStats.push({
        name: browserCounts[browser].originalCase,
        value: browserCounts[browser].count,
      });
    }

    var deviceStatsWithIcon: BrowserStatsWithIcon[] = [];

    deviceStatsWithIcon = browserStats.map((browser: BrowserStats) => {
      return {
        name: browser.name,
        value: browser.value,
        icon: function Icon() {
          if (browser.name === "Samsung Internet") {
            return (
              <img
                alt={browser.name}
                width="20"
                height="20"
                data-nimg="1"
                className="mr-2.5"
                src="https://uaparser.js.org/images/browsers/samsung%20browser.png"
              />
            );
          } else {
            return (
              <img
                alt={browser.name}
                width="20"
                height="20"
                data-nimg="1"
                className="mr-2.5"
                src={`https://uaparser.js.org/images/browsers/${browser.name.toLowerCase()}.png`}
              />
            );
          }
        },
      };
    });
    return deviceStatsWithIcon;
  }
  return <BarList data={getBrowserStats(data)} />;
};

export default BrowsersCard;
