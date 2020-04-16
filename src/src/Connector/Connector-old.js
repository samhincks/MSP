/*
    Class Connector

    Frameworks to Consider
    -- Use Redux
            Action that calls API, Zero delay between UI updates and API calls
    -- Use Firebase
            Store data temporarily in Firebase

    Problem to solve
    Make it possible to call several different APIs

    Subproblems
    Get data from different domains.

    Make a Component
    - It's a dropdown that lets you decide the source

    Go to Material UI and check out select item

   - Write Tests
   - Mock test

   ReferenceIndicatorFilter is preloaded with REST API call

   Smart Query Generic Query builder

   Some key Actions/methods for the Connector class (and some of this in a source class?):
   getFilterSettingsForMetadataSet (either from config or a connector or source's REST API)
   buildFilterPanel
      getFilterOptions (eg Fiscal Year has options "FY16", "FY17", ... -- either from config or REST API)
      some method for building the logic that filters the filter options
   buildSearchCriteriaObject (compiles filter and search settings and returns as json object)
   runSearch (given a set of search critiera, run the search and return a list of results -- the search results would likely be handed off to a View)
   fetchResource (given a selected resource, eg HTS_TST reference indicator, fetch a specific resource and hand off to a View)
*/

import React, { Fragment, useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components';
import domainConfig from '../domainConfig.json';
import Button from '@material-ui/core/Button';
import Query from './Query.js';


// OCL API settings are specific to a connection
const OCL_DOMAIN = (window.OCL_DOMAIN) || 'staging.openconceptlab.org';
const domain = OCL_DOMAIN
const org = "PEPFAR-Test7";
const rowsPerPage = 25;
const page = 0;
const indicatorQuery = "";
const version = "";

let queryDataElementsAllPeriodsMER = 'https://api.' + domain + '/orgs/' + org + '/sources/MER' + version + '/concepts/?verbose=true&conceptClass="Data+Element"&limit=' + rowsPerPage + '&page=' + (page + 1) + indicatorQuery;

async function getData() {
    let response = await fetch(queryDataElementsAllPeriodsMER);
    console.log(response)
}

//.. StyledComponents, Elements with no other function than to add style to a react component.
const SelectContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    max-width: 100%;
    margin-top: 10px;
    padding-top: 25px;
`

export default function connectorMenu() {

    const [api, setApi] = useState(domainConfig.domains[0])

    return (
        <SelectContainer>
            <Select value={api} onChange={(e) => setApi(e.target.value)} labelId="label" id="select">
                {domainConfig.domains.map(domain =>
                    <MenuItem key={domain.id} value={domain}>{domain.title}</MenuItem>
                )}
            </Select>
            <Button onClick={() => runQuery(api)} variant="contained" color="primary"> Query </Button>
            <ShowDataInformation api={api}></ShowDataInformation>
        </SelectContainer>
    )
}


async function runQuery(api) {
    let response = await fetch(queryDataElementsAllPeriodsMER);
    const OCL_DOMAIN = (window.OCL_DOMAIN) || 'staging.openconceptlab.org';
    const domain = OCL_DOMAIN
    const org = "PEPFAR-Test7";
    const rowsPerPage = 25;
    const page = 0;
    const indicatorQuery = "";
    const version = "";

    let queryDataElementsAllPeriodsMER = 'https://api.' + domain + '/orgs/' + org + '/sources/MER' + version + '/concepts/?verbose=true&conceptClass="Data+Element"&limit=' + rowsPerPage + '&page=' + (page + 1) + indicatorQuery;

    let params = {

    }
    console.log(response)
}


function ShowDataInformation(props) {
    return (
        <Fragment>
            <h1>{props.api.title}</h1>
            <p>{props.api.name} </p>
            <p>{props.api.description}</p>
        </Fragment>
    )
}

