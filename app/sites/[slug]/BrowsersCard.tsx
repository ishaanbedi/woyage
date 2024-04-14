import { useEffect, useState } from "react";

const BrowsersCard = ({
  data,
}: {
  data: { browser: string; count: number }[];
}) => {
  const [browserCounts, setBrowserCounts] = useState<{ [key: string]: number }>(
    {}
  );
  function browserMap(data: { browser: string; count: number }[]) {
    const counts: { [key: string]: number } = {};
    data.forEach((entry) => {
      const browser = entry.browser.toLowerCase();
      counts[browser] = (counts[browser] || 0) + entry.count;
    });
    setBrowserCounts(counts);
  }
  useEffect(() => {
    browserMap(data);
  }, [data]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold">Browsers</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(browserCounts).map((browser) => (
          <div
            key={browser}
            className="flex items-center justify-between p-2 bg-gray-100 rounded-lg"
          >
            <span>{browser}</span>
            <span>{browserCounts[browser]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowsersCard;