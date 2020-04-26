/*
A Connector has one or two subclasses.
If it has one subclass, then there is straightforward
synchronization between it and the React Interface which
populates filter panels and data view components from the
JSON, CSV, XML, or other file formatted data it retrieves
from the unique connectors to a given Source. So this Source
is not Informational in the sense that it makes decisions
on the basis of a Source's properties (except )

We may want to consider synonyms to this class like ConnectorInterfaceBridge.

If it has two subclasses, then the other subclass corresponds to the case
when data is synchronized to APIs from multiple different servers.

In either case, the Interface will paint a rainbow of data menus,
uniquely customized to the one who is supplying the DomainConfig file
in a unique instance of the Meta Data Browser or one which is chained
to the others in a sequence leading to optimization variables specified
in the mentalAndPhysicalStateProfileConfig.json file.

Somewhere else there is a DataView Class with many extensions,
tailored to different UI components and HTTP Responses. The project
is completely open source, and developers may extend these parts.
*/
import { getJSONDataFromAPI } from "./apiQueries";

export class Connector {

    constructor(sourceObj, sourceConfigObj) {
        //... TODO figure out let connectorClass = window[sourceConfigObj.connectorClass];
        this.doAutopopulateMetadataSets = sourceObj.doAutopopulateMetadataSets;

        this.rootUrl = sourceObj.connector.rootUrl;
        this.authenticationMethod = sourceObj.connector.authenticationMethod;
        this.ownerId = sourceObj.attributes.owner_id;

        if (!this.doAutopopulateMetadataSets) {
            this.metadataSets = sourceObj.metadataSets;
        }
    }

    //.. method is
    async getMetadataSets() {
        if (!this.doAutopopulateMetadataSets)
            return this.metadataSets;

        else return []; //.. this method should be overwritten with the unique Connector's method for creating the call
    }
}

export class OclConnector extends Connector {

    constructor(sourceObj, sourceConfigObj) {
        super(sourceObj, sourceConfigObj);
        this.ownerTypeStem = "orgs";
    }

    //.. Todo, make metadatasets set by Reducer changes so that they can be called when APi returns inSource

    /* Metadatasets may already be set if we aren't auto populating, otherwise
    retrieve them from the connector */
    async getMetadataSets() {
        if (!this.doAutopopulateMetadataSets)
            return this.metadataSets;

        let url = this.getCollectionsQuery();
        let jsonResponse = await getJSONDataFromAPI(url); //.. Better to use promises so that the next one can be executed while we wait
        return jsonResponse;
    }

    async getSearchResults(metadataSet) {
        console.log(metadataSet);
        let url = metadataSet.attributes.url;
        switch (metadataSet.id) {
            case 'referenceIndicators':
                url = url + "/concepts/?verbose=true&limit=0&conceptClass=\"Reference+Indicator\"";
                break;
            case 'dataElements':
                url = url + "concepts/?verbose=true&conceptClass=\"Data+Element\"&limit=10&page=1";
                break;
        }
        return getJSONDataFromAPI(url);
    }


    // this is implemented from super class
    prepareSourcesQuery() {
        if (this.rootUrl == null || this.ownerTypeStem == null || this.ownerId == null)
            throw new Error("One attribute is unspecified: Root url is" + this.rootUrl + "ownerTypeStem is " + this.ownerTypeStem + " ownerId is " + this.ownerId);
        return this.rootUrl + "/" + this.ownerTypeStem + "/" + this.ownerId + "/sources?limit=0";
    }

    getCollectionsQuery() {
        if (this.rootUrl == null || this.ownerTypeStem == null || this.ownerId == null)
            throw new Error("One attribute is unspecified: Root url is" + this.rootUrl + "   ownerTypeStem is " + this.ownerTypeStem + "   ownerId is " + this.ownerId);

        return this.rootUrl + "/" + this.ownerTypeStem + "/" + this.ownerId + "/collections?limit=0";
    }

}


//.. Connector is different for each, varying depending on how API queries are structured
//.. Connector sits between interface and connector and may have different abstractions
//.. createSource adapts to specifications in sourceObj and sourceConfigObj

export function createConnector(sourceObj, sourceConfigObj) {
    let connector = new Connector(sourceObj, sourceConfigObj);

    switch (sourceObj.sourceProfile) {
        case 'ocl':
            connector = new OclConnector(sourceObj, sourceConfigObj);
            connector.getMetadataSets();
            break;
        case 'fhir':
            //.. Todo: implement
            break;
        case 'pepfar':
            //.. Todo: implement
            // connector = new GenericConnector(connector);
            break;
        case 'dhis2':
            //.. Todo: implement
            break
    }

    console.log(connector);
    return connector;
}
