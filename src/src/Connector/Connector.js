/*
A Connector has one or two subclasses.
If it has one subclass, then there is straightforward
synchronization between it and the React Interface which
populates filter panels and data view components from the
JSON, CSV, XML, or other file formatted data it retrieves
from the unique connectors to a given Source. So this Source
is not Informational in the sense that it makes decisions
on the basis of a Source's properties.
*/
import { getJSONDataFromAPI } from "./apiQueries";
import { Resource, fhirSearchResult, oclSearchResult } from "./Resource";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

export class Connector {

    constructor(sourceObj, sourceConfigObj, filterConfig) {
        this.sourceObj = sourceObj;
        this.filterConfig = filterConfig;
        this.sourceConfigObj = sourceConfigObj;

        //... TODO figure out let connectorClass = window[sourceConfigObj.connectorClass];
        this.doAutopopulateMetadataSets = sourceObj.doAutopopulateMetadataSets;

        this.rootUrl = sourceObj.connector.rootUrl;
        this.authenticationMethod = sourceObj.connector.authenticationMethod;
        this.ownerId = sourceObj.attributes.owner_id;
        //this.titleKey = sourceConfigObj.keys.title;

        if (!this.doAutopopulateMetadataSets) {
            this.metadataSets = sourceObj.metadataSets;
        }
    }

    async getMetadataSets() {
        if (!this.doAutopopulateMetadataSets)
            return this.metadataSets;

        let jsonResponse = await getJSONDataFromAPI(this.rootUrl);
        return jsonResponse;
    }

    /* Restructure an API response to fit with nomenclature of DetailsView [{id:id, name:name, children: }]
     */
    async getDetails(metadataSet, url) {
        let response = await getJSONDataFromAPI(this.rootUrl + url);
        let filterAttributes = this.filterConfig.metadataSets.find(item => item.id == metadataSet.id);
        let arrayOfDetails = this.createDetailsStructureForResource(response, filterAttributes)

        return arrayOfDetails;
    }

    /* Recursive function for creating an array of items 
        with id, name, and children with recursive call
     */
    createDetailsStructureForResource(jsonObj, filterAttributes) {
        let retObjs = [];
        for (let key in jsonObj) {
            // Skip attribute if it's listed in our filterConfig ignore file 
            if (filterAttributes && filterAttributes.ignore.includes(key)) continue;

            let value = jsonObj[key];
            let newObj = {};
            newObj.id = key

            if (typeof value === 'string') {
                newObj.name = value;
            }

            if (typeof value === 'object') {
                newObj.name = key;
                newObj.children = this.createDetailsStructureForResource(value, filterAttributes);
            }
            if (typeof value === 'array') { //.. not sure if this is separate case from object
                newObj.name = key;
                newObj.children = this.createDetailsStructureForResource(value, filterAttributes);
            }
            retObjs.push(newObj);
        }
        return retObjs;
    }

    getTitle(resource) {
        //.. todo handle the fact that the title string can be double nested with a "." in sourceConfig.json
        return resource[this.titleKey];
    }

    getValuesWithKeyAsArray(array, key) {
        let retArray = [];

        for (let i in array) {
            array[i][key] && retArray.push(array[i][key]);
        }
        return retArray;
    }

    /* Create a table object from the attributes specified in the filterObj 
    Expects an attribute to have the key and name properties as specified in
    filterConfig */
    createTableForResourceWithFilter(filterObj, entries) {
        let headers = filterObj.attributes && this.getValuesWithKeyAsArray(filterObj.attributes, "name");
        let keys = filterObj.attributes && this.getValuesWithKeyAsArray(filterObj.attributes, "id");

        let table = this.createTableForResourceWithHeaders(headers, keys, entries, false);
        table.attributes = filterObj.attributes;
        return table;
    }
    /*
        Create a Table of Attributes by querying 
    */
    createTableForResourceWithFacetedFilter(entries) {

    }


