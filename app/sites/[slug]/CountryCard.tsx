"use client";
import { useEffect, useState } from "react";

const CountryCard = ({
  data,
}: {
  data: { country: string; count: number }[];
}) => {
  const [countryCounts, setCountryCounts] = useState<{ [key: string]: number }>(
    {},
  );
  function countryMap(data: { country: string; count: number }[]) {
    const countryCounts: { [key: string]: number } = {};
    data.forEach((entry) => {
      const country = entry.country.toLowerCase();
      if (countryCounts.hasOwnProperty(country)) {
        countryCounts[country]++;
      } else {
        countryCounts[country] = 1;
      }
    });
    setCountryCounts(countryCounts);
  }
  useEffect(() => {
    countryMap(data);
  }, [data]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold">Countries</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(countryCounts).map((country) => (
          <div
            key={country}
            className="flex items-center justify-between p-2 bg-gray-100 rounded-lg"
          >
            <span>{country}</span>
            <span>{countryCounts[country]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryCard;
