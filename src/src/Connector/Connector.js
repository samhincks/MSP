/**
 * Generic Connector class, extended by multiple subclasses, e.g. RainbowConnector, OclConnector
 */
import { getJSONDataFromAPI } from "./apiQueries";

export default class Connector {

    /* Call this constructor from the class implementing the Connector interface
        Depends on 
        domainConfig.js/source : 
        sourceConfig
        attributeConfig 
    */
    constructor(sourceObj, sourceConfigObj, attributeConfig) {
        this.sourceObj = sourceObj;
        this.filterConfig = attributeConfig;
        this.sourceConfigObj = sourceConfigObj;

        //... TODO figure out let connectorClass = window[sourceConfigObj.connectorClass];
        this.doAutopopulateMetadataSets = sourceObj.doAutopopulateMetadataSets;

        this.rootUrl = sourceObj.connector.rootUrl;
        this.authenticationMethod = sourceObj.connector.authenticationMethod;
        this.ownerId = sourceObj.attributes.owner_id;

        if (!this.doAutopopulateMetadataSets) {
            this.metadataSets = sourceObj.metadataSets;
        }
    }

    /*Generic metadataSets search, override in subclass if url construction is not straightforward */
    async getMetadataSets() {
        if (!this.doAutopopulateMetadataSets)
            return this.metadataSets;

        let populateMetadataSetsUrl = this.rootUrl;
        let jsonResponse = await getJSONDataFromAPI(populateMetadataSetsUrl);
        return jsonResponse;
    }


    /* GetDetails()
        Expect: -  (required) metadataSet that encodes base url of resource request
                -  (required) entry object with information about the specific resource selected (either rooturl + entry.url) or entry is the url
        Return: -  details 
                        .items: a reproduction of the jsonObj with children for items that are childen
                        .title: a string of the title of the object
                        .description: a string with description of the object
                        .attributes: (optional) the attributes to emphasize of the object
    */
    async getDetails(metadataSet, entry) {
        let url;
        if (entry.url) {
            url = this.rootUrl + entry.url;
        }
        else {
            url = entry;
        }

        console.log("%c sr", "color:blue", url);

        let response = await getJSONDataFromAPI(url);
        let attributes = this.filterConfig.metadataSets.find(item => item.id == metadataSet.id);
        if (!attributes) attributes = this.filterConfig.metadataSets.find(item => item.id == "COVID-19-Starter-Set");

        let arrayOfDetails = this.createDetailsStructureForResource(response, attributes)
        let details = {
            items: arrayOfDetails,
            title: this.getTitleOfDetail(response, attributes),
            description: this.getDescriptionOfDetail(response, attributes),
            attributes: this.getAttributesOfDetail(response, attributes)
        }
        return details;
    }


    /* Given a jsonObj as response and a set of attributes (as specified in AttributeConfig),
        returns an arrayOfAttributes with name, id, value properties.
    */
    getAttributesOfDetail(response, attributes) {
        if (!attributes || !attributes.details || !attributes.details.attributes) return [];
        let retAttributes = [];
        for (let attribute of attributes.details.attributes) {//(let [key, value] of attributes.details.attributes) {
            try {
                let value = this.getAttributeWithKeyFromResponse(attribute.id, response);
                let attr = {
                    "name": attribute.name,
                    "id": attribute.id,
                    "value": value
                }
                retAttributes.push(attr);
            }
            catch (e) {
                console.log("%c Could not parse attribute ", "color:red", attribute);
                continue;
            }
        }
        return retAttributes
    }


    //.. todo: implement complex parsing of arrays and sub indexing of objects from attributeConfig
    getAttributeWithKeyFromResponse(key, response) {
        return response[key];
    }


    /* Given the response as a jsonObj and attributes as specified in attributeConfig, 
        return the description for the object as a string
     */
    getDescriptionOfDetail(jsonObj, attributes) {
        if (!attributes || !attributes.details) return "No Description1";
        if (!attributes.details.description) return "No Description2";
        let description = attributes.details.description;

        if (description instanceof Object) {
            try {
                let index = parseInt(description.index);
                let jsonDescriptions = jsonObj[description.id];

                let idOfObjInArray = description.idInArray;
                return jsonDescriptions[index][idOfObjInArray];
            }
            catch (e) { return "No description3" }
        }
        else {
            try {
                return jsonObj[description];
            }
            catch (e) { return "No description4" }
        }
    }


    /* Given the response as a jsonObj and attributes as specified in attributeConfig, 
        return the title for the object as a string
     */
    getTitleOfDetail(jsonObj, attributes) {
        if (!attributes || !attributes.details) return "No Name";
        if (!attributes.details.title) return "No Name";

        if (jsonObj.hasOwnProperty(attributes.details.title)) return jsonObj[attributes.details.title];
        else return "No Name";
    }


    /* Recursive function for creating an array of items  with id, name, and children with recursive call
        Input
            jsonObj - (required) the object to iterate over
            attributes - (optional) attributes to potentially ignore
        Return
            arrayOfObjs with
                - id - the key of the object
                - name - the value with key
                - children - any sub objects or arrays of the object (created recursively)
     */
    createDetailsStructureForResource(jsonObj, attributes, level) {
        if (!level) level = 0;
        let retObjs = [];
        for (let key in jsonObj) {
            // Skip attribute if it's listed in our filterConfig ignore file 
            if (attributes && attributes.ignore.includes(key)) continue;

            let value = jsonObj[key];
            let newObj = {};
            newObj.id = key + level

            if (typeof value === 'string') {
                newObj.name = key;
                newObj.value = value;
            }
            if (typeof value === 'object') {
                newObj.name = key;
                newObj.value = "";
                newObj.children = this.createDetailsStructureForResource(value, attributes, level + 1);
            }
            if (typeof value === 'array') { //.. not sure if this is separate case from object
                newObj.name = key;
                newObj.value = ""
                newObj.children = this.createDetailsStructureForResource(value, attributes, level + 1);
            }
            retObjs.push(newObj);
        }
        return retObjs;
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
        let headers = filterObj.searchAttributes && this.getValuesWithKeyAsArray(filterObj.searchAttributes, "name");
        let keys = filterObj.searchAttributes && this.getValuesWithKeyAsArray(filterObj.searchAttributes, "id");

        let table = this.createTableForResourceWithHeaders(headers, keys, entries, false);
        table.attributes = filterObj.searchAttributes;
        return table;
    }
    /*
        Create a Table of Attributes by querying 
        todo:implement
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
                row: [],
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
                    entry.row.push(value)
                else
                    console.log("Warning: no entry for ", keys[i], " of ", result);
            }
            table.entries.push(entry);
        }

        if (createAttributes)
            table.attributes = this.createAttributesFromTable(table);

        return table;
    }

    /* In the event that we have not created an AttributeConfig file for the object, 
       then we can call createTableForResourceWithHeaders with the createAttributes tags
       and create an attribute description for the table for use in Details and Filter
     */
    createAttributesFromTable(table) {
        let attributes = [];

        for (let i in table.names) { // code be faster if we switched these two loops 
            let attribute = {
                options: [],
                name: table.names[i],
                id: table.ids[i]
            }

            for (let j in table.entries) {
                let option = table.entries[j].row[i];

                if (!(attribute.options.includes(option)))
                    attribute.options.push(option);
            }

            //if (options.length <table.entries) do this at display level
            attributes.push(attribute);
        }
        return attributes;
    }
}

