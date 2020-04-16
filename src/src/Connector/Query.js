
export default class Query {
    queryTypes = ['s', 'a'];

    constructor(queryType, params) {
        console.log(queryType);
        this.params = params;
    }

    queryDataElementsAllPeriodsMER = function () {

    }

}
/*
export const Query = async (params) => {

    const { url, headers, contentType } = params;

    try {
        let response = await fetch(url, {
            contentType: contentType ? contentType : "application/json",
            headers: headers ? headers : null,
        })

        if (!response.ok) {
            throw new Error(response)
        }

        let responseJson = await response.json()

        return responseJson
    }

    catch (err) {
        console.log("We had an error", err)
    }
}
*/

