
import { getJSONDataFromAPI } from "./apiQueries";
import Connector from "./Connector.js";

export default class FhirConnector extends Connector {

    constructor(sourceObj, sourceConfigObj, filterConfig) {
        super(sourceObj, sourceConfigObj, filterConfig);
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
        //. call super.getDetails(metadataset, url) to get details
        let url = this.rootUrl + "/" + metadataSet.id + "/" + entry.row[0];

        let response = await getJSONDataFromAPI(url);

        //.. retrive attributes from attributeConfig if it exists, or fallback on the well-specified Covid, which can function as default
        let attributes = this.filterConfig.metadataSets.find(item => item.id == metadataSet.id);
        if (!attributes) attributes = this.filterConfig.metadataSets.find(item => item.id == "COVID-19-Starter-Set");

        let arrayOfDetails = this.createDetailsStructureForResource(response, attributes)
        let title = response.name;

        let details = {
            items: arrayOfDetails,
            title: title,
            description: this.getDescriptionOfDetail(response, attributes),
            attributes: this.getAttributesOfDetail(response, attributes)
        }
        return details;
    }

}