    /* Like createTableForResourceWithFilter, this function returns
        a table with entries consisting of objects with only the attributes
        of a given key. But this function takes the desired headers
        and keys as arrays.
     */
    createTableForResourceWithHeaders(names, keys, entries, createAttributes) {
        let table = {
            entries: [],
            names: names,
            ids: keys
        };

        for (let i = 0; i < entries.length; i++) {
            let result = entries[i];

            let entry = {
                values: [],
                url: result.url
            }

            if (entry.url == null)
                console.log("Warning: did not find url for details request of ", result);

            for (let i in keys) {
                let key = keys[i];

                //.. handle keys with double nest eg. entry.resource.id
                let expandedKey = key.split(".");
                let value;


                if (expandedKey.length == 1)
                    value = result[key];

                else if (expandedKey.length == 2)
                    value = result[expandedKey[0]][expandedKey[1]]
                else
                    console.log("> 2 nesting of keys has not been implemented");


                if (value)
                    entry.values.push(value)
                else
                    console.log("Warning: no entry for ", keys[i], " of ", result);
            }
            table.entries.push(entry);
        }

        if (createAttributes)
            table.attributes = this.createAttributesFromTable(table);

        return table;
    }

    createAttributesFromTable(table) {
        let attributes = [];

        for (let i in table.names) { // code be faster if we switched these two loops 
            let attribute = {
                options: [],
                name: table.names[i],
                id: table.ids[i]
            }

            for (let j in table.entries) {
                let option = table.entries[j].values[i];

                if (!(attribute.options.includes(option)))
                    attribute.options.push(option);
            }

            //if (options.length <table.entries) do this at display level
            attributes.push(attribute);
        }
        return attributes;
    }
}



/**
 * The OCL Connector
 */
export class OclConnector extends Connector {

    constructor(sourceObj, sourceConfigObj, filterConfig) {
        super(sourceObj, sourceConfigObj, filterConfig);
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
        //console.log("%c union of arrays", "color:grey", unionOfArrays);
        if (this.sourceObj.excludeMetadataSets) {
            unionOfArrays = unionOfArrays.filter((obj) => {
                return !this.sourceObj.excludeMetadataSets.includes(obj.url);
            });
        }

        return unionOfArrays;
    }


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
        else
            url = metadataSet.attributes.url;

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

        // todo: now we are expecting that JSONData is in fact array of json objects
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

export class RainbowConnector extends Connector {
    constructor(sourceObj, sourceConfigObj) {
        super(sourceObj, sourceConfigObj);
    }

    //.. is getMetadatasets handled by super class?
    async getSearchResults(metadataSet, params) {
        let url = metadataSet.attributes.url;
        let options = {
            "format": "json"
        }
        let entries = await getJSONDataFromAPI(url, options);
        console.log(entries);

        throw new Error("Todo: implement!");
    }
}


export class FhirConnector extends Connector {

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

    async getDetails() {

    }
}


export function createConnector(sourceObj, sourceConfig, filterConfig) {
    let id = sourceObj.sourceProfile
    let sourceConfigObj = findSourceConfigObj(sourceConfig, id);
    let connector = new Connector(sourceObj, sourceConfigObj, filterConfig);
    //console.log("%c creating connector of ", "color:green", id);
    switch (sourceObj.connector.id) {
        case 'OclConnector':
            connector = new OclConnector(sourceObj, sourceConfigObj, filterConfig);
            break;
        case 'FhirConnector':
            connector = new FhirConnector(sourceObj, sourceConfigObj);
            break;
        case 'PepfarQmapConnector':
            //.. Todo: implement
            // connector = new GenericConnector(connector);
            break;
        case 'RainbowConnector':
            connector = new RainbowConnector(sourceObj, sourceConfigObj);
            break;
        case 'dhis2':
            //.. Todo: implement
            break
    }
    return connector;
}




function findSourceConfigObj(sourceConfig, id) {
    let sourceConfigObj = sourceConfig.sourceProfiles.find(obj => obj.id == id);
    if (sourceConfigObj == null) {
        throw new Error("Connector " + id + " is not implemented in sourceconfig file");
    }
    else {
        return sourceConfigObj;
    }

}
