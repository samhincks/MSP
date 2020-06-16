import RainbowConnector from "./RainbowConnector.js";
import FhirConnector from "./FhirConnector.js";
import OclConnector from "./OclConnector.js";
import Connector from "./Connector.js";



export function createConnector(sourceObj, sourceConfig, attributeConfig) {
    let id = sourceObj.sourceProfile
    let sourceConfigObj = findSourceConfigObj(sourceConfig, id);
    let connector = new Connector(sourceObj, sourceConfigObj, attributeConfig);
    //console.log("%c creating connector of ", "color:green", id);
    switch (sourceObj.connector.id) {
        case 'OclConnector':
            connector = new OclConnector(sourceObj, sourceConfigObj, attributeConfig);
            break;
        case 'FhirConnector':
            connector = new FhirConnector(sourceObj, sourceConfigObj);
            break;
        case 'PepfarQmapConnector':
            //.. Todo: implement
            // connector = new GenericConnector(connector);
            break;
        case 'RainbowConnector':
            connector = new RainbowConnector(sourceObj, sourceConfigObj, attributeConfig);
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
        console.log("%c Connector " + id + " is not implemented in sourceconfig file", "color:red");
    }
    else {
        return sourceConfigObj;
    }

}
