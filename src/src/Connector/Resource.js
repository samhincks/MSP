/* The resource class 
    - creates keys so that MetaDataViews can inspect properties  */
export class Resource {
    constructor(apiResponse, id) {
        this.apiResponse = apiResponse;
        this.id = id;
    }
}

export class oclSearchResult extends Resource {
    constructor(apiResponse, id) {
        super(apiResponse, id)
    }
    getTitle() {
        return this.apiResponse.display_name;
    }

}


export class fhirSearchResult extends Resource {
    constructor(apiResponse, id) {
        super(apiResponse, id)
    }
    getTitle() {
        return this.apiResponse.resource.title;
    }

}
