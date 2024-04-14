import { useEffect, useState } from "react";

interface BrowserData {
  browser: string;
  count: number;
}

const BrowsersCard = ({ data }: { data: BrowserData[] }) => {
  const [browserCounts, setBrowserCounts] = useState<{ [key: string]: number }>(
    {},
  );

  function browserMap(data: BrowserData[]) {
    let browserCount: { [key: string]: number } = {};
    data.forEach((entry) => {
      const browser = entry.browser.toLowerCase();
      if (browser) {
        browserCount[browser] = (browserCount[browser] || 0) + 1;
      }
    });
    const browserCountTitleCase: { [key: string]: number } = Object.keys(
      browserCount,
    ).reduce((acc, key) => {
      acc[key.charAt(0).toUpperCase() + key.slice(1)] = browserCount[key];
      return acc;
    }, {});
    setBrowserCounts(browserCountTitleCase);
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
