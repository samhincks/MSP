import { Connector, createConnector } from "./Connector/Connector.js";
import sourceConfig from "./sourceConfig.json";
import filterConfig from "./filterConfig.json";


export const reducer = (state, action) => {
  switch (action.type) {
    case 'changeUserPassword':
      return {
        ...state,
        user: action.newUser.user,
        password: action.newUser.password
      }

    case 'changeIndicatorName':
      return {
        ...state,
        indicatorName: action.indicatorName
      }

    case 'changeCurrentIndicator':
      return {
        ...state,
        currentIndicator: action.currentIndicator
      }
    case 'changeMatchDataElements':
      return {
        ...state,
        matchDataElements: action.matchDataElements
      }

    case 'changeDomain':
      return {
        ...state,
        domain: action.domain,
        sources: action.domain.sources,
        source: action.domain.sources[0],
        connector: createConnector(action.domain.sources[0], sourceConfig, filterConfig)
      }


    case 'changeSources':
      return {
        ...state,
        sources: action.sources,
        connector: createConnector(action.sources[0], sourceConfig)
      }

    case 'changeSource':
      return {
        ...state,
        connector: createConnector(action.source, sourceConfig),
        source: action.source
        // metadataSets: action.source.metadataSets,
        // metadataSet: action.source.metadataSets[0]
      }

    case 'changeMetadataSets':
      return {
        ...state,
        metadataSets: action.metadataSets,
        metadataSet: action.metadataSets[0]
      }

    case 'changeMetadataSet':
      console.log(action.metadataSet);
      return {
        ...state,
        metadataSet: action.metadataSet
      }

    case 'changeSearchResults':
      return {
        ...state,
        searchResults: action.searchResults,
      }

    case 'setDetails':
      return {
        ...state,
        details: action.details,
      }

    case 'setSearch':
      return {
        ...state,
        search: action.search,
      }

    case 'setLimit':
      return {
        ...state,
        limit: action.limit
      }

    case 'setPageNum':
      return {
        ...state,
        pageNum: action.pageNum
      }


    /* For custom Pepfar components */
    case 'setDataElements':
      return {
        ...state,
        dataElements: action.dataElements,
      }


    case 'setDetailPanel':
      return {
        ...state,
        detailPanel: action.detailPanel,
      }


    case 'setSelectedDataElement':
      return {
        ...state,
        selectedDataElement: action.selectedDataElement,
      }

    case 'setDataElementDetail':
      return {
        ...state,
        dataElementDetail: action.dataElementDetail,
      }


    case 'setFilteredData':
      return {
        ...state,
        filtered: action.filtered
      }

    case 'changeFilterValues':
      return {
        ...state,
        filterValues: action.filterValues
      }
    /*  End custom components */


    default:
      return state;
  }
};
