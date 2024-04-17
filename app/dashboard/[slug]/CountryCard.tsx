import { BarList, Card } from "@tremor/react";
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
    <Card className="mt-2 h-96 overflow-y-auto">
      <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
        Country Stats
      </h3>
      <BarList data={getCountryStats(data)} />
    </Card>
  );
};
export default CountryCard;
