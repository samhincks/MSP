import React, { useState, Fragment, useEffect, useRef } from 'react';
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


//.. Todo deprecate this code, using its essence for local filtering and search
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
/* The MetaDataView is instantiated by the DataInteface and dispatches searchResults
obtained from the Connector (filter and search also can update SearchResults)
When SearchResults change, then new data is passed to CustomTable. If DisplayResults 
contains data, which is the case if the connector's search results have set
a flag for lacking Paging (which could be a domain config level attribute) then
Display Results are sent to the Custom table. Todo: These Display Results may be reused
to create local filtering and search as well as local paging, with a consideration to possible side effects */
export default function MetaDataView() {
    const [{ metadataSet, searchResults, connector, filterValues, limit, pageNum, displayedResults }, dispatch] = useStateValue();

    //.. warning changing this value won't register until next renderhttps://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
    let inLocallyBrowsableResults = useRef(false); //.. should only become true if results return inLocallyBrowsable = true
    const classes = useStyles();

    async function updateSearchResults() {
        if (metadataSet == null) return;

        let params = {
            filterValues: filterValues,
            limit: limit,
            pageNum: pageNum
        }

        if (!inLocallyBrowsableResults.current) {
            const searchResults = await connector.getSearchResults(metadataSet, params);
            //console.log("%c searchResults is ", "color:purple", searchResults)

            dispatch({
                type: 'changeSearchResults',
                searchResults: searchResults
            });

            if (searchResults.lacksPaging) {
                setPageinSearchResults(searchResults);
            }
        }
        else { //. if in locallybrowsable
            setPageinSearchResults(searchResults);
        }
    }

    //.. If the results from aPI lack paging, then this enables browsing locally
    function setPageinSearchResults(results) {
        let start = (pageNum - 1) * limit;
        let end = (pageNum - 1) * limit + limit;
        let slicedResults = results.entries.slice(start, end);
        dispatch({
            type: 'changeDisplayedResults',
            displayedResults: slicedResults
        });
        inLocallyBrowsableResults.current = true;
    }


    // Hook tied to changes in domain, source, and metadataSet
    useEffect(() => {
        updateSearchResults()
    }, [limit, pageNum]);

    useEffect(() => {
        inLocallyBrowsableResults.current = false;
        dispatch({
            type: 'changeSearchResults',
            searchResults: {}
        });
        dispatch({
            type: 'changeDisplayedResults',
            displayedResults: null
        });
        updateSearchResults()
    }, [metadataSet]);


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
                tableData={displayedResults || searchResults.entries} />}

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
            <LinearProgress color="primary" />
        </div>
    );
}


/**
 *
Four types of things that can be viewed
- Viewing list of search results
- Viewing resource details
- Viewing CSV Table
- Viewing JSON Document

 */