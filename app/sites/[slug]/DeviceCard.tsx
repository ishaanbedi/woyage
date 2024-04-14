"use client";
import { useEffect, useState } from "react";

const DeviceCard = ({
  data,
}: {
  data: { device: string; count: number }[];
}) => {
  const [deviceCounts, setDeviceCounts] = useState<{ [key: string]: number }>(
    {},
  );
  function deviceMap(data: { device: string; count: number }[]) {
    const deviceCounts: { [key: string]: number } = {};
    data.forEach((entry) => {
      const device = entry.device.toLowerCase();
      if (deviceCounts.hasOwnProperty(device)) {
        deviceCounts[device]++;
      } else {
        deviceCounts[device] = 1;
      }
    });
    setDeviceCounts(deviceCounts);
  }
  useEffect(() => {
    deviceMap(data);
  }, [data]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold">Devices</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(deviceCounts).map((device) => (
          <div
            key={device}
            className="flex items-center justify-between p-2 bg-gray-100 rounded-lg"
          >
            <span>{device}</span>
            <span>{deviceCounts[device]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceCard;
