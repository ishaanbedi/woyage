import { BarList } from "@tremor/react";
interface CountryStats {
  name: string;
  value: number;
}
import {
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@tremor/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CountryStatsWithFlag extends CountryStats {
  icon: () => JSX.Element;
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
  language: string;
}
const CountryCard = ({ data }: { data: Analytics[] }) => {
  function getCountryStats(logs: Analytics[]): CountryStats[] {
    const countryCounts: {
      [country: string]: { count: number; originalCase: string };
    } = {};
    logs.forEach((log) => {
      const countryName = log.country.toLowerCase();
      const originalCaseName = log.country;
      if (countryCounts[countryName]) {
        countryCounts[countryName].count++;
      } else {
        countryCounts[countryName] = {
          count: 1,
          originalCase: originalCaseName,
        };
      }
    });

    var countryStats: CountryStats[] = [];
    for (const country in countryCounts) {
      countryStats.push({
        name: countryCounts[country].originalCase,
        value: countryCounts[country].count,
      });
    }
    var countryStatsWithFlag: CountryStatsWithFlag[] = [];
    countryStatsWithFlag = countryStats.map((country: CountryStats) => {
      return {
        name: country.name,
        value: country.value,
        icon: function Icon() {
          return (
            <img
              src={`https://flag.vercel.app/m/${getCountryCode(country.name)}.svg`}
              alt={country.name}
              className="mr-2.5 h-3 mt-1 w-4"
            />
          );
        },
      };
    });

    return countryStatsWithFlag;
  }
  function getLanguageStats(logs: Analytics[]): CountryStats[] {
    const languageCounts: {
      [country: string]: { count: number; originalCase: string };
    } = {};
    logs.forEach((log) => {
      const countryName = log.language.toLowerCase();
      const originalCaseName = log.language;
      if (languageCounts[countryName]) {
        languageCounts[countryName].count++;
      } else {
        languageCounts[countryName] = {
          count: 1,
          originalCase: originalCaseName,
        };
      }
    });

    var countryStats: CountryStats[] = [];
    for (const country in languageCounts) {
      countryStats.push({
        name: languageCounts[country].originalCase,
        value: languageCounts[country].count,
      });
    }

    return countryStats;
  }

  return (
    <Card className="mt-2 h-96">
      <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        Countries & Languages
      </p>
      <TabGroup>
        <TabList className="mt-4">
          <Tab>Countries</Tab>
          <Tab>Languages</Tab>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Tab disabled className="cursor-not-allowed">
                  Cities
                </Tab>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming up soon!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="mt-3 h-60 overflow-y-auto">
              <BarList data={getCountryStats(data)} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-3 h-60 overflow-y-auto">
              <BarList data={getLanguageStats(data)} />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
};
export default CountryCard;

function getCountryCode(countryName: string) {
  var isoCountries: { [key: string]: string } = {
    AF: "Afghanistan",
    AX: "Aland Islands",
    AL: "Albania",
    DZ: "Algeria",
    AS: "American Samoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarctica",
    AG: "Antigua And Barbuda",
    AR: "Argentina",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaijan",
    BS: "Bahamas",
    BH: "Bahrain",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Belarus",
    BE: "Belgium",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivia",
    BA: "Bosnia And Herzegovina",
    BW: "Botswana",
    BV: "Bouvet Island",
    BR: "Brazil",
    IO: "British Indian Ocean Territory",
    BN: "Brunei Darussalam",
    BG: "Bulgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Cambodia",
    CM: "Cameroon",
    CA: "Canada",
    CV: "Cape Verde",
    KY: "Cayman Islands",
    CF: "Central African Republic",
    TD: "Chad",
    CL: "Chile",
    CN: "China",
    CX: "Christmas Island",
    CC: "Cocos (Keeling) Islands",
    CO: "Colombia",
    KM: "Comoros",
    CG: "Congo",
    CD: "Congo, Democratic Republic",
    CK: "Cook Islands",
    CR: "Costa Rica",
    CI: "Cote D'Ivoire",
    HR: "Croatia",
    CU: "Cuba",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DK: "Denmark",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominican Republic",
    EC: "Ecuador",
    EG: "Egypt",
    SV: "El Salvador",
    GQ: "Equatorial Guinea",
    ER: "Eritrea",
    EE: "Estonia",
    ET: "Ethiopia",
    FK: "Falkland Islands (Malvinas)",
    FO: "Faroe Islands",
    FJ: "Fiji",
    FI: "Finland",
    FR: "France",
    GF: "French Guiana",
    PF: "French Polynesia",
    TF: "French Southern Territories",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgia",
    DE: "Germany",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Greece",
    GL: "Greenland",
    GD: "Grenada",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GG: "Guernsey",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Heard Island & Mcdonald Islands",
    VA: "Holy See (Vatican City State)",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hungary",
    IS: "Iceland",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran, Islamic Republic Of",
    IQ: "Iraq",
    IE: "Ireland",
    IM: "Isle Of Man",
    IL: "Israel",
    IT: "Italy",
    JM: "Jamaica",
    JP: "Japan",
    JE: "Jersey",
    JO: "Jordan",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KI: "Kiribati",
    KR: "Korea",
    KW: "Kuwait",
    KG: "Kyrgyzstan",
    LA: "Lao People's Democratic Republic",
    LV: "Latvia",
    LB: "Lebanon",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libyan Arab Jamahiriya",
    LI: "Liechtenstein",
    LT: "Lithuania",
    LU: "Luxembourg",
    MO: "Macao",
    MK: "Macedonia",
    MG: "Madagascar",
    MW: "Malawi",
    MY: "Malaysia",
    MV: "Maldives",
    ML: "Mali",
    MT: "Malta",
    MH: "Marshall Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MU: "Mauritius",
    YT: "Mayotte",
    MX: "Mexico",
    FM: "Micronesia, Federated States Of",
    MD: "Moldova",
    MC: "Monaco",
    MN: "Mongolia",
    ME: "Montenegro",
    MS: "Montserrat",
    MA: "Morocco",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Netherlands",
    AN: "Netherlands Antilles",
    NC: "New Caledonia",
    NZ: "New Zealand",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Norfolk Island",
    MP: "Northern Mariana Islands",
    NO: "Norway",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestinian Territory, Occupied",
    PA: "Panama",
    PG: "Papua New Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Philippines",
    PN: "Pitcairn",
    PL: "Poland",
    PT: "Portugal",
    PR: "Puerto Rico",
    QA: "Qatar",
    RE: "Reunion",
    RO: "Romania",
    RU: "Russian Federation",
    RW: "Rwanda",
    BL: "Saint Barthelemy",
    SH: "Saint Helena",
    KN: "Saint Kitts And Nevis",
    LC: "Saint Lucia",
    MF: "Saint Martin",
    PM: "Saint Pierre And Miquelon",
    VC: "Saint Vincent And Grenadines",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Sao Tome And Principe",
    SA: "Saudi Arabia",
    SN: "Senegal",
    RS: "Serbia",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SG: "Singapore",
    SK: "Slovakia",
    SI: "Slovenia",
    SB: "Solomon Islands",
    SO: "Somalia",
    ZA: "South Africa",
    GS: "South Georgia And Sandwich Isl.",
    ES: "Spain",
    LK: "Sri Lanka",
    SD: "Sudan",
    SR: "Suriname",
    SJ: "Svalbard And Jan Mayen",
    SZ: "Swaziland",
    SE: "Sweden",
    CH: "Switzerland",
    SY: "Syrian Arab Republic",
    TW: "Taiwan",
    TJ: "Tajikistan",
    TZ: "Tanzania",
    TH: "Thailand",
    TL: "Timor-Leste",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad And Tobago",
    TN: "Tunisia",
    TR: "Turkey",
    TM: "Turkmenistan",
    TC: "Turks And Caicos Islands",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraine",
    AE: "United Arab Emirates",
    GB: "United Kingdom",
    US: "United States",
    UM: "United States Outlying Islands",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VU: "Vanuatu",
    VE: "Venezuela",
    VN: "Viet Nam",
    VG: "Virgin Islands, British",
    VI: "Virgin Islands, U.S.",
    WF: "Wallis And Futuna",
    EH: "Western Sahara",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabwe",
  };
  for (var key in isoCountries) {
    if (isoCountries[key] === countryName) {
      return key;
    }
  }
}
