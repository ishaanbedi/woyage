"use client";
import BrowsersCard from "./BrowsersCard";
import DeviceCard from "./DeviceCard";
import OSCard from "./OSCard";
import {
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@tremor/react";

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
const DevicesCard = ({ data }: { data: Analytics[] }) => {
  return (
    <Card className="mt-2 h-96 overflow-y-auto">
      <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        Devices
      </p>
      <TabGroup>
        <TabList className="mt-4">
          <Tab>Browsers</Tab>
          <Tab>Devices</Tab>
          <Tab>Operating Systems</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BrowsersCard data={data} />
          </TabPanel>
          <TabPanel>
            <DeviceCard data={data} />
          </TabPanel>
          <TabPanel>
            <OSCard data={data} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
};

export default DevicesCard;
