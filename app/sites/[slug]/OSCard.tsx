"use client";
import { useEffect, useState } from "react";

const OSCard = ({ data }: { data: { os: string; count: number }[] }) => {
  const [osCounts, setOsCounts] = useState({});
  function osMap(data: { os: string; count: number }[]) {
    const osCounts = {};
    data.forEach((entry) => {
      const os = entry.os.toLowerCase();
      if (osCounts.hasOwnProperty(os)) {
        osCounts[os]++;
      } else {
        osCounts[os] = 1;
      }
    });
    setOsCounts(osCounts);
  }
  useEffect(() => {
    osMap(data);
  }, [data]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold">Operating Systems</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(osCounts).map((os) => (
          <div
            key={os}
            className="flex items-center justify-between p-2 bg-gray-100 rounded-lg"
          >
            <span>{os}</span>
            <span>{osCounts[os]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OSCard;
