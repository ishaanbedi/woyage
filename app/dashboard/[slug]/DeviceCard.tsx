import { BarList, Card } from "@tremor/react";
interface DeviceStats {
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
const DeviceCard = ({ data }: { data: Analytics[] }) => {
  function getDeviceStats(logs: Analytics[]): DeviceStats[] {
    const deviceCounts: {
      [device: string]: { count: number; originalCase: string };
    } = {};
    logs.forEach((log) => {
      const deviceName = log.device.toLowerCase();
      const originalCaseName = log.device;
      if (deviceCounts[deviceName]) {
        deviceCounts[deviceName].count++;
      } else {
        deviceCounts[deviceName] = { count: 1, originalCase: originalCaseName };
      }
    });

    const deviceStats: DeviceStats[] = [];
    for (const device in deviceCounts) {
      deviceStats.push({
        name: device.charAt(0).toUpperCase() + device.slice(1),
        value: deviceCounts[device].count,
      });
    }

    return deviceStats;
  }

  return <BarList data={getDeviceStats(data)} />;
};
export default DeviceCard;
