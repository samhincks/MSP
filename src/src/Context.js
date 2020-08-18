import domainConfig from "./domainConfig.json";
import { createConnector } from "./Connector/createConnector.js"
import sourceConfig from "./sourceConfig.json";
import attributeConfig from "./attributeConfig.json";
import SourceSelector from './DataInterface/SourceSelector.js';

//.. Instantiate a Default Source for the Domain
//.. this entails that when switching from codelist to data interface, initDomain always goes to [2]
let initDomain = domainConfig.domains[0];
if (window.location.pathname.startsWith('/datainterface')) initDomain = domainConfig.domains[1];
if (window.location.pathname === '/datainterface/ciel') initDomain = domainConfig.domains[1];
if (window.location.pathname === '/datainterface/rainbow') initDomain = domainConfig.domains[2];
// todo: fix this hack by proper usage of h-istory

let initSources = initDomain.sources;
let initSourceOfDomain = initSources[0];
let initMetadataSets = null; //.. metadatasets are set with help of Source class because sometimes they autopopulate with API call
let initMetadataSet = null;
console.log("%c REINITIALIZING WINDOW", "color:turquoise");
let connector = createConnector(initSourceOfDomain, sourceConfig, attributeConfig);

// todo: put this in domainConfig and decide if you then want options there as well
/*let initialFilterValues = {
  fiscal: "All",
  type: "All",
  dataSet: "All",
  source: "MER",
  frequency: "All",
  indicator: "All"
}*/

//.. TODO make default be specified by the ID

