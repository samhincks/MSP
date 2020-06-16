import React, { useState, Fragment, useEffect } from 'react';
import styled from 'styled-components'
import { useStateValue } from '../ContextSetup';
import Input from '@material-ui/core/Input';
import CustomTable from './components/CustomTable';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '50px',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    title: {
        "text-align": 'center',
        "position": "relative",
        "marginTop": '60px'
    }
}));



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
const SearchResultsContainer = styled.div`
    
`


export default function MetaDataView() {
    const [{ metadataSet, searchResults, connector, filterValues, limit, pageNum }, dispatch] = useStateValue();
    const classes = useStyles();

    async function updateSearchResults() {
        if (metadataSet == null) return;
        console.log("%c running with page", "color:brown", pageNum)
        let params = {
            filterValues: filterValues,
            limit: limit,
            pageNum: pageNum
        }
        dispatch({
            type: 'changeSearchResults',
            searchResults: {}
        });

        const searchResults = await connector.getSearchResults(metadataSet, params);
        //console.log("%c searchResults is ", "color:purple", searchResults)

        dispatch({
            type: 'changeSearchResults',
            searchResults: searchResults
        });
    }

    // Hook tied to changes in domain, source, and metadataSet
    useEffect(() => {
        updateSearchResults()
    }, [metadataSet, limit, pageNum]);


    //.. todo implement serch
    //..let data = filtered ? filtered : connector && connector.jsonData;
    //let data = searchResults;
    return (
        <SearchResultsContainer>
            {/*connector && connector.jsonData &&
                <SearchDataSets></SearchDataSets>*/
            }
            {<h1 className={classes.title}>{metadataSet && (metadataSet.id || metadataSet.name)}</h1>}
            {!searchResults.names && <LinearIndeterminate />}
            {searchResults && searchResults.names && searchResults.names.length > 0 && <CustomTable
                tableHeaderColor="warning"
                tableHead={searchResults.names}
                tableData={searchResults.entries} />}

            {/*<DataSetsGrid>
                {searchResults.entries && searchResults.entries.map(resource =>
                    <MinimalDataSetView key={resource.id} resource={resource} />
                )}
                </DataSetsGrid>*/}
            <PageContainer></PageContainer>

        </SearchResultsContainer>
    )
}

const PageContainer = (props) => {
    const [{ searchResults, connector, filterValues, pageNum, limit }, dispatch] = useStateValue();
    let [rowsPerPage, setRowsPerPage] = useState(limit);
    const [page, setPage] = useState(pageNum - 1);
    let totalEntries = 0;

    if (searchResults && searchResults.totalEntries)
        totalEntries = searchResults.totalEntries;

    let [count, setCountOfValues] = useState(totalEntries);

    // When API call done elsewhere it resets the data models point of
    // truth for what page we're on, this hook changes the GUI
    useEffect(() => {
        setPage(pageNum - 1);
        //console.log("%c setting pagenum", "color:turquoise", pageNum)
    }, [pageNum]);

    useEffect(() => {
        totalEntries = 0;

        if (searchResults && searchResults.totalEntries)
            totalEntries = searchResults.totalEntries;

        setCountOfValues(totalEntries);
    }, [searchResults]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch({
            type: "setPageNum",
            pageNum: newPage + 1 // zero indexed in gui and 1 indexed in API
        })
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        //.. note we will need to figure out a way to reset page to 0 when filter is registered
        dispatch({
            type: "setLimit",
            limit: event.target.value
        })
        dispatch({
            type: "setPageNum",
            pageNum: 1
        })
        setPage(0);
    };

    return (
        <table>
            <tbody>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[15, 25, 50, 100]}
                        labelDisplayedRows={({ from, to, count }) => `Displaying rows ${from}-${to} of ${count}`}
                        // page={0}
                        // rowsPerPage={10}
                        // count={100}
                        // onChangePage={() => {}}
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableRow>
            </tbody>
        </table>)
}


export function LinearIndeterminate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <LinearProgress />
            <LinearProgress color="secondary" />
        </div>
    );
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
    const [{ connector }, dispatch] = useStateValue();
    // Function should make the details section appear by use of the selected data element global variable.
    // It should call the connector which returns the selected Data Element. Then it should dispatch 
    // a selection to selected data lement with the details 
    async function handleDataViewClick() {
        const details = await connector.getDetails();
    }

    return (
        <MinimalDatasetContainer
            onClick={handleDataViewClick}
        >
            <p>{props.resource.title}</p>
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