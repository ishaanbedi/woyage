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
    <Card className="mt-2 h-96">
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
            <div className="mt-3 h-60 overflow-y-auto">
              <BrowsersCard data={data} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-3 h-60 overflow-y-auto">
              <DeviceCard data={data} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-3 h-60 overflow-y-auto">
              <OSCard data={data} />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
};

export default DevicesCard;
