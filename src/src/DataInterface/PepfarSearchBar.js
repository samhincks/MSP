import React, { useState } from 'react';
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
        paddingTop: '30px',
        paddingLeft: '15px',
        paddingRight: '15px'
    },
    search: {
        // padding: '6px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        border: '2px solid #D55804',
        /*borderColor: `'#D55804' !important`,
        borderWidth: '2px',*/
        marginTop: '15px'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    searchButton: {
        padding: 10,
    },
}));

export default function PepfarSearchBar() {
    const classes = useStyles();
    const [searchInputText, setSearchInputText] = useState(""); // set the search text which is triggered on text change
    const [{ search }, dispatch] = useStateValue();

    const handleKeyPress = (event) => {
        if (event.keyCode === 13) { // the enter/return key       
            event.preventDefault();
            performSearch();
        }
    };

    const performSearch = event => {
        var searchText = document.getElementById("inputSearch").value;
        // search:  q=*demo, q=*demo*, q=demo*.  Add * to the search string to search any string containing "tx_curr"  
        dispatch({
            type: "setSearch",
            search: "*" + searchText + "*"
        })

        //setPage(0);
        console.log("todo: implement page")
    }


    const handleSearchInputChange = () => {
        setSearchInputText(document.getElementById("inputSearch").value);
    };

    return (
        < Grid container alignItems="center" >
            {< Grid item xs={12} md={7} >
                < Breadcrumb ></Breadcrumb >
            </Grid >}

            <Grid item xs={12} md={5} justifycontent="flex-end" >
                {/* search bar */}
                <Paper component="form" className={classes.search}>
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
            </Grid>
        </Grid >
    )
}