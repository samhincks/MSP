import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components'
import { useStateValue } from '../ContextSetup';
import Input from '@material-ui/core/Input';


const DataSetsGrid = styled.div`
    /* display: 'grid';
    gap: '1rem';
    grid-template-columns: 'repeat(auto-fill, minmax(240px, 1fr))'; */
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 50px;
`

const SearchDataSets = () => {
    const [{ connector }, dispatch] = useStateValue();

    const updateDataSets = (e) => {
        let search = e.target.value
        const filtered = connector.jsonData.filter(dataset => dataset.display_name.toLowerCase().includes(search.toLowerCase()))
        console.log("the filtered is", filtered)
        dispatch({
            type: 'setFilteredData',
            filtered: filtered
        })
    }

    return (
        <Input onChange={(e) => updateDataSets(e)} />
    )
}


export default function MetaDataView() {
    const [{ metadataSet, searchResults, connector, filtered }, dispatch] = useStateValue();

    // Hook tied to changes in domain, source, and metadataSet
    useEffect(() => {
        async function updateSearchResults() {
            if (metadataSet == null) return;
            const searchResults = await connector.getSearchResults(metadataSet);

            dispatch({
                type: 'changeSearchResults',
                searchResults: searchResults
            })
        }

        updateSearchResults()
    }, [metadataSet]);

    //.. todo implement serch
    //..let data = filtered ? filtered : connector && connector.jsonData;
    //let data = searchResults;

    return (
        <Fragment>

            {/*connector && connector.jsonData &&
                <SearchDataSets></SearchDataSets>*/
            }

            <DataSetsGrid>
                {searchResults && searchResults.map(resource =>
                    <MinimalDataSetView key={resource.id} resource={resource} />
                )}
            </DataSetsGrid>

        </Fragment>
    )
}

const DataSetContainer = styled.div`
    min-width: 100px;
    min-height: 100px;
    border-radius: 5%;
    background-color: lightblue;
    margin: 2%;
    padding: 5%;
`

const MinimalDatasetContainer = styled.div`
    width: 100%;
    border-radius: 3%;
    background-color: lightblue;
    margin: 1%;
    padding: 1%;
`

const DataSetView = (props) => {
    return (
        <DataSetContainer>
            <h2>{props.dataset.getTitle()}</h2>
            {props.dataset && props.dataset.descriptions && props.dataset.descriptions[0] && <p>{props.dataset.descriptions[0].description}</p>}
        </DataSetContainer>
    )
}

const MinimalDataSetView = (props) => {
    return (
        <MinimalDatasetContainer>
            <p>{props.resource.getTitle()}</p>
        </MinimalDatasetContainer>
    )
}


// Information about datasets

// Title

// Description

// Image

// Link

/**
 *
Four types of things that can be viewed
- Viewing list of search results
- Viewing resource details
- Viewing CSV Table
- Viewing JSON Document

 */