export const initialState = {
  title: 'Welcome to the OCL Metadata Browser',
  group: 'testing',
  user: '',
  domains: domainConfig.domains,
  domain: initDomain,
  sources: initSources,
  source: initSourceOfDomain,
  metadataSets: initMetadataSets, // a set of metadatasets for a source as known from domain config or API request
  metadataSet: initMetadataSet, // the currently selected metadataSet
  connector: connector, // a connector corresponding to a source
  searchResults: {
    entries: [],
    names: []
  }, // searchResults for a metadataset as retrieved with API request
  displayedResults: null, //  only set if searchResults lacks paging
  dataElements: [], //.. same as searchResults in vocabulary of PepfarDataView, todo: reconcile
  filterValues: {},
  limit: 25,
  pageNum: 1,
  selectedDataElement: [],
  dataElementDetail: {},
  detailPanel: {
    top: false,
    left: false,
    bottom: false,
    right: false,
  },
  search: "",
  password: '',
  indicatorName: '',
  currentIndicator: [],
  matchDataElements: [],
  data_Elements: [
    {
      name: 'VMMC_CIRC (N, DSD, Age/Sex/HIVStatus/ScreenResult/ScreenVisitType)',
      source: 'DATIM',
      type: 'Results',
      fiscal: '2020',
      dataSet: 'facility',
      frequency: 'quarterly',
      indicator: 'VMMC_CIRC',
      indicatorCode: 'CXCA_SCRN (including CXCA_SCRN_POS)',
      category: 'On ART screened for cervical cancer',
      description: 'Number of HIV-positive women on ART screened for cervical cancer, Facilis hac ornare voluptatibus consequatur corporis, sollicitudin libero, netus quisquam eget sequi modi montes litora parturient at',
      shortName: 'CXCA_SCRN (N, DSD, Age/Sex/HIV/Scrn/Visit)', code: 'CXCA_SCRN_N_DSD_Age_Sex_HIV_Scrn_Visit',
      uid: 'XWK6yAwhol8',
      version: '2020-v2',
      readableNumerator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised',
      readableDenominator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, DSD, TechFollowUp>14days/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp>14days/Sex): Voluntary Circumcised',
      uidNumerator: '( #{cObJTp3DWdY} + #{oIOtyrMpzGE} )',
      uidDenominator: '( #{cObJTp3DWdY} + #{tUWykiXBnjC} + #{oIOtyrMpzGE} + #{ZaVDy67viEs} )',
      indicatorChanges: 'New Indicator', reportFrequency: 'Semi-Annually', reportingLevel: 'Facility',
      combos: [
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - First Time, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'dh4TQ68p2SC',
          ageGroup: '15-19',
          visitType: 'firstTime',
          visitResult: 'positive',
        },
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - Follow Up, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'wIDT7S8yul9',
          ageGroup: '15-19',
          visitType: 'followUp',
          visitResult: 'negative',

        },
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - Follow Up, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'wIDT7S8yul9',
          ageGroup: '20-24',
          visitType: 'rescreened',
          visitResult: 'suspected',

        }
      ],
      pdh: ['gPKbuvvpose', 'a9FUCU6f7WU'],
      moh: ['gPKbuvvpose', 'a9FUCU6f7WU']
    },
    {
      name: 'VMMC_CIRC (N, DSD, Age/Sex/HIVStatus/ScreenResult/)',
      source: 'DATIM',
      type: 'Results',
      fiscal: '2020',
      dataSet: 'facility',
      frequency: 'quarterly',
      indicator: 'VMMC_CIRC',
      indicatorCode: 'CXCA_SCRN (including CXCA_SCRN_POS)',
      category: 'On ART screened for cervical cancer',
      description: 'Number of HIV-positive women on ART screened for cervical cancer, Facilis hac ornare voluptatibus consequatur corporis, sollicitudin libero, netus quisquam eget sequi modi montes litora parturient at',
      shortName: 'CXCA_SCRN (N, DSD, Age/Sex/HIV/Scrn/Visit)', code: 'CXCA_SCRN_N_DSD_Age_Sex_HIV_Scrn_Visit',
      uid: 'XWK6yAwhol8',
      version: '2020-v2',
      readableNumerator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised',
      readableDenominator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, DSD, TechFollowUp>14days/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp>14days/Sex): Voluntary Circumcised',
      uidNumerator: '( #{cObJTp3DWdY} + #{oIOtyrMpzGE} )',
      uidDenominator: '( #{cObJTp3DWdY} + #{tUWykiXBnjC} + #{oIOtyrMpzGE} + #{ZaVDy67viEs} )',
      indicatorChanges: 'New Indicator', reportFrequency: 'Semi-Annually', reportingLevel: 'Facility',
      combos: [
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - First Time, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'dh4TQ68p2SC',
          ageGroup: '15-19',
          visitType: 'firstTime',
          visitResult: 'positive',
        },
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - Follow Up, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'wIDT7S8yul9',
          ageGroup: '15-19',
          visitType: 'followUp',
          visitResult: 'negative',

        },
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - Follow Up, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'wIDT7S8yul9',
          ageGroup: '20-24',
          visitType: 'rescreened',
          visitResult: 'suspected',

        }
      ],
      pdh: ['gPKbuvvpose'],
      moh: []
    },
    {
      name: 'VMMC_CIRC (N, DSD, Age/Sex/HIVStatus/ScreenResult/fs)',
      source: 'DATIM',
      type: 'Results',
      fiscal: '2020',
      dataSet: 'facility',
      frequency: 'quarterly',
      indicator: 'VMMC_CIRC',
      indicatorCode: 'CXCA_SCRN (including CXCA_SCRN_POS)',
      category: 'On ART screened for cervical cancer',
      description: 'Number of HIV-positive women on ART screened for cervical cancer, Facilis hac ornare voluptatibus consequatur corporis, sollicitudin libero, netus quisquam eget sequi modi montes litora parturient at',
      shortName: 'CXCA_SCRN (N, DSD, Age/Sex/HIV/Scrn/Visit)', code: 'CXCA_SCRN_N_DSD_Age_Sex_HIV_Scrn_Visit',
      uid: 'XWK6yAwhol8',
      version: '2020-v1',
      readableNumerator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised',
      readableDenominator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, DSD, TechFollowUp>14days/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp>14days/Sex): Voluntary Circumcised',
      uidNumerator: '( #{cObJTp3DWdY} + #{oIOtyrMpzGE} )',
      uidDenominator: '( #{cObJTp3DWdY} + #{tUWykiXBnjC} + #{oIOtyrMpzGE} + #{ZaVDy67viEs} )',
      indicatorChanges: 'New Indicator', reportFrequency: 'Semi-Annually', reportingLevel: 'Facility',
      combos: [
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - First Time, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'dh4TQ68p2SC',
          ageGroup: '15-19',
          visitType: 'firstTime',
          visitResult: 'positive',
        },
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - Follow Up, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'wIDT7S8yul9',
          ageGroup: '15-19',
          visitType: 'followUp',
          visitResult: 'negative',

        },
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - Follow Up, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'wIDT7S8yul9',
          ageGroup: '20-24',
          visitType: 'rescreened',
          visitResult: 'suspected',

        }
      ],
      pdh: ['a9FUCU6f7WU'],
      moh: []
    },
    {
      name: 'VMMC_CIRC (N, DSD, Age/Sex/HIVStatus/ScreenResult/dfas)',
      source: 'DATIM',
      type: 'Results',
      fiscal: '2020',
      dataSet: 'facility',
      frequency: 'quarterly',
      indicator: 'VMMC_CIRC',
      indicatorCode: 'CXCA_SCRN (including CXCA_SCRN_POS)',
      category: 'On ART screened for cervical cancer',
      description: 'Number of HIV-positive women on ART screened for cervical cancer, Facilis hac ornare voluptatibus consequatur corporis, sollicitudin libero, netus quisquam eget sequi modi montes litora parturient at',
      shortName: 'CXCA_SCRN (N, DSD, Age/Sex/HIV/Scrn/Visit)', code: 'CXCA_SCRN_N_DSD_Age_Sex_HIV_Scrn_Visit',
      uid: 'XWK6yAwhol8',
      version: '2020-v1',
      readableNumerator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised',
      readableDenominator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, DSD, TechFollowUp>14days/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp>14days/Sex): Voluntary Circumcised',
      uidNumerator: '( #{cObJTp3DWdY} + #{oIOtyrMpzGE} )',
      uidDenominator: '( #{cObJTp3DWdY} + #{tUWykiXBnjC} + #{oIOtyrMpzGE} + #{ZaVDy67viEs} )',
      indicatorChanges: 'New Indicator', reportFrequency: 'Semi-Annually', reportingLevel: 'Facility',
      combos: [
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - First Time, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'dh4TQ68p2SC',
          ageGroup: '15-19',
          visitType: 'firstTime',
          visitResult: 'positive',
        },
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - Follow Up, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'wIDT7S8yul9',
          ageGroup: '15-19',
          visitType: 'followUp',
          visitResult: 'negative',

        },
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - Follow Up, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'wIDT7S8yul9',
          ageGroup: '20-24',
          visitType: 'rescreened',
          visitResult: 'suspected',

        }
      ],
      pdh: ['gPKbuvvpose', 'a9FUCU6f7WU'],
      moh: ['a9FUCU6f7WU']
    },

    {
      name: 'CXCA_SCRN (N, TA, Age/Sex/HIVStatus/ScreenResult/ScreenVisitType)',
      source: 'DATIM',
      type: 'Target',
      fiscal: '2019',
      dataSet: 'facility',
      frequency: 'semiAnnual',
      indicatorCode: 'CXCA_SCRN (including CXCA_SCRN_POS)',
      category: 'On ART eligible for treatment',
      description: 'Voluptatum nisl nobis! Feugiat et facilisi vehicula quos. Doloribus exercitationem cursus diamlorem, suscipit cupidatat egestas, architecto',
      shortName: 'CXCA_SCRN (N, DSD, Age/Sex/HIV/Scrn/Visit)', code: 'CXCA_SCRN_N_DSD_Age_Sex_HIV_Scrn_Visit',
      uid: 'D8gXql7mhrZ',
      readableNumerator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised',
      readableDenominator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, DSD, TechFollowUp>14days/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp>14days/Sex): Voluntary Circumcised',
      uidNumerator: '( #{cObJTp3DWdY} + #{oIOtyrMpzGE} )',
      uidDenominator: '( #{cObJTp3DWdY} + #{tUWykiXBnjC} + #{oIOtyrMpzGE} + #{ZaVDy67viEs} )',
      indicatorChanges: 'New Indicator', reportFrequency: 'Semi-Annually', reportingLevel: 'Facility',
      version: '2019-v1',
      combos: [
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - First Time, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'dh4TQ68p2SC',
          ageGroup: '15-19',
          visitType: 'firstTime',
          visitResult: 'negative',
        }
      ],
      pdh: ['gPKbuvvpose', 'a9FUCU6f7WU'],
      moh: []
    },


    {
      name: 'CXCA_TX (N, DSD, Age/Sex/HIVStatus/TreatmentType/ScreenVisitType)',
      source: 'DATIM',
      type: 'SIMS',
      fiscal: '2018',
      dataSet: 'community',
      frequency: 'quarterly',
      indicatorCode: 'CXCA_SCRN (including CXCA_SCRN_POS)',
      category: 'On ART eligible for treatment ',
      description: 'Voluptatibus velit per, taciti senectus incidunt. Tellus donec commodi nunc, donec convallis',
      shortName: 'CXCA_SCRN (N, DSD, Age/Sex/HIV/Scrn/Visit)', code: 'CXCA_SCRN_N_DSD_Age_Sex_HIV_Scrn_Visit',
      uid: 'Z6qsl1ezjTS',
      readableNumerator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised',
      readableDenominator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, DSD, TechFollowUp>14days/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp>14days/Sex): Voluntary Circumcised',
      uidNumerator: '( #{cObJTp3DWdY} + #{oIOtyrMpzGE} )',
      uidDenominator: '( #{cObJTp3DWdY} + #{tUWykiXBnjC} + #{oIOtyrMpzGE} + #{ZaVDy67viEs} )',
      indicatorChanges: 'New Indicator', reportFrequency: 'Semi-Annually', reportingLevel: 'Facility',
      version: '2018-v2',
      combos: [
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - First Time, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'dh4TQ68p2SC',
          ageGroup: '15-19',
          visitType: 'firstTime',
          visitResult: 'negative',
        }
      ],
      pdh: ['gPKbuvvpose'],
      moh: []
    },

    {
      name: 'CXCA_TX (N, TA, Age/Sex/HIVStatus/TreatmentType/ScreenVisitType)',
      source: 'PDH',
      type: 'SIMS',
      fiscal: '2019',
      dataSet: 'community',
      frequency: 'annual',
      indicatorCode: 'CXCA_SCRN (including CXCA_SCRN_POS)',
      category: 'Services Offered',
      description: 'Nec cubilia maiores, porro accumsan voluptatem proident reprehenderit quisquam! Tellus est rutrum, justo',
      shortName: 'CXCA_SCRN (N, DSD, Age/Sex/HIV/Scrn/Visit)', code: 'CXCA_SCRN_N_DSD_Age_Sex_HIV_Scrn_Visit',
      uid: 'mFvVvrRvZgo',
      readableNumerator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised',
      readableDenominator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, DSD, TechFollowUp>14days/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp>14days/Sex): Voluntary Circumcised',
      uidNumerator: '( #{cObJTp3DWdY} + #{oIOtyrMpzGE} )',
      uidDenominator: '( #{cObJTp3DWdY} + #{tUWykiXBnjC} + #{oIOtyrMpzGE} + #{ZaVDy67viEs} )',
      indicatorChanges: 'New Indicator', reportFrequency: 'Semi-Annually', reportingLevel: 'Facility',
      version: '2019-v1',
      combos: [
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - First Time, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'dh4TQ68p2SC',
          ageGroup: '15-19',
          visitType: 'firstTime',
          visitResult: 'negative',
        }
      ],
      pdh: ['a9FUCU6f7WU'],
      moh: ['a9FUCU6f7WU']
    },

    {
      name: 'EMR_SITE (N, NoApp, Service Delivery Area)',
      source: 'MOH',
      type: 'Results',
      fiscal: '2020',
      dataSet: 'community',
      frequency: 'semiAnnual',
      indicatorCode: 'CXCA_SCRN (including CXCA_SCRN_POS)',
      category: 'Providing voluntary FPS',
      description: 'Feugiat inventore penatibus odio proin, facere sit culpa mi, mauris! Sem, morbi, optio vel cras fugit nesciunt tellus',
      shortName: 'CXCA_SCRN (N, DSD, Age/Sex/HIV/Scrn/Visit)', code: 'CXCA_SCRN_N_DSD_Age_Sex_HIV_Scrn_Visit',
      uid: 'Duf3Ks5vfNL',
      readableNumerator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised',
      readableDenominator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, DSD, TechFollowUp>14days/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp>14days/Sex): Voluntary Circumcised',
      uidNumerator: '( #{cObJTp3DWdY} + #{oIOtyrMpzGE} )',
      uidDenominator: '( #{cObJTp3DWdY} + #{tUWykiXBnjC} + #{oIOtyrMpzGE} + #{ZaVDy67viEs} )',
      indicatorChanges: 'New Indicator', reportFrequency: 'Semi-Annually', reportingLevel: 'Facility',
      version: '2020-v1',
      combos: [
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - First Time, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'dh4TQ68p2SC',
          ageGroup: '15-19',
          visitType: 'firstTime',
          visitResult: 'negative',
        }
      ],
      pdh: ['gPKbuvvpose', 'a9FUCU6f7WU'],
      moh: ['gPKbuvvpose']
    },

    {
      name: 'FPINT_SITE (N, NoApp, Serv Del Point)',
      source: 'PDH',
      type: 'Results',
      fiscal: '2020',
      dataSet: 'community',
      frequency: 'annual',
      indicatorCode: 'CXCA_SCRN (including CXCA_SCRN_POS)',
      category: 'GBV Care',
      description: 'Ipsam dis adipiscing mauris, eleifend laboris distinctio natoque nostrum incididunt? Natoque, fusce',
      shortName: 'CXCA_SCRN (N, DSD, Age/Sex/HIV/Scrn/Visit)', code: 'CXCA_SCRN_N_DSD_Age_Sex_HIV_Scrn_Visit',
      uid: 'GT81rJIJrrd',
      readableNumerator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised',
      readableDenominator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, DSD, TechFollowUp>14days/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp>14days/Sex): Voluntary Circumcised',
      uidNumerator: '( #{cObJTp3DWdY} + #{oIOtyrMpzGE} )',
      uidDenominator: '( #{cObJTp3DWdY} + #{tUWykiXBnjC} + #{oIOtyrMpzGE} + #{ZaVDy67viEs} )',
      indicatorChanges: 'New Indicator', reportFrequency: 'Semi-Annually', reportingLevel: 'Facility',
      version: '2020-v1',
      combos: [
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - First Time, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'dh4TQ68p2SC',
          ageGroup: '15-19',
          visitType: 'firstTime',
          visitResult: 'negative',
        }
      ],
      pdh: ['gPKbuvvpose', 'a9FUCU6f7WU'],
      moh: []
    },

    {
      name: 'GEND_GBV (N, DSD, Age/Sex/PEP)',
      source: 'MOH',
      type: 'Target',
      fiscal: '2020',
      dataSet: 'facility',
      frequency: 'semiAnnual',
      indicatorCode: 'CXCA_SCRN (including CXCA_SCRN_POS)',
      category: 'GBV Care',
      description: 'Morbi minima blandit maecenas, pharetra corporis excepturi vel lacinia a. Class laborum, pretium ad',
      shortName: 'CXCA_SCRN (N, DSD, Age/Sex/HIV/Scrn/Visit)', code: 'CXCA_SCRN_N_DSD_Age_Sex_HIV_Scrn_Visit',
      uid: 'OZ9CHCMYJMS',
      readableNumerator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised',
      readableDenominator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, DSD, TechFollowUp>14days/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp>14days/Sex): Voluntary Circumcised',
      uidNumerator: '( #{cObJTp3DWdY} + #{oIOtyrMpzGE} )',
      uidDenominator: '( #{cObJTp3DWdY} + #{tUWykiXBnjC} + #{oIOtyrMpzGE} + #{ZaVDy67viEs} )',
      indicatorChanges: 'New Indicator', reportFrequency: 'Semi-Annually', reportingLevel: 'Facility',
      version: '2020-v1',
      combos: [
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - First Time, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'dh4TQ68p2SC',
          ageGroup: '15-19',
          visitType: 'firstTime',
          visitResult: 'negative',
        }
      ],
      pdh: ['a9FUCU6f7WU'],
      moh: ['gPKbuvvpose', 'a9FUCU6f7WU']
    },

    {
      name: 'GEND_GBV (N, TA, Age/Sex/PEP)',
      source: 'DATIM',
      type: 'Results',
      fiscal: '2018',
      dataSet: 'community',
      frequency: 'quarterly',
      indicatorCode: 'CXCA_SCRN (including CXCA_SCRN_POS)',
      category: 'GBV Care',
      description: 'Fugiat sed tempora in itaque curae cursus ad, deleniti voluptatibus dictum sagittis quod corporis',
      shortName: 'CXCA_SCRN (N, DSD, Age/Sex/HIV/Scrn/Visit)', code: 'CXCA_SCRN_N_DSD_Age_Sex_HIV_Scrn_Visit',
      uid: 'pKH3YTAShEe',
      readableNumerator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised',
      readableDenominator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, DSD, TechFollowUp>14days/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp>14days/Sex): Voluntary Circumcised',
      uidNumerator: '( #{cObJTp3DWdY} + #{oIOtyrMpzGE} )',
      uidDenominator: '( #{cObJTp3DWdY} + #{tUWykiXBnjC} + #{oIOtyrMpzGE} + #{ZaVDy67viEs} )',
      indicatorChanges: 'New Indicator', reportFrequency: 'Semi-Annually', reportingLevel: 'Facility',
      version: '2018-v3',
      combos: [
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - First Time, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'dh4TQ68p2SC',
          ageGroup: '15-19',
          visitType: 'firstTime',
          visitResult: 'negative',
        }
      ],
      pdh: ['a9FUCU6f7WU'],
      moh: []
    },

    {
      name: 'GEND_GBV (N, TA, Age/Sex/ViolenceType) v2',
      source: 'PDH',
      type: 'Results',
      fiscal: '2019',
      dataSet: 'community',
      frequency: 'semiAnnual',
      indicatorCode: 'CXCA_SCRN (including CXCA_SCRN_POS)',
      category: 'Health Workers',
      description: 'Semper repudiandae expedita et, hendrerit. Repellendus hendrerit! Maiores sagittis, condimentum mus mus quod',
      shortName: 'CXCA_SCRN (N, DSD, Age/Sex/HIV/Scrn/Visit)', code: 'CXCA_SCRN_N_DSD_Age_Sex_HIV_Scrn_Visit',
      uid: 'yoxGr2OW5vT',
      readableNumerator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised',
      readableDenominator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, DSD, TechFollowUp>14days/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp>14days/Sex): Voluntary Circumcised',
      uidNumerator: '( #{cObJTp3DWdY} + #{oIOtyrMpzGE} )',
      uidDenominator: '( #{cObJTp3DWdY} + #{tUWykiXBnjC} + #{oIOtyrMpzGE} + #{ZaVDy67viEs} )',
      indicatorChanges: 'New Indicator', reportFrequency: 'Semi-Annually', reportingLevel: 'Facility',
      version: '2018-v2',
      combos: [
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - First Time, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'dh4TQ68p2SC',
          ageGroup: '15-19',
          visitType: 'firstTime',
          visitResult: 'negative',
        }
      ],
      pdh: ['a9FUCU6f7WU'],
      moh: []
    },

    {
      name: 'HRH_CURR (N, DSD, CadreCategory/FinancialSupport/Expenditure)',
      source: 'PDH',
      type: 'Target',
      fiscal: '2020',
      dataSet: 'facility',
      frequency: 'annual',
      indicatorCode: 'CXCA_SCRN (including CXCA_SCRN_POS)',
      category: 'Number of contacts',
      description: 'Officia quidem. Mollitia illum dolores pede sed ante tellus urna leo magnis deserunt molestiae',
      shortName: 'CXCA_SCRN (N, DSD, Age/Sex/HIV/Scrn/Visit)', code: 'CXCA_SCRN_N_DSD_Age_Sex_HIV_Scrn_Visit',
      uid: 'fpW7iq7zFNN',
      readableNumerator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised',
      readableDenominator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, DSD, TechFollowUp>14days/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp>14days/Sex): Voluntary Circumcised',
      uidNumerator: '( #{cObJTp3DWdY} + #{oIOtyrMpzGE} )',
      uidDenominator: '( #{cObJTp3DWdY} + #{tUWykiXBnjC} + #{oIOtyrMpzGE} + #{ZaVDy67viEs} )',
      indicatorChanges: 'New Indicator', reportFrequency: 'Semi-Annually', reportingLevel: 'Facility',
      version: '2019-v2',
      combos: [
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - First Time, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'dh4TQ68p2SC',
          ageGroup: '15-19',
          visitType: 'firstTime',
          visitResult: 'negative',
        }
      ],
      pdh: ['gPKbuvvpose'],
      moh: ['gPKbuvvpose']
    },

    {
      name: 'HTS_INDEX_FAC (N, DSD, Age Aggregated/Sex/Contacts)',
      source: 'PDH',
      type: 'Results',
      fiscal: '2020',
      dataSet: 'community',
      frequency: 'quarterly',
      indicatorCode: 'CXCA_SCRN (including CXCA_SCRN_POS)',
      category: 'Number of contacts ',
      description: 'Mollit similique sed sem enim, quaerat modi litora! Impedit volutpat! Consequatur lectus nonummy, orci quisquam',
      shortName: 'CXCA_SCRN (N, DSD, Age/Sex/HIV/Scrn/Visit)', code: 'CXCA_SCRN_N_DSD_Age_Sex_HIV_Scrn_Visit',
      uid: 'wJSHzXjl3ev',
      readableNumerator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised',
      readableDenominator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, DSD, TechFollowUp>14days/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp>14days/Sex): Voluntary Circumcised',
      uidNumerator: '( #{cObJTp3DWdY} + #{oIOtyrMpzGE} )',
      uidDenominator: '( #{cObJTp3DWdY} + #{tUWykiXBnjC} + #{oIOtyrMpzGE} + #{ZaVDy67viEs} )',
      indicatorChanges: 'New Indicator', reportFrequency: 'Semi-Annually', reportingLevel: 'Facility',
      version: '2019-v1',
      combos: [
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - First Time, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'dh4TQ68p2SC',
          ageGroup: '15-19',
          visitType: 'firstTime',
          visitResult: 'negative',
        }
      ],
      pdh: ['gPKbuvvpose', 'a9FUCU6f7WU'],
      moh: []
    },

    {
      name: 'HTS_RECENT (D, DSD, Age/Sex/HIVIndication)',
      source: 'DATIM',
      type: 'Target',
      fiscal: '2020',
      dataSet: 'facility',
      frequency: 'semiAnnual',
      indicatorCode: 'CXCA_SCRN (including CXCA_SCRN_POS)',
      category: 'HTS recently tested',
      description: 'Facere eveniet, labore convallis anim numquam, adipiscing aliquip, odit labore quae incidunt eiusmod libero',
      shortName: 'CXCA_SCRN (N, DSD, Age/Sex/HIV/Scrn/Visit)', code: 'CXCA_SCRN_N_DSD_Age_Sex_HIV_Scrn_Visit',
      uid: 'fSXIwl6nGZV',
      readableNumerator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised',
      readableDenominator: 'VMMC_CIRC (N, DSD, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, DSD, TechFollowUp>14days/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp/Sex): Voluntary Circumcised + VMMC_CIRC (N, TA, TechFollowUp>14days/Sex): Voluntary Circumcised',
      uidNumerator: '( #{cObJTp3DWdY} + #{oIOtyrMpzGE} )',
      uidDenominator: '( #{cObJTp3DWdY} + #{tUWykiXBnjC} + #{oIOtyrMpzGE} + #{ZaVDy67viEs} )',
      indicatorChanges: 'New Indicator', reportFrequency: 'Semi-Annually', reportingLevel: 'Facility',
      version: '2018-v2',
      combos: [
        {
          name: '15-19, Female, Positive, Cervical Cancer Screened - First Time, Cervical Cancer - Suspected',
          code: 'nI9rG3vPWQz',
          uid: 'dh4TQ68p2SC',
          ageGroup: '15-19',
          visitType: 'firstTime',
          visitResult: 'negative',
        }
      ],
      pdh: ['a9FUCU6f7WU'],
      moh: []
    },
  ],
  indicators: [
    {
      name: 'VMMC_CIRC',
      frequency: 'Quarterly',
      level: 'Facility',
      type: 'Target',
      group: 'prevention',
      fiscal: '2020',


      changes: [
        'Age disaggregations updated.',
        'Age disaggregations added to the “HIV Status and Outcome” disaggregate in order for VMMC results to auto-populate into HTS_TST.'
      ],
      description: 'Number of males circumcised as part of the voluntary medical male circumcision (VMMC) for HIV prevention program within the reporting period',
      howtoCalculate: 'Sum results across quarters',

      numerators: {
        name: 'Number of males circumcised',
        description: 'The numerator can be generated by counting the number of males circumcised.',

      },
      disaggregate: {
        'Age (Required)': ['0-60 days, 2 months - 4 years, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'],
        'HIV Status and Outcome by Age (Required)': [
          'Underlined portions auto-populate into the VMMC HTS_TST modality.',
          'Number of HIV-positive clients (tested HIV positive at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of HIV-negative clients (tested HIV negative at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of clients with indeterminate HIV status or not tested for HIV at site (regardless of previous documentation) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25- 29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'
        ],
        'Circumcision Technique (Required)': ['Surgical VMMC', 'Device-based VMMC'],
        'Circumcision Technique/Follow-up Status (Sub-disaggregation of the VMMC circumcision technique disaggregation) (Required)': [
          'Surgical VMMC: Followed-up within 14 days of surgery',
          'Surgical VMMC: Did not follow-up within 14 days of surgery or did not follow-up within the reporting period',
          'Device-based VMMC: Followed-up within 14 days of device placement.',
          'Device-based VMMC: Did not follow-up within 14 days of device placement or did not follow-up within the reporting period'
        ]
      },

      denominator: {
        name: 'N/A',
        description: 'N/A',
        groups: 'N/A',
        disaggregates: 'N/A'
      },
      disaggregateDefination: {
        'N/A': []
      },
      pepfarDef: {
        'Provision of key staff or commodities for VMMC include:': [
          'medical instruments, supplies',
          'medicines needed for the VMMC procedure',
          'funding for salaries for HCW who deliver VMMC services'
        ],
        'Ongoing support for VMMC service delivery improvement includes:': [
          'training of VMMC service providers',
          'clinical mentoring and supportive supervision of HCW at VMMC sites',
          'infrastructure/facility renovation',
          'support of VMMC service-related data collection, reporting, and data quality assessments (DQA)',
          'CQI/EQA of VMMC services at point of service delivery',
          'commodities consumption forecasting and supply chain management support'
        ]
      },
      howToUse: [
        'This indicator tracks the number of male circumcisions conducted during the reporting period and assists in potentially determining coverage of circumcision in the population over time. The total number of males circumcised indicates a change in the supply of and/or demand for VMMC services.',
        'Additionally, disaggregations are required and are used to evaluate whether prioritized services have been successful at reaching the intended population (by age, HIV status, and circumcision technique), targets have been achieved, and whether modeling inputs should be adjusted. An additional level of disaggregation below the circumcision technique level is required for follow-up status, since post-operative clinical assessments are part of good clinical care and low follow-up rates may indicate a problem in program quality.'
      ],
      howToCollect: [
        'The numerator can be generated by counting the number of males circumcised as part of the VMMC for HIV prevention program. This information can generally be found in VMMC Register, or client medical records maintained by each program/site/service provider.'
      ],
      howToReview: [
        'Disaggregations for HIV status and outcome and circumcision technique should be equal to (but not exceed) the numerator.',
        'The circumcision technique by follow-up status disaggregate should be less or equal to the circumcision technique disaggregate.'
      ],
      questions: {
        'Is the age distribution of males 60% or more 15+ years of age?': [
          'Is this age distribution getting older as compared to previous quarters?'
        ],
        'If OU is using compression collar type device for VMMC': [
          'Are they adhering to WHO Guidelines for tetanus immunization?',
          'Were there any tetanus AEs reported?'
        ],
        'What proportion of clients are returning for follow-up (should be at least 80%)?': [],
        'What barriers are there to further scaling up VMMC services?': []
      }

    },


    {
      name: 'TX_NEW',
      frequency: 'Quarterly',
      level: 'Facility',
      type: 'Results',
      group: 'prevention',
      fiscal: '2020',

      changes: [
        'Age/sex disaggregates updated.',
        'Pregnancy disaggregation removed due to confusion with this disaggregation and PMTCT_ART. However, the breastfeeding disaggregate was retained.'
      ],
      description: 'Number of adults and children newly enrolled on antiretroviral therapy (ART)',
      howtoCalculate: 'Sum results across quarters',

      numerators: {
        name: 'Number of adults and children newly enrolled on antiretroviral therapy (ART)',
        description: 'The indicator measures the ongoing scale-up and uptake of ART programs.',

      },
      disaggregate: {
        'Age/Sex [Required]': ['<1 F/M, 1-4 F/M, 5-9 F/M, 10-14 F/M, 15-19 F/M, 20-24 F/M, 25-29 F/M, 30-34 F/M, 35-39 F/M, 40-44 F/M, 45- 49 F/M, 50+ F/M, Unknown Age F/M'],
        'Breastfeeding status at ART initiation [Required]': ['Breastfeeding at initiation of ART'],
        'Key Population Type [Optional]': [
          'People who inject drugs (PWID)',
          'Men who have sex with men (MSM)',
          'Transgender people (TG)',
          'Female sex workers (FSW)',
          'People in prison and other closed settings'
        ]
      },

      denominator: {
        name: 'N/A',
        description: 'N/A',
        groups: 'N/A',
        disaggregates: 'N/A'
      },
      disaggregateDefination: {
        'Age/Sex': ['Age is defined as the age of the patient at the date of initiation on ART, not the age at the date of reporting.']
      },
      pepfarDef: {
        'Provision of key staff or commodities for PLHIV receiving ART includes:': [
          'Ongoing procurement of critical commodities, such as ARVs, or funding for salaries of HCW who deliver HIV treatment services.',
          'Staff who are responsible for the completeness and quality of routine patient records (paper or electronic) can be counted here.',
          'Staff who exclusively fulfill MOH and donor reporting requirements cannot be counted.'
        ],
        'Ongoing support for PLHIV receiving ART service delivery improvement includes:': [
          'clinical mentoring and supportive supervision of staff at HIV sites providing ART',
          'support for quality improvement activities',
          'patient tracking system support',
          'routine support of ART M&E and reporting',
          'commodities consumption forecasting and supply management'
        ]
      },
      howToUse: [
        'The indicator measures the ongoing scale-up and uptake of ART programs. This measure is critical to monitor along with number of patients currently on ART in relation to the number of PLHIV that are estimated to be eligible for treatment to assess progress in the program’s response to the epidemic in specific geographic areas and populations as well as at the national level. This is particularly critical in the context of current revisions to country-specific ART eligibility.',
        'Reporting the number of new patients enrolled on ART at both the national and overall PEPFAR program levels is critical to monitoring the HIV services cascade, specifically the successful linkage between HIV diagnosis and initiating ART. Disaggregation of new on ART by age/sex at ART initiation, pregnancy status at ART initiation, and breastfeeding status at ART initiation is important to understand the percentage of new ART initiations coming from priority populations.'
      ],
      howToCollect: [
        'Facility ART registers/databases, program monitoring tools, or drug supply management systems.',
        '1. The numerator can be generated by counting the number of adults and children who are newly enrolled in ART in the reporting period, in accordance with the nationally approved treatment protocol (or WHO/UNAIDS standards).',
        '2.Patients who known to transfer in from another facility, or who temporarily stopped therapy and have started again should not be counted as new patients.',
        '3. NEW is a state defined by an individual initiating ART during the reporting period. It is expected that the characteristics of new clients are recorded at the time they newly initiate life-long ART. For example, patients who receive post-exposure prophylaxis (PEP), short term ART only for prevention (PrEP), or ART starter pack alone should not be used to count individuals reached with this indicator.',
        'BF disaggregation: Women who initiate ART while breastfeeding should be counted under this indicator but not in PMTCT_ART.',
        'Key population disaggregation* see Appendix A to support the identification of key populations at ART initiation. However, reporting of key population disaggregation should be consistent with what is described under the KP_PREV “How to review for data quality” section on mutual exclusivity of an individual who falls under multiple KP categories (e.g., FSW who injects drugs). In such instances, the individual should only be reported in ONE KP disaggregation category with which s/he is most identified in order to avoid double- counting.',
        'NOTE: both KP-specific and clinical partners have the option to complete these disaggs, but only if safe to maintain these files and to report.'
      ],
      howToReview: [
        'Numerator ≥ subtotal of each disaggregation: The total number of adults and children newly enrolled on ART should be greater or equal to the sum of all of the age/sex disaggregations and pregnancy/ breastfeeding status.',
        'Confirm that TX_CURR ≥ TX_NEW.'
      ],
      questions: {
        'If TX_NEW does NOT equal HTS_TST_POS, explain why.': [],
        'If TX_NEW result is markedly different from targets, explain why.': []
      }
    },
    {
      name: 'PMTCT_STAT (including PMTCT_STAT_POS)',
      frequency: 'Quarterly',
      level: 'Facility',
      type: 'Target',
      group: 'testing',
      fiscal: '2019',


      changes: [
        'Age disaggregates updated.',
        'Removal of separate age-only disaggregate to reduce reporting redundancy.',
        'Addition of “Recent Negative at Entry” disaggregate to account for clients at ANC1 who recently tested negative and are currently ineligible for testing (according to national guidelines) at ANC1.',
        'Language added to clarify that subsequent testing events during pregnancy and breastfeeding will now be reported under a new HTS modality: Post ANC1: Pregnancy/L&D/BF (see HTS_TST reference sheet for additional information).'
      ],
      description: 'Percentage of pregnant women with known HIV status at antenatal care (includes those who already knew their HIV status prior to ANC)',
      howtoCalculate: 'Assuming site level records avoid double counting (as described above) across the annual reporting cycle, sum numerator and denominator across all reporting periods for the annual result.',

      numerators: {
        name: 'Number of pregnant women with known HIV status at first antenatal care visit (ANC1) (includes those who already knew their HIV status prior to ANC1)',
        description: 'The numerator is the sum of the following two data elements: 1)The number of women with a previously known HIV status (both known HIV positive and known negative) attending their first ANC visit (ANC1) for a new pregnancy over the last reporting period. 2)The number of women attending ANC1 who were tested for HIV and received results ',

      },
      disaggregate: {
        'Status and Age (Required)': [
          'Known Positives: <10, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Newly Tested Positives: <10, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'New Negatives: <10, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Recent Negatives at Entry: <10, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'
        ],
        'Circumcision Technique (Required)': ['Surgical VMMC', 'Device-based VMMC'],
        'Circumcision Technique/Follow-up Status (Sub-disaggregation of the VMMC circumcision technique disaggregation) (Required)': [
          'Surgical VMMC: Followed-up within 14 days of surgery',
          'Surgical VMMC: Did not follow-up within 14 days of surgery or did not follow-up within the reporting period',
          'Device-based VMMC: Followed-up within 14 days of device placement.',
          'Device-based VMMC: Did not follow-up within 14 days of device placement or did not follow-up within the reporting period'
        ]
      },

      denominator: {
        name: 'Number of new ANC clients in reporting period',
        description: 'N/A',
        groups: 'Age(Required): <10, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45- 49, 50+, Unknown Age',
        disaggregates: 'N/A'
      },
      disaggregateDefination: {
        'Status and Age:': [
          'Known Positive at entry: Number of pregnant women attending ANC for a new pregnancy who were tested and confirmed HIV-positive at any point prior to the current pregnancy should be reported as known positive at entry. Pregnant women with known HIV status attending ANC for a new pregnancy may not need retesting if they are already on ART, or they may be required to be retested prior to initiating ART based on national guidelines. Known positives who are re-tested and confirmed to be HIV positive prior to initiating ART should still be documented as known positive at entry.',
          'Newly Tested Positive: The number of women attending ANC1 who were tested for HIV and received a positive result. Women who tested negative prior to this pregnancy and are tested again at ANC1 for this new pregnancy should be counted in this indicator.',
          'New Negatives: The number of women attending ANC1 who were tested for HIV and received a negative result. Women who are tested negative prior to this pregnancy and are tested again at ANC1 should be counted in this indicator.',
          'Recent Negative at entry: Number of pregnant women attending ANC for a new pregnancy who recently tested HIV negative and are not eligible – according to country clinical guidelines - for another HIV test at ANC1. For example, women who tested negative within three months of attending ANC1 may not be recommended for testing per country clinical guidelines. This is expected to be a less utilized disaggregate.'

        ]
      },
      pepfarDef: {
        'Provision of key staff or commodities for PMTCT includes:': [
          'test kits',
          'ARVs',
          'lab commodities',
          'funding for salaries of health care workers'
        ],
        'Ongoing support for PMTCT service delivery improvement includes:': [
          'training of PMTCT service providers',
          'clinical mentoring and supportive supervision of PTMCT service sites',
          'infrastructure/renovation of facilities',
          'support for PMTCT service data collection',
          'reporting, data quality',
          'QI/QA of PMTCT services support',
          'ARV consumption forecasting and supply management',
          'support of lab clinical monitoring of patients',
          'supporting patient follow- up/retention',
          'support of mother mentoring programs'
        ]
      },
      howToUse: [
        'Track progress toward ensuring that all pregnant women who attend PEPFAR-supported antenatal care (ANC) know their HIV status and those newly testing positive are initiated on ART.'
      ],
      howToCollect: [
        'The data source is the ANC register. There is a risk of double counting as a pregnant woman could be tested multiple times during one pregnancy; therefore, partners should ensure a data collection and reporting system is in place to minimize double counting, including a longitudinal ANC register (meaning a register that is able to record all information about one pregnancy in one location, with rows or columns that allow for recording information on multiple visits during that pregnancy). Subsequent testing during pregnancy and breastfeeding will be counted in the new HTS modality: Post ANC1: Pregnancy/L&D/BF. ',
        'There is also a risk of undercounting if those women who already knew their HIV status prior to attending ANC are not documented. Therefore the ANC register should at a minimum should document both “previously known positive” and “newly tested positive”. It may be appropriate to report “known negative” women under the “Recent Negative” disaggregate if national guidelines do not require retesting women known to be HIV negative (often women tested in the last 3 months, however exact timing depends on local guidelines). ',
        'Women reported under the “Newly Tested Positive” and “New Negative” disaggregates will auto-populate the HTS_TST ANC1 modality.',
        'Women who are tested later in pregnancy, during L&D, and/or during breastfeeding should be reported under the HTS_TST Post ANC1: Pregnancy/L&D/BF modality.'
      ],
      howToReview: [
        'The percentage should never be above 100% at a site, and therefore review of the method of data collection and correction of any errors at sites with greater than 100% coverage is important to ensuring data quality for this indicator.',
        'Retesting of HIV-negative women during pregnancy, at L&D and through the postpartum period is an important program strategy is collected under the HTS_TST Post ANC1: Pregnancy/L&D/BF modality. Please see the HTS_TST reference sheet for more information on collecting this information.'
      ],
      questions: {
        'Provide context for poor performance in PMTCT_STAT coverage (Numerator/Denominator = STAT coverage) by geographic area, age, or partner/implementing mechanism, including any planned activities/remedial actions.': [],
        'For areas where age disaggregates are NOT completely reported, describe challenges for collecting and/or plan and timeline for collection.': []
      }
    },
    {
      name: 'HTS_SELF',
      frequency: 'Quarterly',
      level: 'Community',
      type: 'Results',
      group: 'treatment',
      fiscal: '2020',

      changes: [
        'Age disaggregations updated.',
        'Age disaggregations added to the “HIV Status and Outcome” disaggregate in order for VMMC results to auto-populate into HTS_TST.'
      ],
      description: 'Number of males circumcised as part of the voluntary medical male circumcision (VMMC) for HIV prevention program within the reporting period',
      howtoCalculate: 'Sum results across quarters',

      numerators: {
        name: 'Number of males circumcised',
        description: 'The numerator can be generated by counting the number of males circumcised.',

      },
      disaggregate: {
        'Age (Required)': ['0-60 days, 2 months - 4 years, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'],
        'HIV Status and Outcome by Age (Required)': [
          'Underlined portions auto-populate into the VMMC HTS_TST modality.',
          'Number of HIV-positive clients (tested HIV positive at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of HIV-negative clients (tested HIV negative at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of clients with indeterminate HIV status or not tested for HIV at site (regardless of previous documentation) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25- 29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'
        ],
        'Circumcision Technique (Required)': ['Surgical VMMC', 'Device-based VMMC'],
        'Circumcision Technique/Follow-up Status (Sub-disaggregation of the VMMC circumcision technique disaggregation) (Required)': [
          'Surgical VMMC: Followed-up within 14 days of surgery',
          'Surgical VMMC: Did not follow-up within 14 days of surgery or did not follow-up within the reporting period',
          'Device-based VMMC: Followed-up within 14 days of device placement.',
          'Device-based VMMC: Did not follow-up within 14 days of device placement or did not follow-up within the reporting period'
        ]
      },

      denominator: {
        name: 'N/A',
        description: 'N/A',
        groups: 'N/A',
        disaggregates: 'N/A'
      },
      disaggregateDefination: {
        'Age/Sex': ['Age is defined as the age of the patient at the date of initiation on ART, not the age at the date of reporting.']
      },
      pepfarDef: {
        'Provision of key staff or commodities for VMMC include:': [
          'medical instruments, supplies',
          'medicines needed for the VMMC procedure',
          'funding for salaries for HCW who deliver VMMC services'
        ],
        'Ongoing support for VMMC service delivery improvement includes:': [
          'training of VMMC service providers',
          'clinical mentoring and supportive supervision of HCW at VMMC sites',
          'infrastructure/facility renovation',
          'support of VMMC service-related data collection, reporting, and data quality assessments (DQA)',
          'CQI/EQA of VMMC services at point of service delivery',
          'commodities consumption forecasting and supply chain management support'
        ]
      },
      howToUse: [
        'This indicator tracks the number of male circumcisions conducted during the reporting period and assists in potentially determining coverage of circumcision in the population over time. The total number of males circumcised indicates a change in the supply of and/or demand for VMMC services.',
        'Additionally, disaggregations are required and are used to evaluate whether prioritized services have been successful at reaching the intended population (by age, HIV status, and circumcision technique), targets have been achieved, and whether modeling inputs should be adjusted. An additional level of disaggregation below the circumcision technique level is required for follow-up status, since post-operative clinical assessments are part of good clinical care and low follow-up rates may indicate a problem in program quality.'
      ],
      howToCollect: [
        'The numerator can be generated by counting the number of males circumcised as part of the VMMC for HIV prevention program. This information can generally be found in VMMC Register, or client medical records maintained by each program/site/service provider.'
      ],
      howToReview: [
        'Disaggregations for HIV status and outcome and circumcision technique should be equal to (but not exceed) the numerator.',
        'The circumcision technique by follow-up status disaggregate should be less or equal to the circumcision technique disaggregate.'
      ],
      questions: {
        'Is the age distribution of males 60% or more 15+ years of age?': [
          'Is this age distribution getting older as compared to previous quarters?'
        ],
        'If OU is using compression collar type device for VMMC': [
          'Are they adhering to WHO Guidelines for tetanus immunization?',
          'Were there any tetanus AEs reported?'
        ],
        'What proportion of clients are returning for follow-up (should be at least 80%)?': [],
        'What barriers are there to further scaling up VMMC services?': []
      }
    },
    {
      name: 'HTS_TST',
      frequency: 'Quarterly',
      level: 'Facility',
      type: 'Target',
      group: 'viral',
      fiscal: '2020',

      changes: [
        'Age disaggregations updated.',
        'Age disaggregations added to the “HIV Status and Outcome” disaggregate in order for VMMC results to auto-populate into HTS_TST.'
      ],
      description: 'Number of males circumcised as part of the voluntary medical male circumcision (VMMC) for HIV prevention program within the reporting period',
      howtoCalculate: 'Sum results across quarters',

      numerators: {
        name: 'Number of males circumcised',
        description: 'The numerator can be generated by counting the number of males circumcised.',

      },
      disaggregate: {
        'Age (Required)': ['0-60 days, 2 months - 4 years, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'],
        'HIV Status and Outcome by Age (Required)': [
          'Underlined portions auto-populate into the VMMC HTS_TST modality.',
          'Number of HIV-positive clients (tested HIV positive at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of HIV-negative clients (tested HIV negative at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of clients with indeterminate HIV status or not tested for HIV at site (regardless of previous documentation) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25- 29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'
        ],
        'Circumcision Technique (Required)': ['Surgical VMMC', 'Device-based VMMC'],
        'Circumcision Technique/Follow-up Status (Sub-disaggregation of the VMMC circumcision technique disaggregation) (Required)': [
          'Surgical VMMC: Followed-up within 14 days of surgery',
          'Surgical VMMC: Did not follow-up within 14 days of surgery or did not follow-up within the reporting period',
          'Device-based VMMC: Followed-up within 14 days of device placement.',
          'Device-based VMMC: Did not follow-up within 14 days of device placement or did not follow-up within the reporting period'
        ]
      },

      denominator: {
        name: 'N/A',
        description: 'N/A',
        groups: 'N/A',
        disaggregates: 'N/A'
      },
      disaggregateDefination: {
        'Age/Sex': ['Age is defined as the age of the patient at the date of initiation on ART, not the age at the date of reporting.']
      },
      pepfarDef: {
        'Provision of key staff or commodities for VMMC include:': [
          'medical instruments, supplies',
          'medicines needed for the VMMC procedure',
          'funding for salaries for HCW who deliver VMMC services'
        ],
        'Ongoing support for VMMC service delivery improvement includes:': [
          'training of VMMC service providers',
          'clinical mentoring and supportive supervision of HCW at VMMC sites',
          'infrastructure/facility renovation',
          'support of VMMC service-related data collection, reporting, and data quality assessments (DQA)',
          'CQI/EQA of VMMC services at point of service delivery',
          'commodities consumption forecasting and supply chain management support'
        ]
      },
      howToUse: [
        'This indicator tracks the number of male circumcisions conducted during the reporting period and assists in potentially determining coverage of circumcision in the population over time. The total number of males circumcised indicates a change in the supply of and/or demand for VMMC services.',
        'Additionally, disaggregations are required and are used to evaluate whether prioritized services have been successful at reaching the intended population (by age, HIV status, and circumcision technique), targets have been achieved, and whether modeling inputs should be adjusted. An additional level of disaggregation below the circumcision technique level is required for follow-up status, since post-operative clinical assessments are part of good clinical care and low follow-up rates may indicate a problem in program quality.'
      ],
      howToCollect: [
        'The numerator can be generated by counting the number of males circumcised as part of the VMMC for HIV prevention program. This information can generally be found in VMMC Register, or client medical records maintained by each program/site/service provider.'
      ],
      howToReview: [
        'Disaggregations for HIV status and outcome and circumcision technique should be equal to (but not exceed) the numerator.',
        'The circumcision technique by follow-up status disaggregate should be less or equal to the circumcision technique disaggregate.'
      ],
      questions: {
        'Is the age distribution of males 60% or more 15+ years of age?': [
          'Is this age distribution getting older as compared to previous quarters?'
        ],
        'If OU is using compression collar type device for VMMC': [
          'Are they adhering to WHO Guidelines for tetanus immunization?',
          'Were there any tetanus AEs reported?'
        ],
        'What proportion of clients are returning for follow-up (should be at least 80%)?': [],
        'What barriers are there to further scaling up VMMC services?': []
      }
    },
    {
      name: 'OVC_HIVSTAT',
      frequency: 'Annually',
      level: 'Facility',
      type: 'Results',
      group: 'health-system',
      fiscal: '2019',


      changes: [
        'Age disaggregations updated.',
        'Age disaggregations added to the “HIV Status and Outcome” disaggregate in order for VMMC results to auto-populate into HTS_TST.'
      ],
      description: 'Number of males circumcised as part of the voluntary medical male circumcision (VMMC) for HIV prevention program within the reporting period',
      howtoCalculate: 'Sum results across quarters',

      numerators: {
        name: 'Number of males circumcised',
        description: 'The numerator can be generated by counting the number of males circumcised.',

      },
      disaggregate: {
        'Age (Required)': ['0-60 days, 2 months - 4 years, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'],
        'HIV Status and Outcome by Age (Required)': [
          'Underlined portions auto-populate into the VMMC HTS_TST modality.',
          'Number of HIV-positive clients (tested HIV positive at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of HIV-negative clients (tested HIV negative at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of clients with indeterminate HIV status or not tested for HIV at site (regardless of previous documentation) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25- 29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'
        ],
        'Circumcision Technique (Required)': ['Surgical VMMC', 'Device-based VMMC'],
        'Circumcision Technique/Follow-up Status (Sub-disaggregation of the VMMC circumcision technique disaggregation) (Required)': [
          'Surgical VMMC: Followed-up within 14 days of surgery',
          'Surgical VMMC: Did not follow-up within 14 days of surgery or did not follow-up within the reporting period',
          'Device-based VMMC: Followed-up within 14 days of device placement.',
          'Device-based VMMC: Did not follow-up within 14 days of device placement or did not follow-up within the reporting period'
        ]
      },

      denominator: {
        name: 'N/A',
        description: 'N/A',
        groups: 'N/A',
        disaggregates: 'N/A'
      },
      disaggregateDefination: {
        'Age/Sex': ['Age is defined as the age of the patient at the date of initiation on ART, not the age at the date of reporting.']
      },
      pepfarDef: {
        'Provision of key staff or commodities for VMMC include:': [
          'medical instruments, supplies',
          'medicines needed for the VMMC procedure',
          'funding for salaries for HCW who deliver VMMC services'
        ],
        'Ongoing support for VMMC service delivery improvement includes:': [
          'training of VMMC service providers',
          'clinical mentoring and supportive supervision of HCW at VMMC sites',
          'infrastructure/facility renovation',
          'support of VMMC service-related data collection, reporting, and data quality assessments (DQA)',
          'CQI/EQA of VMMC services at point of service delivery',
          'commodities consumption forecasting and supply chain management support'
        ]
      },
      howToUse: [
        'This indicator tracks the number of male circumcisions conducted during the reporting period and assists in potentially determining coverage of circumcision in the population over time. The total number of males circumcised indicates a change in the supply of and/or demand for VMMC services.',
        'Additionally, disaggregations are required and are used to evaluate whether prioritized services have been successful at reaching the intended population (by age, HIV status, and circumcision technique), targets have been achieved, and whether modeling inputs should be adjusted. An additional level of disaggregation below the circumcision technique level is required for follow-up status, since post-operative clinical assessments are part of good clinical care and low follow-up rates may indicate a problem in program quality.'
      ],
      howToCollect: [
        'The numerator can be generated by counting the number of males circumcised as part of the VMMC for HIV prevention program. This information can generally be found in VMMC Register, or client medical records maintained by each program/site/service provider.'
      ],
      howToReview: [
        'Disaggregations for HIV status and outcome and circumcision technique should be equal to (but not exceed) the numerator.',
        'The circumcision technique by follow-up status disaggregate should be less or equal to the circumcision technique disaggregate.'
      ],
      questions: {
        'Is the age distribution of males 60% or more 15+ years of age?': [
          'Is this age distribution getting older as compared to previous quarters?'
        ],
        'If OU is using compression collar type device for VMMC': [
          'Are they adhering to WHO Guidelines for tetanus immunization?',
          'Were there any tetanus AEs reported?'
        ],
        'What proportion of clients are returning for follow-up (should be at least 80%)?': [],
        'What barriers are there to further scaling up VMMC services?': []
      }
    },
    {
      name: 'PMTCT_EID',
      frequency: 'Annually',
      level: 'Community',
      type: 'Target',
      group: 'host-country',
      fiscal: '2018',


      changes: [
        'Age disaggregations updated.',
        'Age disaggregations added to the “HIV Status and Outcome” disaggregate in order for VMMC results to auto-populate into HTS_TST.'
      ],
      description: 'Number of males circumcised as part of the voluntary medical male circumcision (VMMC) for HIV prevention program within the reporting period',
      howtoCalculate: 'Sum results across quarters',

      numerators: {
        name: 'Number of males circumcised',
        description: 'The numerator can be generated by counting the number of males circumcised.',

      },
      disaggregate: {
        'Age (Required)': ['0-60 days, 2 months - 4 years, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'],
        'HIV Status and Outcome by Age (Required)': [
          'Underlined portions auto-populate into the VMMC HTS_TST modality.',
          'Number of HIV-positive clients (tested HIV positive at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of HIV-negative clients (tested HIV negative at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of clients with indeterminate HIV status or not tested for HIV at site (regardless of previous documentation) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25- 29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'
        ],
        'Circumcision Technique (Required)': ['Surgical VMMC', 'Device-based VMMC'],
        'Circumcision Technique/Follow-up Status (Sub-disaggregation of the VMMC circumcision technique disaggregation) (Required)': [
          'Surgical VMMC: Followed-up within 14 days of surgery',
          'Surgical VMMC: Did not follow-up within 14 days of surgery or did not follow-up within the reporting period',
          'Device-based VMMC: Followed-up within 14 days of device placement.',
          'Device-based VMMC: Did not follow-up within 14 days of device placement or did not follow-up within the reporting period'
        ]
      },

      denominator: {
        name: 'N/A',
        description: 'N/A',
        groups: 'N/A',
        disaggregates: 'N/A'
      },
      disaggregateDefination: {
        'Age/Sex': ['Age is defined as the age of the patient at the date of initiation on ART, not the age at the date of reporting.']
      },
      pepfarDef: {
        'Provision of key staff or commodities for VMMC include:': [
          'medical instruments, supplies',
          'medicines needed for the VMMC procedure',
          'funding for salaries for HCW who deliver VMMC services'
        ],
        'Ongoing support for VMMC service delivery improvement includes:': [
          'training of VMMC service providers',
          'clinical mentoring and supportive supervision of HCW at VMMC sites',
          'infrastructure/facility renovation',
          'support of VMMC service-related data collection, reporting, and data quality assessments (DQA)',
          'CQI/EQA of VMMC services at point of service delivery',
          'commodities consumption forecasting and supply chain management support'
        ]
      },
      howToUse: [
        'This indicator tracks the number of male circumcisions conducted during the reporting period and assists in potentially determining coverage of circumcision in the population over time. The total number of males circumcised indicates a change in the supply of and/or demand for VMMC services.',
        'Additionally, disaggregations are required and are used to evaluate whether prioritized services have been successful at reaching the intended population (by age, HIV status, and circumcision technique), targets have been achieved, and whether modeling inputs should be adjusted. An additional level of disaggregation below the circumcision technique level is required for follow-up status, since post-operative clinical assessments are part of good clinical care and low follow-up rates may indicate a problem in program quality.'
      ],
      howToCollect: [
        'The numerator can be generated by counting the number of males circumcised as part of the VMMC for HIV prevention program. This information can generally be found in VMMC Register, or client medical records maintained by each program/site/service provider.'
      ],
      howToReview: [
        'Disaggregations for HIV status and outcome and circumcision technique should be equal to (but not exceed) the numerator.',
        'The circumcision technique by follow-up status disaggregate should be less or equal to the circumcision technique disaggregate.'
      ],
      questions: {
        'Is the age distribution of males 60% or more 15+ years of age?': [
          'Is this age distribution getting older as compared to previous quarters?'
        ],
        'If OU is using compression collar type device for VMMC': [
          'Are they adhering to WHO Guidelines for tetanus immunization?',
          'Were there any tetanus AEs reported?'
        ],
        'What proportion of clients are returning for follow-up (should be at least 80%)?': [],
        'What barriers are there to further scaling up VMMC services?': []
      }
    },
    {
      name: 'PMTCT_FO',
      frequency: 'Monthly',
      level: 'Facility',
      type: 'Results',
      group: 'health-system',
      fiscal: 2019,


      changes: [
        'Age disaggregations updated.',
        'Age disaggregations added to the “HIV Status and Outcome” disaggregate in order for VMMC results to auto-populate into HTS_TST.'
      ],
      description: 'Number of males circumcised as part of the voluntary medical male circumcision (VMMC) for HIV prevention program within the reporting period',
      howtoCalculate: 'Sum results across quarters',

      numerators: {
        name: 'Number of males circumcised',
        description: 'The numerator can be generated by counting the number of males circumcised.',

      },
      disaggregate: {
        'Age (Required)': ['0-60 days, 2 months - 4 years, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'],
        'HIV Status and Outcome by Age (Required)': [
          'Underlined portions auto-populate into the VMMC HTS_TST modality.',
          'Number of HIV-positive clients (tested HIV positive at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of HIV-negative clients (tested HIV negative at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of clients with indeterminate HIV status or not tested for HIV at site (regardless of previous documentation) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25- 29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'
        ],
        'Circumcision Technique (Required)': ['Surgical VMMC', 'Device-based VMMC'],
        'Circumcision Technique/Follow-up Status (Sub-disaggregation of the VMMC circumcision technique disaggregation) (Required)': [
          'Surgical VMMC: Followed-up within 14 days of surgery',
          'Surgical VMMC: Did not follow-up within 14 days of surgery or did not follow-up within the reporting period',
          'Device-based VMMC: Followed-up within 14 days of device placement.',
          'Device-based VMMC: Did not follow-up within 14 days of device placement or did not follow-up within the reporting period'
        ]
      },

      denominator: {
        name: 'N/A',
        description: 'N/A',
        groups: 'N/A',
        disaggregates: 'N/A'
      },
      disaggregateDefination: {
        'Age/Sex': ['Age is defined as the age of the patient at the date of initiation on ART, not the age at the date of reporting.']
      },
      pepfarDef: {
        'Provision of key staff or commodities for VMMC include:': [
          'medical instruments, supplies',
          'medicines needed for the VMMC procedure',
          'funding for salaries for HCW who deliver VMMC services'
        ],
        'Ongoing support for VMMC service delivery improvement includes:': [
          'training of VMMC service providers',
          'clinical mentoring and supportive supervision of HCW at VMMC sites',
          'infrastructure/facility renovation',
          'support of VMMC service-related data collection, reporting, and data quality assessments (DQA)',
          'CQI/EQA of VMMC services at point of service delivery',
          'commodities consumption forecasting and supply chain management support'
        ]
      },
      howToUse: [
        'This indicator tracks the number of male circumcisions conducted during the reporting period and assists in potentially determining coverage of circumcision in the population over time. The total number of males circumcised indicates a change in the supply of and/or demand for VMMC services.',
        'Additionally, disaggregations are required and are used to evaluate whether prioritized services have been successful at reaching the intended population (by age, HIV status, and circumcision technique), targets have been achieved, and whether modeling inputs should be adjusted. An additional level of disaggregation below the circumcision technique level is required for follow-up status, since post-operative clinical assessments are part of good clinical care and low follow-up rates may indicate a problem in program quality.'
      ],
      howToCollect: [
        'The numerator can be generated by counting the number of males circumcised as part of the VMMC for HIV prevention program. This information can generally be found in VMMC Register, or client medical records maintained by each program/site/service provider.'
      ],
      howToReview: [
        'Disaggregations for HIV status and outcome and circumcision technique should be equal to (but not exceed) the numerator.',
        'The circumcision technique by follow-up status disaggregate should be less or equal to the circumcision technique disaggregate.'
      ],
      questions: {
        'Is the age distribution of males 60% or more 15+ years of age?': [
          'Is this age distribution getting older as compared to previous quarters?'
        ],
        'If OU is using compression collar type device for VMMC': [
          'Are they adhering to WHO Guidelines for tetanus immunization?',
          'Were there any tetanus AEs reported?'
        ],
        'What proportion of clients are returning for follow-up (should be at least 80%)?': [],
        'What barriers are there to further scaling up VMMC services?': []
      }
    },
    {
      name: 'PMTCT_HEI_POS',
      frequency: 'Semi-Annually',
      level: 'Community',
      type: 'Target',
      group: 'testing',
      fiscal: '2020',


      changes: [
        'Age disaggregations updated.',
        'Age disaggregations added to the “HIV Status and Outcome” disaggregate in order for VMMC results to auto-populate into HTS_TST.'
      ],
      description: 'Number of males circumcised as part of the voluntary medical male circumcision (VMMC) for HIV prevention program within the reporting period',
      howtoCalculate: 'Sum results across quarters',

      numerators: {
        name: 'Number of males circumcised',
        description: 'The numerator can be generated by counting the number of males circumcised.',

      },
      disaggregate: {
        'Age (Required)': ['0-60 days, 2 months - 4 years, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'],
        'HIV Status and Outcome by Age (Required)': [
          'Underlined portions auto-populate into the VMMC HTS_TST modality.',
          'Number of HIV-positive clients (tested HIV positive at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of HIV-negative clients (tested HIV negative at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of clients with indeterminate HIV status or not tested for HIV at site (regardless of previous documentation) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25- 29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'
        ],
        'Circumcision Technique (Required)': ['Surgical VMMC', 'Device-based VMMC'],
        'Circumcision Technique/Follow-up Status (Sub-disaggregation of the VMMC circumcision technique disaggregation) (Required)': [
          'Surgical VMMC: Followed-up within 14 days of surgery',
          'Surgical VMMC: Did not follow-up within 14 days of surgery or did not follow-up within the reporting period',
          'Device-based VMMC: Followed-up within 14 days of device placement.',
          'Device-based VMMC: Did not follow-up within 14 days of device placement or did not follow-up within the reporting period'
        ]
      },

      denominator: {
        name: 'N/A',
        description: 'N/A',
        groups: 'N/A',
        disaggregates: 'N/A'
      },
      disaggregateDefination: {
        'Age/Sex': ['Age is defined as the age of the patient at the date of initiation on ART, not the age at the date of reporting.']
      },
      pepfarDef: {
        'Provision of key staff or commodities for VMMC include:': [
          'medical instruments, supplies',
          'medicines needed for the VMMC procedure',
          'funding for salaries for HCW who deliver VMMC services'
        ],
        'Ongoing support for VMMC service delivery improvement includes:': [
          'training of VMMC service providers',
          'clinical mentoring and supportive supervision of HCW at VMMC sites',
          'infrastructure/facility renovation',
          'support of VMMC service-related data collection, reporting, and data quality assessments (DQA)',
          'CQI/EQA of VMMC services at point of service delivery',
          'commodities consumption forecasting and supply chain management support'
        ]
      },
      howToUse: [
        'This indicator tracks the number of male circumcisions conducted during the reporting period and assists in potentially determining coverage of circumcision in the population over time. The total number of males circumcised indicates a change in the supply of and/or demand for VMMC services.',
        'Additionally, disaggregations are required and are used to evaluate whether prioritized services have been successful at reaching the intended population (by age, HIV status, and circumcision technique), targets have been achieved, and whether modeling inputs should be adjusted. An additional level of disaggregation below the circumcision technique level is required for follow-up status, since post-operative clinical assessments are part of good clinical care and low follow-up rates may indicate a problem in program quality.'
      ],
      howToCollect: [
        'The numerator can be generated by counting the number of males circumcised as part of the VMMC for HIV prevention program. This information can generally be found in VMMC Register, or client medical records maintained by each program/site/service provider.'
      ],
      howToReview: [
        'Disaggregations for HIV status and outcome and circumcision technique should be equal to (but not exceed) the numerator.',
        'The circumcision technique by follow-up status disaggregate should be less or equal to the circumcision technique disaggregate.'
      ],
      questions: {
        'Is the age distribution of males 60% or more 15+ years of age?': [
          'Is this age distribution getting older as compared to previous quarters?'
        ],
        'If OU is using compression collar type device for VMMC': [
          'Are they adhering to WHO Guidelines for tetanus immunization?',
          'Were there any tetanus AEs reported?'
        ],
        'What proportion of clients are returning for follow-up (should be at least 80%)?': [],
        'What barriers are there to further scaling up VMMC services?': []
      }
    },
    {
      name: 'PMTCT_STAT',
      frequency: 'Semi-Annually',
      level: 'Facility',
      type: 'Results',
      group: 'prevention',
      fiscal: 2018,


      changes: [
        'Age disaggregations updated.',
        'Age disaggregations added to the “HIV Status and Outcome” disaggregate in order for VMMC results to auto-populate into HTS_TST.'
      ],
      description: 'Number of males circumcised as part of the voluntary medical male circumcision (VMMC) for HIV prevention program within the reporting period',
      howtoCalculate: 'Sum results across quarters',

      numerators: {
        name: 'Number of males circumcised',
        description: 'The numerator can be generated by counting the number of males circumcised.',

      },
      disaggregate: {
        'Age (Required)': ['0-60 days, 2 months - 4 years, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'],
        'HIV Status and Outcome by Age (Required)': [
          'Underlined portions auto-populate into the VMMC HTS_TST modality.',
          'Number of HIV-positive clients (tested HIV positive at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of HIV-negative clients (tested HIV negative at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of clients with indeterminate HIV status or not tested for HIV at site (regardless of previous documentation) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25- 29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'
        ],
        'Circumcision Technique (Required)': ['Surgical VMMC', 'Device-based VMMC'],
        'Circumcision Technique/Follow-up Status (Sub-disaggregation of the VMMC circumcision technique disaggregation) (Required)': [
          'Surgical VMMC: Followed-up within 14 days of surgery',
          'Surgical VMMC: Did not follow-up within 14 days of surgery or did not follow-up within the reporting period',
          'Device-based VMMC: Followed-up within 14 days of device placement.',
          'Device-based VMMC: Did not follow-up within 14 days of device placement or did not follow-up within the reporting period'
        ]
      },

      denominator: {
        name: 'N/A',
        description: 'N/A',
        groups: 'N/A',
        disaggregates: 'N/A'
      },
      disaggregateDefination: {
        'Age/Sex': ['Age is defined as the age of the patient at the date of initiation on ART, not the age at the date of reporting.']
      },
      pepfarDef: {
        'Provision of key staff or commodities for VMMC include:': [
          'medical instruments, supplies',
          'medicines needed for the VMMC procedure',
          'funding for salaries for HCW who deliver VMMC services'
        ],
        'Ongoing support for VMMC service delivery improvement includes:': [
          'training of VMMC service providers',
          'clinical mentoring and supportive supervision of HCW at VMMC sites',
          'infrastructure/facility renovation',
          'support of VMMC service-related data collection, reporting, and data quality assessments (DQA)',
          'CQI/EQA of VMMC services at point of service delivery',
          'commodities consumption forecasting and supply chain management support'
        ]
      },
      howToUse: [
        'This indicator tracks the number of male circumcisions conducted during the reporting period and assists in potentially determining coverage of circumcision in the population over time. The total number of males circumcised indicates a change in the supply of and/or demand for VMMC services.',
        'Additionally, disaggregations are required and are used to evaluate whether prioritized services have been successful at reaching the intended population (by age, HIV status, and circumcision technique), targets have been achieved, and whether modeling inputs should be adjusted. An additional level of disaggregation below the circumcision technique level is required for follow-up status, since post-operative clinical assessments are part of good clinical care and low follow-up rates may indicate a problem in program quality.'
      ],
      howToCollect: [
        'The numerator can be generated by counting the number of males circumcised as part of the VMMC for HIV prevention program. This information can generally be found in VMMC Register, or client medical records maintained by each program/site/service provider.'
      ],
      howToReview: [
        'Disaggregations for HIV status and outcome and circumcision technique should be equal to (but not exceed) the numerator.',
        'The circumcision technique by follow-up status disaggregate should be less or equal to the circumcision technique disaggregate.'
      ],
      questions: {
        'Is the age distribution of males 60% or more 15+ years of age?': [
          'Is this age distribution getting older as compared to previous quarters?'
        ],
        'If OU is using compression collar type device for VMMC': [
          'Are they adhering to WHO Guidelines for tetanus immunization?',
          'Were there any tetanus AEs reported?'
        ],
        'What proportion of clients are returning for follow-up (should be at least 80%)?': [],
        'What barriers are there to further scaling up VMMC services?': []
      }
    },
    {
      name: 'TB_STAT',
      frequency: 'Quarterly',
      level: 'Facility',
      type: 'Target',
      group: 'treatment',
      fiscal: 2019,


      changes: [
        'Age disaggregations updated.',
        'Age disaggregations added to the “HIV Status and Outcome” disaggregate in order for VMMC results to auto-populate into HTS_TST.'
      ],
      description: 'Number of males circumcised as part of the voluntary medical male circumcision (VMMC) for HIV prevention program within the reporting period',
      howtoCalculate: 'Sum results across quarters',

      numerators: {
        name: 'Number of males circumcised',
        description: 'The numerator can be generated by counting the number of males circumcised.',

      },
      disaggregate: {
        'Age (Required)': ['0-60 days, 2 months - 4 years, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'],
        'HIV Status and Outcome by Age (Required)': [
          'Underlined portions auto-populate into the VMMC HTS_TST modality.',
          'Number of HIV-positive clients (tested HIV positive at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of HIV-negative clients (tested HIV negative at VMMC site) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age',
          'Number of clients with indeterminate HIV status or not tested for HIV at site (regardless of previous documentation) by: <1 1-4, 5-9, 10-14, 15-19, 20-24, 25- 29, 30-34, 35-39, 40-44, 45-49, 50+, Unknown Age'
        ],
        'Circumcision Technique (Required)': ['Surgical VMMC', 'Device-based VMMC'],
        'Circumcision Technique/Follow-up Status (Sub-disaggregation of the VMMC circumcision technique disaggregation) (Required)': [
          'Surgical VMMC: Followed-up within 14 days of surgery',
          'Surgical VMMC: Did not follow-up within 14 days of surgery or did not follow-up within the reporting period',
          'Device-based VMMC: Followed-up within 14 days of device placement.',
          'Device-based VMMC: Did not follow-up within 14 days of device placement or did not follow-up within the reporting period'
        ]
      },

      denominator: {
        name: 'N/A',
        description: 'N/A',
        groups: 'N/A',
        disaggregates: 'N/A'
      },
      disaggregateDefination: {
        'Age/Sex': ['Age is defined as the age of the patient at the date of initiation on ART, not the age at the date of reporting.']
      },
      pepfarDef: {
        'Provision of key staff or commodities for VMMC include:': [
          'medical instruments, supplies',
          'medicines needed for the VMMC procedure',
          'funding for salaries for HCW who deliver VMMC services'
        ],
        'Ongoing support for VMMC service delivery improvement includes:': [
          'training of VMMC service providers',
          'clinical mentoring and supportive supervision of HCW at VMMC sites',
          'infrastructure/facility renovation',
          'support of VMMC service-related data collection, reporting, and data quality assessments (DQA)',
          'CQI/EQA of VMMC services at point of service delivery',
          'commodities consumption forecasting and supply chain management support'
        ]
      },
      howToUse: [
        'This indicator tracks the number of male circumcisions conducted during the reporting period and assists in potentially determining coverage of circumcision in the population over time. The total number of males circumcised indicates a change in the supply of and/or demand for VMMC services.',
        'Additionally, disaggregations are required and are used to evaluate whether prioritized services have been successful at reaching the intended population (by age, HIV status, and circumcision technique), targets have been achieved, and whether modeling inputs should be adjusted. An additional level of disaggregation below the circumcision technique level is required for follow-up status, since post-operative clinical assessments are part of good clinical care and low follow-up rates may indicate a problem in program quality.'
      ],
      howToCollect: [
        'The numerator can be generated by counting the number of males circumcised as part of the VMMC for HIV prevention program. This information can generally be found in VMMC Register, or client medical records maintained by each program/site/service provider.'
      ],
      howToReview: [
        'Disaggregations for HIV status and outcome and circumcision technique should be equal to (but not exceed) the numerator.',
        'The circumcision technique by follow-up status disaggregate should be less or equal to the circumcision technique disaggregate.'
      ],
      questions: {
        'Is the age distribution of males 60% or more 15+ years of age?': [
          'Is this age distribution getting older as compared to previous quarters?'
        ],
        'If OU is using compression collar type device for VMMC': [
          'Are they adhering to WHO Guidelines for tetanus immunization?',
          'Were there any tetanus AEs reported?'
        ],
        'What proportion of clients are returning for follow-up (should be at least 80%)?': [],
        'What barriers are there to further scaling up VMMC services?': []
      }
    }

  ],
  newIndicators: [
    {
      name: 'SC_ARVDISP',
      content: ['SC_ARVDISP is a semi-annual indicator introduced for reporting beginning in Q2 of FY20. SC_ARVDISP measures the dispensing of ARV bottles at the facility level. In addition, SC_ARVDISP measures the uptake, transition, and maintenance of patients on optimized ARV regimens as well as the phasing out of non-optimal regimens.']
    },
    {
      name: 'SC_CURR',
      content: ['SC_CURR is a semi-annual indicator introduced for reporting beginning in Q2 of FY20. SC_CURR measures the quantity of ARV stock available at the time of reporting to provide insight into the on-the-shelf availability of each ARV used for HIV treatment at the facility level. Data from SC_CURR can be coupled with data from SC_ARVDISP to determine how long the quantity of stock will last based on dispensing.']
    },
    {
      name: 'TX_RTT',
      content: ['TX_RTT is a quarterly indicator introduced for reporting beginning in Q1 of FY20. TX_RTT counts those patients who are lost to TX_CURR for more than 28 days past the last expected clinical contact who return to treatment and restart ARVs in the reporting period. This indicator counts those previously ART experienced individuals who reinitiate ARVs after being off treatment for ≥28 days (and therefore LTFU).']
    }
    // {
    //   name: 'AGYW_PREV',
    //   content:['AGYW_PREV is a semi-annual indicator introduced for reporting beginning in FY19. AGYW_PREV is a DREAMS-specific indicator to measure how many adolescent girls and young women (AGYW) are being served in the DREAMS program and whether all AGYW in DREAMS have received the intended layered services and interventions to ensure that they remain HIV-free.']
    // },
    // {
    //   name:'CXCA_SCRN',
    //   content:['CXCA_SCRN is a semi-annual indicator introduced for reporting beginning in Q4 of FY18. CXCA measures the percentage of HIV-positive women on ART screened for cervical cancer.']
    // },
    // {
    //   name:'CXCA_TX',
    //   content:['CXCA_TX is a semi-annual indicator introduced for reporting beginning in Q4 of FY18. CXCA_TX measures the percentage of cervical cancer screen-positive women who are also HIV-positive and on ART that were eligible for and received cryotherapy, thermocoagulation or LEEP.']
    // },
    // {
    //   name:'HTS_INDEX',
    //   content:['HTS_INDEX is now a standalone indicator to monitor and help guide PEPFAR programming for index testing services. Reporting for HTS_INDEX will begin in Q1 of FY19. HTS_INDEX is the first MER indicator to monitor PEPFAR programming related to HIV index testing services (often referred to as partner notification or contact tracing services). This indicator includes a cascade that will help to better understand the scale and fidelity of the index testing services provided by PEPFAR-supported programs.']
    // },
    // {
    //   name: 'HTS_RECENT',
    //   content:['HTS_RECENT is a quarterly indicator introduced for reporting beginning in Q1 of FY19. Testing individuals that are newly diagnosed with HIV-1 for recent infection is an emerging programmatic area of emphasis for PEPFAR. HTS_RECENT measures the percentage of newly diagnosed HIV-positive persons aged ≥15 years with a test for recent infection result of ‘recent infection’ during the reporting period.',
    //   'As countries progress toward epidemic control, surveillance of newly diagnosed persons will ensure that interventions target those at highest risk of acquiring or transmitting HIV infection. One approach is to identify recent HIV infections, defined as those acquired within approximately the last one year. Incorporation of rapid tests for recent HIV-1 infection into routine HIV testing services will enable the establishment of a surveillance system to quickly detect, monitor, characterize, and intervene on recent infections among newly diagnosed HIV cases. Data collected from a recent infection surveillance system can also be used to fine-tune a country’s programmatic response through prioritized programming and resource allocation.']
    // },
    // {
    //   name:'PREP_CURR',
    //   content:['PrEP_CURR is a semi-annual indicator introduced for reporting beginning in FY19. PrEP_CURR measures the number of individuals receiving oral PrEP during the reporting period and is an important addition to the MER to help PEPFAR programs understand how many clients are being sustained on PrEP after initiation.']
    // },
    // {
    //   name: 'TX_ML',
    //   content:['TX_ML is a semi-annual indicator introduced for reporting beginning in FY19. TX_ML is intended to drive improved tracing of patients to ensure patient outcomes are accurately documented. It is the first PEPFAR indicator to collect information on mortality among patients on ART and in care. The indicator also strives to better understand the magnitude of previously undocumented patient transfers.']
    // }
  ],
  newDisaggregations: [
    {
      name: 'TX_CURR',
      content: ['Two new disaggregations have been introduced for quarterly TX_CURR reporting beginning in FY20: (1) reporting TX_CURR results by KP type and (2) reporting TX_CURR by the months of ARVs dispensed to each patient to assess the uptake of multi-month dispensing (MMD) in PEPFAR-supported sites.As a reminder, the definition of TX_CURR was modified beginning in FY 2019 based on a new definition of lost-to-follow-up (LTFU). Patients who have not received ARVs within four weeks (i.e., 28 days) of their last missed drug pick-up should not be counted in TX_CURR.']
    },
    {
      name: 'TX_PVLS',
      content: ['KP disaggregations have been added to both the numerator and denominator.']
    }
    // {
    //   name: 'HTS_TST',
    //   content:['A new facility-based testing modality has been introduced: Post ANC1: Pregnancy/L&D/BF. Please refer to the HTS_TST indicator reference sheet for additional details.']
    // },
    // {
    //   name: 'PP_PREV',
    //   content:['A new, optional priority populations type disaggregate was added to this indicator to capture the specific priority populations accessing prevention services. Age/sex-specific priority populations were not added to this disaggregate group (e.g., AGYW) because these can be calculated using the mandatory age/sex disaggregates collected within the indicator.']
    // },
    // {
    //   name: 'TX_TB',
    //   content:['The denominator has been updated to include a new disaggregate for “positive result returned."']
    // }
  ],
  siteAndSNUattributes: [
    {
      content: ['PEPFAR collects administrative, epidemiologic, and service-related data about PEPFAR-supported facilities and subnational units (SNUs) that helps to better illuminate where services should be provided, where services are actually are provided, who is delivering these services, and what is the service capacity. Some of these attributes are routinely collected in form of MER indicators (e.g., HRH_CURR, EMR_SITE), others are collected at the time a facility is added to a master facility list and subsequently DATIM (e.g., facility name, geographic coordinates), and others are collected during the annual PEPFAR planning cycle']
    }],
  reportFrequencyChanges: [
    {
      name: 'TX_ML',
      content: ['The reporting frequency moves from semi-annually to quarterly in FY20 to align with other treatment indicators and improve triangulation with TX_NEW, TX_NET_NEW, TX_CURR, and TX_RTT.']
    }
    // {
    //   name:'TB_ART',
    //   content:['The reporting frequency moves from semi-annually to quarterly in FY19 to align with the ART-related indicators and TB_STAT.']
    // },
    // {
    //   name:'TB_STAT',
    //   content:['The reporting frequency moves from semi-annually to quarterly in FY19 to align with HTS_TST.']
    // },
    // {
    //   name:'TX_PVLS',
    //   content:['The reporting frequency moves from annually to quarterly in FY19 to ensure that the treatment cascade can be reviewed quarterly and to emphasize the importance of regularly monitoring viral load coverage and suppression.']
    // }
  ],
  modifyExistIndicators: [
    {
      name: 'AGYW_PREV',
      content: ['Indicator reporting shifted in FY19 from being cumulative for the entire DREAMS programs to a to snapshot, reflecting AGYW service completion as of the past 6 months at Q2 and the past 12 months at Q4. For FY20, the numerator and denominator disaggregates have been reorganized and a denominator disaggregate has been added to capture AGYW enrolled in DREAMS that have started but not yet completed a DREAMS service/intervention in the reporting period. These changes will provide the ability to better assess completion coverage.']
    },
    {
      name: 'HTS_RECENT',
      content: ['HTS_RECENT has been restructured to combine the previous numerator and denominator into a single numerator to mirror HTS_TST. As such the previous indication disaggregation (assay, RITA, and not documented) was redefined to align better with reported results and recency testing algorithms. All assay results will be reported under rapid test for recent infection (RTRI) and confirmed results through viral load testing as part of the RITA will be reported as a subset, where available']
    },
    {
      name: 'TB_PREV',
      content: ['The denominator was changed from the number of ART patients who “are expected to complete a course of TPT” to those who were initiated on any course of TPT during the previous reporting period. The therapy type (regimen) disaggregates for the numerator and denominator were moved from the indicator to the guiding narrative questions. The APR calculation for TB_PREV was changed from a snapshot indicator, to being summed over time (i.e., previous calculation: APR=Q4, new calculation: APR=Q2+Q4).']
    },
    {
      name: 'TX_ML',
      content: ['The outcome disaggregations have been simplified to the following categories: died, lost to follow-up, transferred out, and refused (stopped) treatment. Sub-disaggregations were added to the lost to follow-up outcome for patients LTFU after being on treatment for >3 months vs. patients LTFU after being on treatment <3 months. This distinction was added to highlight the critical nature of early retention for successful longer-term retention among those persons newly initiating ART, especially otherwise healthy or younger adults.']
    }
    // {
    //   name:'PMTCT_EID',
    //   content:['The denominator has been updated to include HIV+ pregnant women identified after ANC1, including those women who test positives later in pregnancy, at labor and delivery, and throughout the breastfeeding period. The positive results for these women will be captured under the newly added HTS modality, Post ANC1: Pregnancy/L&D/BF and will be summed with the positives (new and known) from ANC1 (i.e., PMTCT_STAT_POS) to obtain the total denominator.']
    // }
  ],
  modifyExistDisaggregations: [
    {
      name: 'LAB_PTCQI',
      content: ['Laboratory and point-of-care testing site categories have been updated to include “rapid test for recent infection” and remove “other”.']
    },
    {
      name: 'PP_PREV',
      content: ['A new disaggregate has been added to the “Testing Services” disaggregate group for “Test not required based on risk assessment” for those priority populations not eligible for HTS based on HTS screening.']
    },
    {
      name: 'TX_PVLS',
      content: ['“Not documented” testing indication removed as efforts should have been initiated since this indicator was introduced as described in the previous releases of the MER guidance, to move results to either “routine” or “targeted.”']
    },
    // {
    //   name:'OVC_HIVSTAT',
    //   content:['The status type disaggregates have been modified. The sub-disaggregate under “No status reported” formerly called “Test not indicated” will now be “Test not required based on risk assessment” to simplify the language.']
    // },
    // {
    //   name:'OVC_SERV',
    //   content:['Age/sex and program status (i.e., active or graduated) disaggregations have been combined.']
    // },
    // {
    //   name:'PMTCT_ART',
    //   content:['Age disaggregations were added to the “maternal regimen type” disaggregate to align with PMTCT_STAT. Age disaggregations were not previously collected for PMTCT_ART.']
    // },
    // {
    //   name:'PREP_NEW',
    //   content:['The KP type disaggregation for this indicator has been updated. “Other key population” has been removed and replaced with “people who inject drugs” and “people in prisons and other closed settings” so that all key population disaggregate group options align between HTS_TST, TX_NEW, PrEP_CURR, and PrEP_NEW .']
    // },
    // {
    //   name:'TB_ART',
    //   content:['Age/sex and “ART status” disaggregations have been combined.']
    // },
    // {
    //   name:'TB_PREV',
    //   content:['Age/sex and “Type of TB preventive therapy by ART Start” disaggregations have been combined for both the numerator and the denominator.']
    // },
    // {
    //   name:'TB_STAT',
    //   content:['Age/sex disaggregations were updated from coarse-only to fine age bands to allow TB_STAT to auto-populate HTS_TST via the TB modality and to align with the age bands for TB_ART.']
    // },
    // {
    //   name:'TX_TB',
    //   content:['Age/sex and “ART Status” disaggregations have been combined for the numerator. Age/sex and “Start of ART by Screen Results” disaggregations have been combined for the denominator.']
    // },
    // {
    //   name:'VMMC_CIRC',
    //   content:['Age disaggregations were added to the “HIV Status and Outcome” disaggregate in order for VMMC HTS results to auto-populate into the HTS_TST indicator. Note that the age disaggregations align with HTS_TST to allow for auto-population. This means the <4 disaggregations differ slightly from the indicator itself.']
    // }
  ],
  indicatorDefinitionClarifications: [
    {
      name: 'OVC_SERV',
      content: ['Clarifying language was added to OVC_SERV explaining exited, transferred, and graduation disaggregates should be reported cumulatively at Q4. In addition, there is an expanded definition of “child” OVC beneficiary to include children aged 18 to 20 still completing secondary education or an approved economic intervention intended to secure the livelihood of an OVC aging out of the program. Language was also added regarding counting active DREAMS beneficiaries who are not otherwise actively enrolled in the OVC program under OVC_SERV. Lastly, there is clarifying language added regarding the definition and number of caregivers per household.']
    }
  ],
  retiredIndicators: [
    {
      name: 'SC_STOCK',
      content: ['Indicator has been removed in order to introduce improvements to the supply chain indicators, including SC_ARVDISP and SC_CURR, which allows for more proactive action to address bottlenecks in the supply chain.']
    },
    // {
    //   name:'TX_RET',
    //   content:['Indicator has been removed in order to incorporate the new TX_ML indicator and strengthen reporting on TX_PVLS.']
    // }
  ],
  retiredDisaggregations: [
    {
      name: 'OVC_SERV',
      content: ['The reporting of HRH_CURR by the number of full-time equivalents is no longer required. HRH_CURR has been simplified to collect the total number of staff (regardless of FTE). In addition, a new data element has been added to capture the amount of funding spent on health care workers by cadre and support type.']
    },
    {
      name: 'PMTCT_STAT',
      content: ['The age-only disaggregate was removed to minimize duplicative reporting. Age is already captured under the status and age disaggregate group.']
    },
    {
      name: 'TX_NEW',
      content: ['The “confirmed diagnosis of TB” disaggregate was removed as TB_ART results have moved to quarterly reporting.']
    }
  ],
  pdhDataElements: [
    {
      name: 'PMTCT_STAT_POS(N, DSD): Known Results Positive',
      uid: 'gPKbuvvpose',
      derived: 'Yes',
      combos: [
        {
          name: '10-14, Known at Entry Positive',
          code: 'INzvF9tuFrB'
        },
        {
          name: '<10, Known at Entry Positive',
          code: 'M2MLpBcykcG'
        },
        {
          name: '15-19, Newly Identified Positive',
          code: 'ixhvyKCAZWz'
        },
        {
          name: '25-49, Known at Entry Positive',
          code: 'jgc1Z16F7yq'
        },
        {
          name: '20-24, Newly Identified Positive',
          code: 'INzvF9tuFrB'
        },
        {
          name: '20-24, Newly Identified Positive',
          code: 'M2MLpBcykcG'
        },
        {
          name: 'unknown age, Known at Entry Positive',
          code: 'M2MLpBcykcG'
        },
        {
          name: '50+, known at entry positive',
          code: 'ixhvyKCAZWz'
        },
        {
          name: 'unknown age, newly identified positive',
          code: 'Jgc1Z16F7yq'
        },
        {
          name: '20-24, Known at entry positive',
          code: 'INzvF9tuFrB'
        },
        {
          name: '10-14, Newly Identified Positive',
          code: 'M2MLpBcykcG'
        },
        {
          name: '25-49, Newly Identified Positive',
          code: 'ixhvyKCAZWz'
        },
        {
          name: '15-19, Known at Entry Positive',
          code: 'Jgc1Z16F7yq'
        },
        {
          name: '<10, Newly Identified Positive',
          code: 'M2MLpBcykcG'
        }
      ]
    },
    {
      name: 'PMTCT_STAT_POS(N, DSD, Age/Sex/KnownNewResult) TARGET: Known Results Positive',
      uid: 'a9FUCU6f7WU',
      derived: 'Yes',
      combo: [
        {
          name: '10-14, Known at Entry Positive',
          code: 'INzvF9tuFrB'
        },
        {
          name: '<10, Known at Entry Positive',
          code: 'M2MLpBcykcG'
        },
        {
          name: '15-19, Newly Identified Positive',
          code: 'ixhvyKCAZWz'
        },
        {
          name: '25-49, Known at Entry Positive',
          code: 'jgc1Z16F7yq'
        },
        {
          name: '20-24, Newly Identified Positive',
          code: 'INzvF9tuFrB'
        },
        {
          name: '20-24, Newly Identified Positive',
          code: 'M2MLpBcykcG'
        },
        {
          name: 'unknown age, Known at Entry Positive',
          code: 'M2MLpBcykcG'
        },
        {
          name: '50+, known at entry positive',
          code: 'ixhvyKCAZWz'
        },
        {
          name: 'unknown age, newly identified positive',
          code: 'Jgc1Z16F7yq'
        },
        {
          name: '20-24, Known at entry positive',
          code: 'INzvF9tuFrB'
        },
        {
          name: '10-14, Newly Identified Positive',
          code: 'M2MLpBcykcG'
        },
        {
          name: '25-49, Newly Identified Positive',
          code: 'ixhvyKCAZWz'
        },
        {
          name: '15-19, Known at Entry Positive',
          code: 'Jgc1Z16F7yq'
        },
        {
          name: '<10, Newly Identified Positive',
          code: 'M2MLpBcykcG'
        }
      ]
    }
  ],
  mohDataElements: [
    {
      name: 'PMTCT_STAT_POS(N, DSD): Known Results Positive',
      uid: 'gPKbuvvpose',
      derived: 'Yes',
      combos: [
        {
          name: '10-14, Known at Entry Positive',
          code: 'INzvF9tuFrB'
        },
        {
          name: '<10, Known at Entry Positive',
          code: 'M2MLpBcykcG'
        },
        {
          name: '15-19, Newly Identified Positive',
          code: 'ixhvyKCAZWz'
        },
        {
          name: '25-49, Known at Entry Positive',
          code: 'jgc1Z16F7yq'
        },
        {
          name: '20-24, Newly Identified Positive',
          code: 'INzvF9tuFrB'
        },
        {
          name: '20-24, Newly Identified Positive',
          code: 'M2MLpBcykcG'
        },
        {
          name: 'unknown age, Known at Entry Positive',
          code: 'M2MLpBcykcG'
        },
        {
          name: '50+, known at entry positive',
          code: 'ixhvyKCAZWz'
        },
        {
          name: 'unknown age, newly identified positive',
          code: 'Jgc1Z16F7yq'
        },
        {
          name: '20-24, Known at entry positive',
          code: 'INzvF9tuFrB'
        },
        {
          name: '10-14, Newly Identified Positive',
          code: 'M2MLpBcykcG'
        },
        {
          name: '25-49, Newly Identified Positive',
          code: 'ixhvyKCAZWz'
        },
        {
          name: '15-19, Known at Entry Positive',
          code: 'Jgc1Z16F7yq'
        },
        {
          name: '<10, Newly Identified Positive',
          code: 'M2MLpBcykcG'
        }
      ]
    },
    {
      name: 'PMTCT_STAT_POS(N, DSD, Age/Sex/KnownNewResult) TARGET: Known Results Positive',
      uid: 'a9FUCU6f7WU',
      derived: 'Yes',
      combo: [
        {
          name: '10-14, Known at Entry Positive',
          code: 'INzvF9tuFrB'
        },
        {
          name: '<10, Known at Entry Positive',
          code: 'M2MLpBcykcG'
        },
        {
          name: '15-19, Newly Identified Positive',
          code: 'ixhvyKCAZWz'
        },
        {
          name: '25-49, Known at Entry Positive',
          code: 'jgc1Z16F7yq'
        },
        {
          name: '20-24, Newly Identified Positive',
          code: 'INzvF9tuFrB'
        },
        {
          name: '20-24, Newly Identified Positive',
          code: 'M2MLpBcykcG'
        },
        {
          name: 'unknown age, Known at Entry Positive',
          code: 'M2MLpBcykcG'
        },
        {
          name: '50+, known at entry positive',
          code: 'ixhvyKCAZWz'
        },
        {
          name: 'unknown age, newly identified positive',
          code: 'Jgc1Z16F7yq'
        },
        {
          name: '20-24, Known at entry positive',
          code: 'INzvF9tuFrB'
        },
        {
          name: '10-14, Newly Identified Positive',
          code: 'M2MLpBcykcG'
        },
        {
          name: '25-49, Newly Identified Positive',
          code: 'ixhvyKCAZWz'
        },
        {
          name: '15-19, Known at Entry Positive',
          code: 'Jgc1Z16F7yq'
        },
        {
          name: '<10, Newly Identified Positive',
          code: 'M2MLpBcykcG'
        }
      ]
    }
  ],
  "codeList": [
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY20"
      ],
      "full_name": "MER Results: Community Based",
      "dataset_id": "qzVASYuaIey",
      "id": "MER-R-COMMUNITY-BASED",
      "name": "MER R: Community Based"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY20"
      ],
      "full_name": "MER Results: Community Based - DoD ONLY",
      "dataset_id": "BPEyzcDb8fT",
      "id": "MER-R-COMMUNITY-BASED-DOD-ONLY",
      "name": "MER R: Community Based - DoD ONLY"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY20"
      ],
      "full_name": "MER Results: Facility Based",
      "dataset_id": "jKdHXpBfWop",
      "id": "MER-R-FACILITY-BASED",
      "name": "MER R: Facility Based"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY20"
      ],
      "full_name": "MER Results: Facility Based - DoD ONLY",
      "dataset_id": "em1U5x9hhXh",
      "id": "MER-R-FACILITY-BASED-DOD-ONLY",
      "name": "MER R: Facility Based - DoD ONLY"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY20"
      ],
      "full_name": "MER Results: Operating Unit Level (IM)",
      "dataset_id": "biO64JF8Ait",
      "id": "MER-R-OPERATING-UNIT-LEVEL-IM",
      "name": "MER R: Operating Unit Level (IM)"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY20"
      ],
      "full_name": "MER Results: Narratives (IM)",
      "dataset_id": "x5lMwEHWSds",
      "id": "MER-R-NARRATIVES-IM",
      "name": "MER R: Narratives (IM)"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY20"
      ],
      "full_name": "Host Country Results: Narratives (USG)",
      "dataset_id": "wkdCW3M4zYT",
      "id": "HC-R-NARRATIVES-USG",
      "name": "HC R: Narratives (USG)"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY20"
      ],
      "full_name": "Host Country Results: Operating Unit Level (USG)",
      "dataset_id": "aUmlPChIptc",
      "id": "HC-R-OPERATING-UNIT-LEVEL-USG",
      "name": "HC R: Operating Unit Level (USG)"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY20"
      ],
      "full_name": "Host Country Results: COP Prioritization SNU (USG)",
      "dataset_id": "ctKXzmv2CVu",
      "id": "HC-R-COP-PRIORITIZATION-SNU-USG",
      "name": "HC R: COP Prioritization SNU (USG)"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY20"
      ],
      "full_name": "Host Country Results: Facility (USG)",
      "dataset_id": "OXs3gB3RqtO",
      "id": "HC-R-FACILITY-USG",
      "name": "HC R: Facility (USG)"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY20"
      ],
      "full_name": "Host Country Results: DREAMS (USG)",
      "dataset_id": "mbdbMiLZ4AA",
      "id": "HC-R-COMMUNITY-USG",
      "name": "HC R: Community (USG)"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY20"
      ],
      "full_name": "MER Targets: Narratives (IM)",
      "dataset_id": "OzNbT46cSnx",
      "id": "MER-T-NARRATIVES-IM",
      "name": "MER T: Narratives (IM)"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY20"
      ],
      "full_name": "MER Target Setting: PSNU (Facility and Community Combined)",
      "dataset_id": "Pmc0yYAIi1t",
      "id": "MER-T-PSNU",
      "name": "MER T: PSNU"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY20"
      ],
      "full_name": "MER Target Setting: PSNU (Facility and Community Combined) - DoD ONLY",
      "dataset_id": "s1sxJuqXsvV",
      "id": "MER-T-PSNU-DOD-ONLY",
      "name": "MER T: PSNU - DoD Only"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY20"
      ],
      "full_name": "Host Country Targets: Narratives (USG)",
      "dataset_id": "J6Bdw3JFQ6t",
      "id": "HC-T-NARRATIVES-USG",
      "name": "HC T: Narratives (USG)"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY20"
      ],
      "full_name": "Host Country Targets: Operating Unit Level (USG)",
      "dataset_id": "i1ajYm6k2yL",
      "id": "HC-T-OPERATING-UNIT-LEVEL-USG",
      "name": "HC T: Operating Unit Level (USG)"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY20"
      ],
      "full_name": "Host Country Targets: COP Prioritization SNU (USG)",
      "dataset_id": "j7jzezIhgPj",
      "id": "HC-T-COP-PRIORITIZATION-SNU-USG",
      "name": "HC T: COP Prioritization SNU (USG)"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY19"
      ],
      "full_name": "MER Results: Community Based FY2019Q4",
      "dataset_id": "zUoy5hk8r0q",
      "id": "MER-R-COMMUNITY-BASED-FY2019Q4",
      "name": "MER R: Community Based FY2019Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY19"
      ],
      "full_name": "MER Results: Community Based - DoD ONLY FY2019Q4",
      "dataset_id": "PyD4x9oFwxJ",
      "id": "MER-R-COMMUNITY-BASED-DOD-ONLY-FY2019Q4",
      "name": "MER R: Community Based - DoD ONLY FY2019Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY19"
      ],
      "full_name": "MER Results: Facility Based FY2019Q4",
      "dataset_id": "KWRj80vEfHU",
      "id": "MER-R-FACILITY-BASED-FY2019Q4",
      "name": "MER R: Facility Based FY2019Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY19"
      ],
      "full_name": "MER Results: Facility Based - DoD ONLY FY2019Q4",
      "dataset_id": "fi9yMqWLWVy",
      "id": "MER-R-FACILITY-BASED-DOD-ONLY-FY2019Q4",
      "name": "MER R: Facility Based - DoD ONLY FY2019Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY18",
        "FY19"
      ],
      "full_name": "MER Results: Medical Store FY2019Q4",
      "dataset_id": "IZ71Y2mEBJF",
      "id": "MER-R-MEDICAL-STORE-FY2019Q4",
      "name": "MER R: Medical Store FY2019Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY19"
      ],
      "full_name": "MER Results: Operating Unit Level (IM) FY2019Q4",
      "dataset_id": "ndp6aR3e1X3",
      "id": "MER-R-OPERATING-UNIT-LEVEL-IM-FY2019Q4",
      "name": "MER R: Operating Unit Level (IM) FY2019Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY19"
      ],
      "full_name": "MER Results: Narratives (IM) FY2019Q4",
      "dataset_id": "pnlFw2gDGHD",
      "id": "MER-R-NARRATIVES-IM-FY2019Q4",
      "name": "MER R: Narratives (IM) FY2019Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY19"
      ],
      "full_name": "Host Country Results: Narratives (USG) FY2019Q4",
      "dataset_id": "gc4KOv8kGlI",
      "id": "HC-R-NARRATIVES-USG-FY2019Q4",
      "name": "HC R: Narratives (USG) FY2019Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY19"
      ],
      "full_name": "Host Country Results: Operating Unit Level (USG) FY2019Q4",
      "dataset_id": "FsYxodZiXyH",
      "id": "HC-R-OPERATING-UNIT-LEVEL-USG-FY2019Q4",
      "name": "HC R: Operating Unit Level (USG) FY2019Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY19"
      ],
      "full_name": "Host Country Results: COP Prioritization SNU (USG) FY2019Q4",
      "dataset_id": "iJ4d5HdGiqG",
      "id": "HC-R-COP-PRIORITIZATION-SNU-USG-FY2019Q4",
      "name": "HC R: COP Prioritization SNU (USG) FY2019Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY19"
      ],
      "full_name": "Host Country Results: Facility (USG) FY2019Q4",
      "dataset_id": "GiqB9vjbdwb",
      "id": "HC-R-FACILITY-USG-FY2019Q4",
      "name": "HC R: Facility (USG) FY2019Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY19"
      ],
      "full_name": "Host Country Results: DREAMS (USG) FY2019Q4",
      "dataset_id": "EbZrNIkuPtc",
      "id": "HC-R-COMMUNITY-USG-FY2019Q4",
      "name": "HC R: Community (USG) FY2019Q4"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY19"
      ],
      "full_name": "MER Targets: Community Based FY2020",
      "dataset_id": "nIHNMxuPUOR",
      "id": "MER-T-COMMUNITY-BASED-FY2020",
      "name": "MER T: Community Based FY2020"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY19"
      ],
      "full_name": "MER Targets: Community Based - DoD ONLY FY2020",
      "dataset_id": "C2G7IyPPrvD",
      "id": "MER-T-COMMUNITY-BASED-DOD-ONLY-FY2020",
      "name": "MER T: Community Based - DoD ONLY FY2020"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY19"
      ],
      "full_name": "MER Targets: Facility Based FY2020",
      "dataset_id": "sBv1dj90IX6",
      "id": "MER-T-FACILITY-BASED-FY2020",
      "name": "MER T: Facility Based FY2020"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY19"
      ],
      "full_name": "MER Targets: Facility Based - DoD ONLY FY2020",
      "dataset_id": "HiJieecLXxN",
      "id": "MER-T-FACILITY-BASED-DOD-ONLY-FY2020",
      "name": "MER T: Facility Based - DoD ONLY FY2020"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY19"
      ],
      "full_name": "MER Targets: Narratives (IM) FY2020",
      "dataset_id": "dNGGlQyiq9b",
      "id": "MER-T-NARRATIVES-IM-FY2020",
      "name": "MER T: Narratives (IM) FY2020"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY19"
      ],
      "full_name": "Host Country Targets: Narratives (USG) FY2020",
      "dataset_id": "tTK9BhvS5t3",
      "id": "HC-T-NARRATIVES-USG-FY2020",
      "name": "HC T: Narratives (USG) FY2020"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY19"
      ],
      "full_name": "Host Country Targets: Operating Unit Level (USG) FY2020",
      "dataset_id": "PH3bllbLw8W",
      "id": "HC-T-OPERATING-UNIT-LEVEL-USG-FY2020",
      "name": "HC T: Operating Unit Level (USG) FY2020"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY19"
      ],
      "full_name": "Host Country Targets: COP Prioritization SNU (USG) FY2020",
      "dataset_id": "N4X89PgW01w",
      "id": "HC-T-COP-PRIORITIZATION-SNU-USG-FY2020",
      "name": "HC T: COP Prioritization SNU (USG) FY2020"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Results: Community Based FY2018Q4",
      "dataset_id": "WbszaIdCi92",
      "id": "MER-R-COMMUNITY-BASED-FY2018Q4",
      "name": "MER R: Community Based FY2018Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Results: Community Based - DoD ONLY FY2018Q4",
      "dataset_id": "uN01TT331OP",
      "id": "MER-R-COMMUNITY-BASED-DOD-ONLY-FY2018Q4",
      "name": "MER R: Community Based - DoD ONLY FY2018Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Results: Facility Based FY2018Q4",
      "dataset_id": "tz1bQ3ZwUKJ",
      "id": "MER-R-FACILITY-BASED-FY2018Q4",
      "name": "MER R: Facility Based FY2018Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Results: Facility Based - DoD ONLY FY2018Q4",
      "dataset_id": "BxIx51zpAjh",
      "id": "MER-R-FACILITY-BASED-DOD-ONLY-FY2018Q4",
      "name": "MER R: Facility Based - DoD ONLY FY2018Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Results: Operating Unit Level (IM) FY2018Q4",
      "dataset_id": "mByGopCrDvL",
      "id": "MER-R-OPERATING-UNIT-LEVEL-IM-FY2018Q4",
      "name": "MER R: Operating Unit Level (IM) FY2018Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Results: Narratives (IM) FY2018Q4",
      "dataset_id": "XZfmcxHV4ie",
      "id": "MER-R-NARRATIVES-IM-FY2018Q4",
      "name": "MER R: Narratives (IM) FY2018Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY18"
      ],
      "full_name": "Host Country Results: Narratives (USG) FY2018Q4",
      "dataset_id": "jcS5GPoHDE0",
      "id": "HC-R-NARRATIVES-USG-FY2018Q4",
      "name": "HC R: Narratives (USG) FY2018Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY18"
      ],
      "full_name": "Host Country Results: Operating Unit Level (USG) FY2018Q4",
      "dataset_id": "USbxEt75liS",
      "id": "HC-R-OPERATING-UNIT-LEVEL-USG-FY2018Q4",
      "name": "HC R: Operating Unit Level (USG) FY2018Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY18"
      ],
      "full_name": "Host Country Results: COP Prioritization SNU (USG) FY2018Q4",
      "dataset_id": "a4FRJ2P4cLf",
      "id": "HC-R-COP-PRIORITIZATION-SNU-USG-FY2018Q4",
      "name": "HC R: COP Prioritization SNU (USG) FY2018Q4"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Targets: Community Based FY2019",
      "dataset_id": "l796jk9SW7q",
      "id": "MER-T-COMMUNITY-BASED-FY2019",
      "name": "MER T: Community Based FY2019"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Targets: Community Based - DoD ONLY FY2019",
      "dataset_id": "BWBS39fydnX",
      "id": "MER-T-COMMUNITY-BASED-DOD-ONLY-FY2019",
      "name": "MER T: Community Based - DoD ONLY FY2019"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Targets: Facility Based FY2019",
      "dataset_id": "eyI0UOWJnDk",
      "id": "MER-T-FACILITY-BASED-FY2019",
      "name": "MER T: Facility Based FY2019"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Targets: Facility Based - DoD ONLY FY2019",
      "dataset_id": "X8sn5HE5inC",
      "id": "MER-T-FACILITY-BASED-DOD-ONLY-FY2019",
      "name": "MER T: Facility Based - DoD ONLY FY2019"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Targets: Narratives (IM) FY2019",
      "dataset_id": "TdLjizPNezI",
      "id": "MER-T-NARRATIVES-IM-FY2019",
      "name": "MER T: Narratives (IM) FY2019"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "Host Country Targets: Narratives (USG) FY2019",
      "dataset_id": "I8v9shsCZDS",
      "id": "HC-T-NARRATIVES-USG-FY2019",
      "name": "HC T: Narratives (USG) FY2019"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "Host Country Targets: Operating Unit Level (USG) FY2019",
      "dataset_id": "lXQGzSqmreb",
      "id": "HC-T-OPERATING-UNIT-LEVEL-USG-FY2019",
      "name": "HC T: Operating Unit Level (USG) FY2019"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "Host Country Targets: COP Prioritization SNU (USG) FY2019",
      "dataset_id": "Ncq22MRC6gd",
      "id": "HC-T-COP-PRIORITIZATION-SNU-USG-FY2019",
      "name": "HC T: COP Prioritization SNU (USG) FY2019"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Targets: Facility Based FY2018",
      "dataset_id": "AitXBHsC7RA",
      "id": "MER-T-FACILITY-BASED-FY2018",
      "name": "MER T: Facility Based FY2018"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Targets: Community Based FY2018",
      "dataset_id": "BuRoS9i851o",
      "id": "MER-T-COMMUNITY-BASED-FY2018",
      "name": "MER T: Community Based FY2018"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Targets: Facility Based - DoD ONLY FY2018",
      "dataset_id": "jEzgpBt5Icf",
      "id": "MER-T-FACILITY-BASED-DOD-ONLY-FY2018",
      "name": "MER T: Facility Based - DoD ONLY FY2018"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Targets: Community Based - DoD ONLY FY2018",
      "dataset_id": "ePndtmDbOJj",
      "id": "MER-T-COMMUNITY-BASED-DOD-ONLY-FY2018",
      "name": "MER T: Community Based - DoD ONLY FY2018"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Targets: Narratives (IM) FY2018",
      "dataset_id": "AvmGbcurn4K",
      "id": "MER-T-NARRATIVES-IM-FY2018",
      "name": "MER T: Narratives (IM) FY2018"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "Host Country Targets: COP Prioritization SNU (USG) FY2018",
      "dataset_id": "O8hSwgCbepv",
      "id": "HC-T-COP-PRIORITIZATION-SNU-USG-FY2018",
      "name": "HC T: COP Prioritization SNU (USG) FY2018"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "MER Targets: Operating Unit Level (IM) FY2018",
      "dataset_id": "bqiB5G6qgzn",
      "id": "MER-T-OPERATING-UNIT-LEVEL-IM-FY2018",
      "name": "MER T: Operating Unit Level (IM) FY2018"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "Host Country Targets: Operating Unit Level (USG) FY2018",
      "dataset_id": "YWZrOj5KS1c",
      "id": "HC-T-OPERATING-UNIT-LEVEL-USG-FY2018",
      "name": "HC T: Operating Unit Level (USG) FY2018"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "Planning Attributes: COP Prioritization National",
      "dataset_id": "c7Gwzm5w9DE",
      "id": "PLANNING-ATTRIBUTES-COP-PRIORITIZATION-NATIONAL",
      "name": "Planning Attributes: COP Prioritization National"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY18"
      ],
      "full_name": "Planning Attributes: COP Prioritization SNU FY2020",
      "dataset_id": "pTuDWXzkAkJ",
      "id": "PLANNING-ATTRIBUTES-COP-PRIORITIZATION-SNU-FY2020",
      "name": "Planning Attributes: COP Prioritization SNU FY2020"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Facility Based FY2017Q4",
      "dataset_id": "uTvHPA1zqzi",
      "id": "MER-R-FACILITY-BASED-FY2017Q4",
      "name": "MER R: Facility Based FY2017Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Community Based FY2017Q4",
      "dataset_id": "O3VMNi8EZSV",
      "id": "MER-R-COMMUNITY-BASED-FY2017Q4",
      "name": "MER R: Community Based FY2017Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Facility Based - DoD ONLY FY2017Q4",
      "dataset_id": "asptuHohmHt",
      "id": "MER-R-FACILITY-BASED-DOD-ONLY-FY2017Q4",
      "name": "MER R: Facility Based - DoD ONLY FY2017Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Community Based - DoD ONLY FY2017Q4",
      "dataset_id": "Ir58H3zBKEC",
      "id": "MER-R-COMMUNITY-BASED-DOD-ONLY-FY2017Q4",
      "name": "MER R: Community Based - DoD ONLY FY2017Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Medical Store FY2017Q4",
      "dataset_id": "kuV7OezWYUj",
      "id": "MER-R-MEDICAL-STORE-FY2017Q4",
      "name": "MER R: Medical Store FY2017Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Narratives (IM) FY2017Q4",
      "dataset_id": "f78MvV1k0rA",
      "id": "MER-R-NARRATIVES-IM-FY2017Q4",
      "name": "MER R: Narratives (IM) FY2017Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Operating Unit Level (IM) FY2017Q4",
      "dataset_id": "jTRF4LdklYA",
      "id": "MER-R-OPERATING-UNIT-LEVEL-IM-FY2017Q4",
      "name": "MER R: Operating Unit Level (IM) FY2017Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "Host Country Results: Narratives (USG) FY2017Q4",
      "dataset_id": "bQTvQq3pDEK",
      "id": "HC-R-NARRATIVES-USG-FY2017Q4",
      "name": "HC R: Narratives (USG) FY2017Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "Host Country Results: Operating Unit Level (USG) FY2017Q4",
      "dataset_id": "tFBgL95CRtN",
      "id": "HC-R-OPERATING-UNIT-LEVEL-USG-FY2017Q4",
      "name": "HC R: Operating Unit Level (USG) FY2017Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "Host Country Results: COP Prioritization SNU (USG) FY2017Q4",
      "dataset_id": "zNMzQjXhX7w",
      "id": "HC-R-COP-PRIORITIZATION-SNU-USG-FY2017Q4",
      "name": "HC R: COP Prioritization SNU (USG) FY2017Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Facility Based FY2017Q3",
      "dataset_id": "kkXf2zXqTM0",
      "id": "MER-R-FACILITY-BASED-FY2017Q3",
      "name": "MER R: Facility Based FY2017Q3"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Community Based FY2017Q3",
      "dataset_id": "MqNLEXmzIzr",
      "id": "MER-R-COMMUNITY-BASED-FY2017Q3",
      "name": "MER R: Community Based FY2017Q3"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Facility Based - DoD ONLY FY2017Q3",
      "dataset_id": "K7FMzevlBAp",
      "id": "MER-R-FACILITY-BASED-DOD-ONLY-FY2017Q3",
      "name": "MER R: Facility Based - DoD ONLY FY2017Q3"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Community Based - DoD ONLY FY2017Q3",
      "dataset_id": "UZ2PLqSe5Ri",
      "id": "MER-R-COMMUNITY-BASED-DOD-ONLY-FY2017Q3",
      "name": "MER R: Community Based - DoD ONLY FY2017Q3"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Medical Store FY2017Q3",
      "dataset_id": "CGoi5wjLHDy",
      "id": "MER-R-MEDICAL-STORE-FY2017Q3",
      "name": "MER R: Medical Store FY2017Q3"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Operating Unit Level (IM) FY2017Q3",
      "dataset_id": "LWE9GdlygD5",
      "id": "MER-R-OPERATING-UNIT-LEVEL-IM-FY2017Q3",
      "name": "MER R: Operating Unit Level (IM) FY2017Q3"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Narratives (IM) FY2017Q3",
      "dataset_id": "tG2hjDIaYQD",
      "id": "MER-R-NARRATIVES-IM-FY2017Q3",
      "name": "MER R: Narratives (IM) FY2017Q3"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "Host Country Results: Narratives (USG) FY2017Q3",
      "dataset_id": "Kxfk0KVsxDn",
      "id": "HC-R-NARRATIVES-USG-FY2017Q3",
      "name": "HC R: Narratives (USG) FY2017Q3"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "Host Country Results: Operating Unit Level (USG) FY2017Q3",
      "dataset_id": "PkmLpkrPdQG",
      "id": "HC-R-OPERATING-UNIT-LEVEL-USG-FY2017Q3",
      "name": "HC R: Operating Unit Level (USG) FY2017Q3"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "Host Country Results: COP Prioritization SNU (USG) FY2017Q3",
      "dataset_id": "zeUCqFKIBDD",
      "id": "HC-R-COP-PRIORITIZATION-SNU-USG-FY2017Q3",
      "name": "HC R: COP Prioritization SNU (USG) FY2017Q3"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Facility Based FY2017Q1",
      "dataset_id": "hgOW2BSUDaN",
      "id": "MER-R-FACILITY-BASED-FY2017Q1",
      "name": "MER R: Facility Based FY2017Q1"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Community Based FY2017Q1",
      "dataset_id": "Awq346fnVLV",
      "id": "MER-R-COMMUNITY-BASED-FY2017Q1",
      "name": "MER R: Community Based FY2017Q1"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Facility Based - DoD ONLY FY2017Q1",
      "dataset_id": "CS958XpDaUf",
      "id": "MER-R-FACILITY-BASED-DOD-ONLY-FY2017Q1",
      "name": "MER R: Facility Based - DoD ONLY FY2017Q1"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Community Based - DoD ONLY FY2017Q1",
      "dataset_id": "ovmC3HNi4LN",
      "id": "MER-R-COMMUNITY-BASED-DOD-ONLY-FY2017Q1",
      "name": "MER R: Community Based - DoD ONLY FY2017Q1"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Narratives (IM) FY2017Q1",
      "dataset_id": "zTgQ3MvHYtk",
      "id": "MER-R-NARRATIVES-IM-FY2017Q1",
      "name": "MER R: Narratives (IM) FY2017Q1"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Results: Operating Unit Level (IM) FY2017Q1",
      "dataset_id": "KwkuZhKulqs",
      "id": "MER-R-OPERATING-UNIT-LEVEL-IM-FY2017Q1",
      "name": "MER R: Operating Unit Level (IM) FY2017Q1"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY17"
      ],
      "full_name": "Host Country Results: Narratives (USG) FY2017Q1",
      "dataset_id": "eAlxMKMZ9GV",
      "id": "HC-R-NARRATIVES-USG-FY2017Q1",
      "name": "HC R: Narratives (USG) FY2017Q1"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Targets: Facility Based FY2017",
      "dataset_id": "qRvKHvlzNdv",
      "id": "MER-T-FACILITY-BASED-FY2017",
      "name": "MER T: Facility Based FY2017"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Targets: Community Based FY2017",
      "dataset_id": "tCIW2VFd8uu",
      "id": "MER-T-COMMUNITY-BASED-FY2017",
      "name": "MER T: Community Based FY2017"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Targets: Facility Based - DoD ONLY FY2017",
      "dataset_id": "JXKUYJqmyDd",
      "id": "MER-T-FACILITY-BASED-DOD-ONLY-FY2017",
      "name": "MER T: Facility Based - DoD ONLY FY2017"
    },
    {
      "description": "DoD only version of community form so that location of collection remains unknown.",
      "codelist_type": "Target",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Targets: Community Based - DoD ONLY FY2017",
      "dataset_id": "lbwuIo56YoG",
      "id": "MER-T-COMMUNITY-BASED-DOD-ONLY-FY2017",
      "name": "MER T: Community Based - DoD ONLY FY2017"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Targets: Narratives (IM) FY2017",
      "dataset_id": "AyFVOGbAvcH",
      "id": "MER-T-NARRATIVES-IM-FY2017",
      "name": "MER T: Narratives (IM) FY2017"
    },
    {
      "description": "MER Targets Narratives entered by USG persons that summarize the partner narratives.",
      "codelist_type": "Target",
      "periods": [
        "FY17"
      ],
      "full_name": "Host Country Targets: Narratives (USG) FY2017",
      "dataset_id": "oYO9GvA05LE",
      "id": "HC-T-NARRATIVES-USG-FY2017",
      "name": "HC T: Narratives (USG) FY2017"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY17"
      ],
      "full_name": "MER Targets: Operating Unit Level (IM) FY2017",
      "dataset_id": "xxo1G5V1JG2",
      "id": "MER-T-OPERATING-UNIT-LEVEL-IM-FY2017",
      "name": "MER T: Operating Unit Level (IM) FY2017"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY17"
      ],
      "full_name": "Host Country Targets: Operating Unit Level (USG) FY2017",
      "dataset_id": "Dd5c9117ukD",
      "id": "HC-T-OPERATING-UNIT-LEVEL-USG-FY2017",
      "name": "HC T: Operating Unit Level (USG) FY2017"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY17"
      ],
      "full_name": "Host Country Targets: COP Prioritization SNU (USG) FY2017",
      "dataset_id": "rK7VicBNzze",
      "id": "HC-T-COP-PRIORITIZATION-SNU-USG-FY2017",
      "name": "HC T: COP Prioritization SNU (USG) FY2017"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Targets: Facility Based FY2016",
      "dataset_id": "rDAUgkkexU1",
      "id": "MER-TARGETS-SITE-FY15",
      "name": "MER T: Facility Based FY2016"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Targets: Community Based FY2016",
      "dataset_id": "xJ06pxmxfU6",
      "id": "MER-TARGETS-SUBNAT-FY15",
      "name": "MER T: Community Based FY2016"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Targets: Facility Based - DoD ONLY FY2016",
      "dataset_id": "IOarm0ctDVL",
      "id": "MER-TARGETS-SITE-FY15-DOD",
      "name": "MER T: Facility Based - DoD ONLY FY2016"
    },
    {
      "description": "DoD only version of community form so that location of collection remains unknown.",
      "codelist_type": "Target",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Targets: Community Based - DoD ONLY FY2016",
      "dataset_id": "LBSk271pP7J",
      "id": "MER-TARGETS-SUBNAT-FY15-DOD",
      "name": "MER T: Community Based - DoD ONLY FY2016"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Targets: Narratives (IM) FY2016",
      "dataset_id": "VjGqATduoEX",
      "id": "MER-TARGETS-NARRTIVES-IM-FY2016",
      "name": "MER T: Narratives (IM) FY2016"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Targets: Operating Unit Level (IM) FY2016",
      "dataset_id": "PHyD22loBQH",
      "id": "MER-TARGETS-OU-IM-FY15",
      "name": "MER T: Operating Unit Level (IM) FY2016"
    },
    {
      "description": "MER Targets Narratives entered by USG persons that summarize the partner narratives.",
      "codelist_type": "Target",
      "periods": [
        "FY16"
      ],
      "full_name": "Host Country Targets: Narratives (USG) FY2016",
      "dataset_id": "TgcTZETxKlb",
      "id": "HC-T-NARRATIVES-USG-FY2016",
      "name": "HC T: Narratives (USG) FY2016"
    },
    {
      "description": "",
      "codelist_type": "Target",
      "periods": [
        "FY16"
      ],
      "full_name": "Host Country Targets: Operating Unit Level (USG) FY2016",
      "dataset_id": "GEhzw3dEw05",
      "id": "HC-T-OPERATING-UNIT-LEVEL-USG-FY2016",
      "name": "HC T: Operating Unit Level (USG) FY2016"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Results: Facility Based FY2016Q4",
      "dataset_id": "ZaV4VSLstg7",
      "id": "MER-R-FACILITY-BASED-FY2016Q4",
      "name": "MER R: Facility Based FY2016Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Results: Community Based FY2016Q4",
      "dataset_id": "sCar694kKxH",
      "id": "MER-R-COMMUNITY-BASED-FY2016Q4",
      "name": "MER R: Community Based FY2016Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Results: Facility Based - DoD ONLY FY2016Q4",
      "dataset_id": "vvHCWnhULAf",
      "id": "MER-R-FACILITY-BASED-DOD-ONLY-FY2016Q4",
      "name": "MER R: Facility Based - DoD ONLY FY2016Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Results: Community Based - DoD ONLY FY2016Q4",
      "dataset_id": "j9bKklpTDBZ",
      "id": "MER-R-COMMUNITY-BASED-DOD-ONLY-FY2016Q4",
      "name": "MER R: Community Based - DoD ONLY FY2016Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Results: Medical Store FY2016Q4",
      "dataset_id": "gZ1FgiGUlSj",
      "id": "MER-R-MEDICAL-STORE-FY2016Q4",
      "name": "MER R: Medical Store FY2016Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Results: Narratives (IM) FY2016Q4",
      "dataset_id": "xBRAscSmemV",
      "id": "MER-R-NARRATIVES-IM-FY2016Q4",
      "name": "MER R: Narratives (IM) FY2016Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Results: Operating Unit Level (IM) FY2016Q4",
      "dataset_id": "VWdBdkfYntI",
      "id": "MER-R-OPERATING-UNIT-LEVEL-IM-FY2016Q4",
      "name": "MER R: Operating Unit Level (IM) FY2016Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "Host Country Results: Narratives (USG) FY2016Q4",
      "dataset_id": "vZaDfrR6nmF",
      "id": "HC-R-NARRATIVES-USG-FY2016Q4",
      "name": "HC R: Narratives (USG) FY2016Q4"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Results: Facility Based FY2016Q3",
      "dataset_id": "i29foJcLY9Y",
      "id": "MER-RESULTS-SITE-FY15",
      "name": "MER R: Facility Based FY2016Q3"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Results: Community Based FY2016Q3",
      "dataset_id": "STL4izfLznL",
      "id": "MER-RESULTS-SUBNAT-FY15",
      "name": "MER R: Community Based FY2016Q3"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Results: Facility Based - DoD ONLY FY2016Q3",
      "dataset_id": "j1i6JjOpxEq",
      "id": "MER-RESULTS-SITE-FY15-DOD",
      "name": "MER R: Facility Based - DoD ONLY FY2016Q3"
    },
    {
      "description": "DoD only version of community form so that location of collection remains unknown.",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Results: Community Based - DoD ONLY FY2016Q3",
      "dataset_id": "asHh1YkxBU5",
      "id": "MER-RESULTS-SUBNAT-FY15-DOD",
      "name": "MER R: Community Based - DoD ONLY FY2016Q3"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Results: Medical Store FY2016Q3",
      "dataset_id": "hIm0HGCKiPv",
      "id": "MER-R-MEDICAL-STORE-FY2016Q3",
      "name": "MER R: Medical Store FY2016Q3"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Results: Narratives (IM) FY2016Q3",
      "dataset_id": "NJlAVhe4zjv",
      "id": "MER-R-NARRATIVES-IM-FY2016Q3",
      "name": "MER R: Narratives (IM) FY2016Q3"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "MER Results: Operating Unit Level (IM) FY2016Q3",
      "dataset_id": "ovYEbELCknv",
      "id": "MER-RESULTS-OU-IM-FY15",
      "name": "MER R: Operating Unit Level (IM) FY2016Q3"
    },
    {
      "description": "MER Results Narratives entered by USG persons to summarize across partners.",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "Host Country Results: Narratives (USG) FY2016Q3",
      "dataset_id": "f6NLvRGixJV",
      "id": "HC-R-NARRATIVES-USG-FY2016Q3",
      "name": "HC R: Narratives (USG) FY2016Q3"
    },
    {
      "description": "",
      "codelist_type": "Results",
      "periods": [
        "FY16"
      ],
      "full_name": "Host Country Results: Operating Unit Level (USG) FY2016Q3",
      "dataset_id": "lD9O8vQgH8R",
      "id": "HC-R-OPERATING-UNIT-LEVEL-USG-FY2016Q3",
      "name": "HC R: Operating Unit Level (USG) FY2016Q3"
    }
  ]
};