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
    const deviceCounts: { [device: string]: number } = {};
    logs.forEach((log) => {
      const deviceName = log.device.toLowerCase();
      if (deviceCounts[deviceName]) {
        deviceCounts[deviceName]++;
      } else {
        deviceCounts[deviceName] = 1;
      }
    });
    const deviceStats: DeviceStats[] = [];
    for (const device in deviceCounts) {
      deviceStats.push({ name: device, value: deviceCounts[device] });
    }
    return deviceStats;
  }
  return (
    <Card className="mt-2 h-96 overflow-y-auto">
      <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
        Device Stats
      </h3>
      <BarList data={getDeviceStats(data)} />
    </Card>
  );
};
export default DeviceCard;
