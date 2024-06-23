import { BarList, Card } from "@tremor/react";
interface OSStats {
  name: string;
  value: number;
}
interface OSStatsWithIcon extends OSStats {
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
const OSCard = ({ data }: { data: Analytics[] }) => {
  function getOSStats(logs: Analytics[]): OSStats[] {
    const osCounts: {
      [os: string]: { count: number; originalCase: string };
    } = {};
    logs.forEach((log) => {
      const osName = log.os.toLowerCase();
      const originalCaseName = log.os;
      if (osCounts[osName]) {
        osCounts[osName].count++;
      } else {
        osCounts[osName] = {
          count: 1,
          originalCase: originalCaseName,
        };
      }
    });

    const OSStats: OSStats[] = [];
    for (const os in osCounts) {
      OSStats.push({
        name: osCounts[os].originalCase,
        value: osCounts[os].count,
      });
    }

    var deviceStatsWithIcon: OSStatsWithIcon[] = [];

    deviceStatsWithIcon = OSStats.map((os: OSStats) => {
      return {
        name: os.name,
        value: os.value,
        icon: function Icon() {
          return (
            <img
              alt={os.name}
              width="20"
              height="20"
              data-nimg="1"
              className="mr-2.5"
              src={`https://uaparser.dev/images/os/${os.name.toLowerCase()}.png`}
            />
          );
        },
      };
    });
    return deviceStatsWithIcon;
  }
  return <BarList data={getOSStats(data)} />;
};

export default OSCard;
