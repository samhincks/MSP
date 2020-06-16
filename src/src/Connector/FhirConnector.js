
import { getJSONDataFromAPI } from "./apiQueries";
import Connector from "./Connector.js";

export default class FhirConnector extends Connector {

    constructor(sourceObj, sourceConfigObj) {
        super(sourceObj, sourceConfigObj);
    }

    async getSearchResults(metadataSet) {
        let url = metadataSet.attributes.exampleSearchRequest;
        let results = await getJSONDataFromAPI(url);

        let headers;
        let keys;

        switch (metadataSet.id) {
            default: //case 'Questionnaire':
                headers = ["ID", "Name", "Resource Type"];
                keys = ["resource.id", "resource.title", "resource.resourceType"];
                return super.createTableForResourceWithHeaders(headers, keys, results.entry, true);
        }
    }
    async getDetails(metadataSet, entry) {
        console.log(metadataSet, entry);
        //. call super.getDetails(metadataset, url) to get details
    }

}

