import Connector from './Connector.js'
import { getJSONDataFromAPI } from './apiQueries.js';

/**
 * The OCL Connector
 */
export default class OclConnector extends Connector {

    constructor(sourceObj, sourceConfigObj, attributeConfig) {
        super(sourceObj, sourceConfigObj, attributeConfig);
        this.ownerTypeStem = "orgs";
        this.verbose = true; // todo, genericize or make option
    }


    async getMetadataSets() {
        if (!this.doAutopopulateMetadataSets)
            return this.metadataSets;

        let url = this.getCollectionsQuery();
        let jsonResponse = await getJSONDataFromAPI(url); //.. Better to use promises so that the next one can be executed while we wait

        url = this.getSourcesQuery();
        let jsonResponse2 = await getJSONDataFromAPI(url);

        let unionOfArrays = jsonResponse.concat(jsonResponse2);

        if (this.sourceObj.excludeMetadataSets) {
            unionOfArrays = unionOfArrays.filter((obj) => {
                return !this.sourceObj.excludeMetadataSets.includes(obj.url);
            });
        }

        return unionOfArrays;
    }

    /* Implemented in each connector, calls superclasses in Connector.js
          Expect: -  (required) metadataSet that encodes instructions for how to retrieve search results for a source
                  -  (optional) params object with (optional) {limit, pageNum, filterValues, inputSearch} attributes.details
          Return: -  searchResults 
                          .entries: array of objs {values, url}
                          .names: array of titles
                          .attributes: (optional) straight of attributeConfig
                          .ids: (optional)  array of ids to access items in table
                          .totalEntries: (optional) numberOfEntriesFound    
    */
    async getSearchResults(metadataSet, params) {
        let url;

        if (this.doAutopopulateMetadataSets) {
            /* GET #{api-root-url}#{metadataset-relative-url}/concepts/ */
            url = this.rootUrl + metadataSet.url + "/concepts/";
            if (this.verbose) url += "?verbose=true";
            if (params.limit) url += "&limit=" + params.limit;
            if (params.pageNum) url += "&page=" + params.pageNum;
            if (params.filterValues) {
                for (let [key, value] of Object.entries(params.filterValues)) {
                    if (value === "All") continue;
                    url += "&" + key + "=" + '"' + value + "\"";
                }
            }
        }
        else url = metadataSet.attributes.url;

        if (params.inputSearch) url += "&q=*" + params.inputSearch + "*";

        //.. todo: retire this code
        switch (metadataSet.id) {
            case 'referenceIndicators':
                url = url + "/concepts/?verbose=true&limit=0&conceptClass=\"Reference+Indicator\"";
                break;
            case 'dataElements':
                url = url + "concepts/?verbose=true&conceptClass=\"Data+Element\"&limit=10&page=1";
                break;
        }

        // todo: change filterConfig to attributeConfig
        let entries = await getJSONDataFromAPI(url);
        let filterAttributes = this.filterConfig.metadataSets.find(item => item.id == metadataSet.id);
        let table;

        if (!filterAttributes) {
            filterAttributes = this.filterConfig.metadataSets[0]; // Maybe the filter config we have will work on this new unmarked item. Also, we may want the filterConfig.metadataSets to be an array
        }

        table = super.createTableForResourceWithFilter(filterAttributes, entries);
        table.totalEntries = parseInt(entries.numFound) || null;
        return table;
    }


    // this is implemented from super class
    prepareSourcesQuery() {
        if (this.rootUrl == null || this.ownerTypeStem == null || this.ownerId == null)
            throw new Error("One attribute is unspecified: Root url is" + this.rootUrl + "ownerTypeStem is " + this.ownerTypeStem + " ownerId is " + this.ownerId);

        return this.rootUrl + "/" + this.ownerTypeStem + "/" + this.ownerId + "/sources/?limit=0/";
    }

    getCollectionsQuery() {
        if (this.rootUrl == null || this.ownerTypeStem == null || this.ownerId == null)
            throw new Error("One attribute is unspecified: Root url is" + this.rootUrl + "   ownerTypeStem is " + this.ownerTypeStem + "   ownerId is " + this.ownerId);

        return this.rootUrl + "/" + this.ownerTypeStem + "/" + this.ownerId + "/collections/?limit=0";
    }

    getSourcesQuery() {
        if (this.rootUrl == null || this.ownerTypeStem == null || this.ownerId == null)
            throw new Error("One attribute is unspecified: Root url is" + this.rootUrl + "   ownerTypeStem is " + this.ownerTypeStem + "   ownerId is " + this.ownerId);

        return this.rootUrl + "/" + this.ownerTypeStem + "/" + this.ownerId + "/sources/?limit=0";
    }
}