import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Breadcrumb from '../Components/Breadcrumb';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useStateValue } from '../ContextSetup';


const useStyles = makeStyles(theme => ({
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    search: {
        // padding: '6px 4px',
        maxWidth: '275px',
        border: '2px solid #D55804',

        /*borderColor: `'#D55804' !important`,
        borderWidth: '2px',*/
        marginTop: '50px'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    searchButton: {
        padding: 10,
    },
}));

export default function SearchBar() {
    const classes = useStyles();
    const [searchInputText, setSearchInputText] = useState(""); // set the search text which is triggered on text change
    const [{ search, metadataSet, filterValues, connector, limit }, dispatch] = useStateValue();

    const handleKeyPress = (event) => {
        if (event.keyCode === 13) { // the enter/return key       
            event.preventDefault();
            performSearch(event);
        }
    };

    useEffect(() => {
        setSearchInputText("");
    }, [filterValues]); //.. bug where filter value change state does not propogate out

    async function performSearch() {
        let inputSearch = document.getElementById("inputSearch").value || "";

        if (metadataSet == null) return;
        console.log("%c inputSearch", "color:blue", inputSearch);

        let params = {
            filterValues: filterValues,
            limit: limit,
            inputSearch: inputSearch
        }
        const searchResults = await connector.getSearchResults(metadataSet, params);

        dispatch({
            type: 'changeSearchResults',
            searchResults: searchResults
        });

        dispatch({
            type: "setSearch",
            search: inputSearch
        })

        //setPage(0);
        console.log("todo: implement page")
    }


    const handleSearchInputChange = () => {
        setSearchInputText(document.getElementById("inputSearch").value);
    };

    return (
        <div> <Paper component="form" className={classes.search}>
            <InputBase
                className={classes.input}
                placeholder="Search Data Elements"
                inputProps={{ 'aria-label': 'search data elements' }}
                id="inputSearch"
                key="inputSearch"
                onKeyDown={handleKeyPress}
                onChange={handleSearchInputChange}
                value={searchInputText}
            />

            <IconButton type="button" className={classes.searchButton} aria-label="search" id="searchButton" onClick={performSearch}  >
                <SearchIcon />
            </IconButton>
        </Paper>
        </div>

    )
}