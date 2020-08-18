
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Shortcut from '../AppShell/Shortcut';
import { useStateValue } from '../ContextSetup';

const useStyles = makeStyles(theme => ({
    hide: {
        display: 'none'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '30px',
        paddingLeft: '15px',
        paddingRight: '15px'
    },
    formControl: {
        width: '100%'
    },
    fieldset: {
        borderRadius: '25px',
        borderColor: '#f0eee9',
        borderStyle: 'dotted'
    },

    select: {
        //width: '300px',
        '&:before': {
            borderColor: '#D55804',
            borderWidth: '2px'
        },
        '&:after': {
            borderColor: '#D55804',
            borderWidth: '2px'
        }
    },
    selectIcon: {
        fill: '#D55804'
    },
    sidebar: {
        width: '250px',
        margin: '0em',
        marginRight: '2em',
        paddingBottom: '2em'
    },
    inputLabel: {
        paddingBottom: '5em'
    },
    sidebarTitle: {
        textAlign: 'center',
        padding: '1em',
        marginBottom: '0 !important'
    },
    sidebarContainer: {
        paddingTop: 0
    },
    [theme.breakpoints.down('md')]: {
        actionButton: {
            fontSize: '0.7em'
        }
    },
    filter: {
        marginBottom: '1em'
    },
    [theme.breakpoints.down('sm')]: {
        // styles
        filterContainer: {
            display: 'block',
        },
        formControl: {
            width: '100%'
        },
        root: {
            width: '95vw'
        },
        tableContainer: {
            maxWidth: "85vw",
        },
        filter: {
            paddingRight: '0px'
        },
        sidebar: {
            marginRight: 0
        },
        dataElementContent: {
            paddingLeft: '0em',
            paddingTop: '1em'

        },
        tabDashboard: {
            flexDirection: 'column'
        },
        actionButton: {
            width: '90vw',
            fontSize: '1em'
        },
        compareRow: {
            flexDirection: 'column'
        },
        comparisonPanelTitle: {
            margin: 0,
            padding: '30px',
            borderBottom: '2px solid #061233'
        },
        compareTitle: {
            display: 'none'
        },
        gridList: {
            width: 300
        }
    }
}));

/**
 * Generic Filter designed to populate filterValues from 
 * searchResults.attributes which are populated at the discretion of the Connector.
 * They could be defined in attributeConfig.json with the metadataset.
 * Todo: implement the capacity to create local filterValues when searchResults exist
 * but lacks attributes. Possibly, scourge through the data and find the attributes with attributes
 * with a small number of possible values.  
 */
export default function GenericFilter() {
    const classes = useStyles();

    const [{ filterValues, searchResults }, dispatch] = useStateValue();

    // initalize filter values for search result attributes
    // if search results change (but not underlying attributes) then these
    // should not be reinitialized, they should change value
    useEffect(() => {
        let initialValues = {};
        for (let index in searchResults.attributes) {
            let attribute = searchResults.attributes[index];
            initialValues[attribute.key] = "All";
        }

        // if there are searchResults but not filter attributes
        if (Object.keys(initialValues).length === 0 && initialValues.constructor === Object) {
            // console.log("%c no filter values for obj", "color:blue");
            // todo implement local filters 
        }
        dispatch({
            type: "changeFilterValues",
            filterValues: initialValues
        })
    }, []); //.. todo figure out when this needs to be initialized




    return (
        <Grid item xs={12} md={3} >
            <Shortcut ></Shortcut>
            <Paper className={classes.sidebar}>
                <div className={`${classes.container} ${classes.sidebarContainer}`}>
                    <h4 className={classes.sidebarTitle}>Filters</h4>
                    <form autoComplete="off">
                        {searchResults && searchResults.attributes && searchResults.attributes.map(attribute => < FilterItem key={attribute.id} length={searchResults.entries.length} attribute={attribute} />
                        )}
                    </form>
                </div>
            </Paper>
        </Grid >
    )
}


const FilterItem = (props) => {
    let showItem = props.attribute.options;
    const classes = useStyles();
    const [{ filterValues, metadataSet, connector, limit }, dispatch] = useStateValue();

    //.. note this function is copied from MetaDataView
    async function updateSearchResults() {
        console.log("dispatching new search");
        if (metadataSet == null) return;
        let params = {
            filterValues: filterValues,
            limit: limit
        }
        const searchResults = await connector.getSearchResults(metadataSet, params);

        dispatch({
            type: 'changeSearchResults',
            searchResults: searchResults
        });

        dispatch({
            type: 'setPageNum',
            pageNum: 1
        });
    }

    const handleGlobalFilterChange = event => {
        event.persist();

        filterValues[event.target.id] = event.target.value
        dispatch({
            type: "changeFilterValues",
            filterValues: filterValues
        })
        updateSearchResults();
    }
    //console.log("%c attribute", "color:blue", props.attribute);

    // if filterConfig specifies a different access key for search querying
    // and its key in the returned JSON object detail, then id is urlId

    if (showItem) {
        return (
            <Grid item xs={12} key={props.attribute.id} className={classes.filter} >
                <FormControl className={classes.formControl}>
                    <InputLabel className={classes.inputLabel} htmlFor={props.attribute.name}>{props.attribute.name}</InputLabel>
                    <Select
                        native
                        value={filterValues[props.attribute.id]}
                        onChange={handleGlobalFilterChange}
                        className={classes.select}
                        inputProps={{
                            name: props.attribute.name,
                            id: props.attribute.urlId || props.attribute.id,
                            classes: {
                                icon: classes.selectIcon
                            }
                        }}
                    >
                        <option value={'All'}>All</option>
                        {props.attribute.options.map(option => <option key={option} value={option}>{option}</option>)}
                    </Select>
                </FormControl>
            </Grid>
        )
    }
    else {
        return (<div></div>)
    }
}