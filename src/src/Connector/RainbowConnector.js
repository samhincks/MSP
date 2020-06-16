import Connector from './Connector.js'
import { getJSONDataFromAPI } from './apiQueries.js';

export default class RainbowConnector extends Connector {
    constructor(sourceObj, sourceConfigObj, attributeConfig) {
        super(sourceObj, sourceConfigObj, attributeConfig);
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
        //.. Structure a URL query depending on selected source
        let url;

        if (this.doAutopopulateMetadataSets) {
            if (this.sourceObj.id === "imap") {
                let countryCode = metadataSet.extras.datim_moh_country_code;
                let period = metadataSet.extras.datim_moh_period;
                console.log(countryCode);
                url = this.rootUrl + "/" + countryCode + "/" + period + "/";
            }
            else if (this.sourceObj.id === "mer") {
                url = this.rootUrl + metadataSet.short_code + "/";
            }
            else if (this.sourceObj.id === "qmap") {
                url = this.rootUrl + metadataSet.name + "/qmaps/";
            }
            else if (this.sourceObj.id === "moh") {
                url = this.rootUrl + metadataSet.extras.Period;
            }
            else {
                url = this.rootUrl + "";
            }
        }
        else {
            url = metadataSet.attributes.url;
        }

        //.. make API request in APIQueries.js
        let entries = await getJSONDataFromAPI(url + "?format=json");

        let searchResults = {}

        switch (this.sourceObj.id) {
            case 'moh':
                searchResults.names = this.getAllValuesOfKeyFromArray("name", entries.headers);
                searchResults.entries = entries.rows;
                break;
            case 'imap':
                searchResults.names = Object.keys(entries[0]);
                searchResults.entries = [];
                for (let obj of entries) {
                    let row = Object.values(obj);
                    searchResults.entries.push(row);
                }
                break;
            case 'mer':
                searchResults.names = this.getAllValuesOfKeyFromArray("name", entries.headers);
                searchResults.entries = entries.rows;
                break;
            case 'qmap':
                let headers = ["ID", "Name", "Questionnaire UID"];
                let keys = ["id", "full_name", "extras.questionnaireuid"];
                searchResults = super.createTableForResourceWithHeaders(headers, keys, entries, true);
                break;
        }
        console.log("%c entries length", "color:green", entries)
        searchResults.totalEntries = parseInt(entries.numFound) || entries.height || (entries.rows && entries.rows.length) || null;

        return searchResults;
    }

    /* Overrides getDetails method in connector, calls superclasses in Connector.js
        Expect: -  (required) metadataSet that encodes base url of resource request
                -  (required) entry object with information about the specific resource selected
        Return: -  details 
                        .items: a reproduction of the jsonObj with children for items that are childen
                        .title: a string of the title of the object
                        .description: a string with description of the object
                        .attributes: (optional) the attributes to emphasize of the object
    */
    async getDetails(metadataSet, entry) {
        let url;
        console.log("%c url", "color:purple", entry);
        console.log("%c url", "color:red", metadataSet);

        switch (this.sourceObj.id) {
            case 'moh':
                url = this.sourceObj.connector.detailsUrl + metadataSet.id + "/concepts/" + entry[3] + "/?includeMappings=true&includeInverseMappings=true";
                break;
            case 'qmap':
                url = this.rootUrl + metadataSet.id + "/qmaps/" + entry.row[0];
                break;
            case 'mer':
                url = this.sourceObj.connector.detailsUrl + entry[3] + "/?includeMappings=true&includeInverseMappings=true";
                break;
        }

        let response = await getJSONDataFromAPI(url);

        //.. retrive attributes from attributeConfig if it exists, or fallback on the well-specified Covid, which can function as default
        let attributes = this.filterConfig.metadataSets.find(item => item.id == metadataSet.id);
        if (!attributes) attributes = this.filterConfig.metadataSets.find(item => item.id == "COVID-19-Starter-Set");

        let arrayOfDetails = this.createDetailsStructureForResource(response, attributes)
        let title = this.getTitleForRainbowSource(response, attributes);

        let details = {
            items: arrayOfDetails,
            title: title,
            description: this.getDescriptionOfDetail(response, attributes),
            attributes: this.getAttributesOfDetail(response, attributes)
        }
        return details;
    }

    getTitleForRainbowSource(response, attributes) {
        let retTitle = this.getTitleOfDetail(response, attributes);

        if (retTitle == "No Name") {
            switch (this.sourceObj.id) {
                case 'qmap':
                    return this.getTitleOfDetailWithKey(response, "name");
            }
        }
        return retTitle;
    }

    getTitleOfDetailWithKey(jsonObj, key) {
        console.log("%c getTitle", "color:yellow", jsonObj, key)
        if (jsonObj.hasOwnProperty(key)) return jsonObj[key];
        else return "Nameless";
    }

    async getMetadataSets() {
        if (!this.doAutopopulateMetadataSets)
            return this.metadataSets;
        console.log("%c getting " + this.sourceObj.id, "color:blue")

        let jsonResponse;
        if (this.sourceObj.id === "qmap") {
            console.log("%c getting " + this.sourceObj.id, "color:blue")

            jsonResponse = await getJSONDataFromAPI(this.rootUrl);
        }
        else if (this.sourceObj.id === "moh") {
            jsonResponse = await getJSONDataFromAPI(this.sourceObj.connector.tempUrl);
        }
        else if (this.sourceObj.id === "mer") {
            jsonResponse = await getJSONDataFromAPI(this.sourceObj.connector.tempUrl + "/?format=json");
        }
        else {
            console.log("%c getting " + this.sourceObj.id, "color:blue")
            jsonResponse = await getJSONDataFromAPI(this.rootUrl + "/?format=json");
        }
        return jsonResponse;
    }

    getAllValuesOfKeyFromArray(key, array) {
        let retArray = []
        for (let obj of array) {
            retArray.push(obj[key]);
        }
        return retArray;
    }
}
