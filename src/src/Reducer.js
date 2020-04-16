


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
        metadataSets: action.domain.sources[0].metadataSets,
        metadataSet: action.domain.sources[0].metadataSets[0]
      }

    case 'changeSource':
      return {
        ...state,
        source: action.source,
        metadataSets: action.source.metadataSets,
        metadataSet: action.source.metadataSets[0]
      }
    case 'changeSources':
      return {
        ...state,
        sources: action.sources
      }
    case 'changeMetadataset':
      return {
        ...state,
        metadataSet: action.metadataSet
      }
    case 'setConnector':
      return {
        ...state,
        connector: action.connector
      }
    default:
      return state;
  }
};