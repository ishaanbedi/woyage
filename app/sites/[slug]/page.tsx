"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";

export default function Page({ params }: { params: { slug: string } }) {
  const [records, setRecords] = useState([]);
  const supabase = createClient();
  const fetchRecords = async () => {
    const { data, error } = await supabase
      .from("analytics")
      .select()
      .eq("id", params.slug);
    if (error) {
      console.error(error);
    } else {
      setRecords(data);
    }
  };
  useEffect(() => {
    fetchRecords();
  }, []);
  supabase
    .channel("site_domains")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "analytics" },
      fetchRecords,
    )
    .subscribe();
  return (
    <div>
      {(records.length === 0 || !records) && <p>No records found</p>}
      <div className="grid grid-cols-2 gap-4">
        <BrowsersCard data={records} />
        <OSsCard data={records} />
        <DeviceCard data={records} />
        <CountryCard data={records} />
      </div>
    </div>
  );
}

const BrowsersCard = ({
  data,
}: {
  data: { browser: string; count: number }[];
}) => {
  const [browserCounts, setBrowserCounts] = useState({});
  function browserMap(data: { browser: string; count: number }[]) {
    const browserCounts = {};
    data.forEach((entry) => {
      const browser = entry.browser.toLowerCase();
      if (browserCounts.hasOwnProperty(browser)) {
        browserCounts[browser]++;
      } else {
        browserCounts[browser] = 1;
      }
    });
    setBrowserCounts(browserCounts);
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

const OSsCard = ({ data }: { data: { os: string; count: number }[] }) => {
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

const DeviceCard = ({
  data,
}: {
  data: { device: string; count: number }[];
}) => {
  const [deviceCounts, setDeviceCounts] = useState({});
  function deviceMap(data: { device: string; count: number }[]) {
    const deviceCounts = {};
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

const CountryCard = ({
  data,
}: {
  data: { country: string; count: number }[];
}) => {
  const [countryCounts, setCountryCounts] = useState({});
  function countryMap(data: { country: string; count: number }[]) {
    const countryCounts = {};
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
