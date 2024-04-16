import { BarList } from "@tremor/react";
interface CountryStats {
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
const CountryCard = ({ data }: { data: Analytics[] }) => {
  function getCountryStats(logs: Analytics[]): CountryStats[] {
    const countryCounts: { [country: string]: number } = {};
    logs.forEach((log) => {
      const countryName = log.country.toLowerCase();
      if (countryCounts[countryName]) {
        countryCounts[countryName]++;
      } else {
        countryCounts[countryName] = 1;
      }
    });
    const countryStats: CountryStats[] = [];
    for (const country in countryCounts) {
      countryStats.push({ name: country, value: countryCounts[country] });
    }
    return countryStats;
  }
  return (
    <div className="shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold">Country</h2>
      <BarList data={getCountryStats(data)} />
    </div>
  );
};
export default CountryCard;
