/*
Component sucked out of Codelist.js
Parent object has styles
-Mui-paper root makestyles-=sidebar, mui-paper elevation

In React, it starts with a Paper with a Grid

Data Element Filters
Source, Fiscal Year, Reporting frequecny, reference indicators

Code begins on 1715 with
              <Paper className={classes.sidebar}>

Before that, <Shortcut> does some stuff.. What does it do?
*/

import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Shortcut from '../AppShell/Shortcut';
import { getCodeListMap } from '../currentCodelist.js';
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
        //width: '350px',
        margin: '0em',
        marginRight: '2em',
        paddingBottom: '2em'

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


export default function PepfarFilterPanel() {
    const classes = useStyles();
    const codeListMap = getCodeListMap();
    console.log("%c codelist map", "color:green", codeListMap);
    const [indicatorsTemp, setIndicatorsTemp] = useState([""]);

    const [hiddenDataSet, setHiddenDataSet] = useState(true);
    const type = ["All", "Results", "Target"];

    const [{ filterValues, dataElements }, dispatch] = useStateValue();
    console.log(filterValues);

    //initial filter state
    //.. todo: retire this code since we are now saving filter values with useStateValue
    const [values, setValues] = React.useState({
        fiscal: "All",
        type: "All",
        dataSet: "All",
        source: "MER",
        frequency: "All",
        indicator: "All"
    });

    // when source changes.
    useEffect(() => {
        dispatch({
            type: "setDataElements",
            dataElements: []
        })

        //setCountOfValues(0);
        console.log("todo: figure out setCountOfValues");

        filterValues.fiscal = "All"; //.. this is how the previous code behaves if the change is source not fiscal
        filterValues.type = "All";
        filterValues.dataSet = "All";

        dispatch({
            type: "changeFilterValues",
            filterValues: filterValues
        })

        if (filterValues.source === "PDH") {
            setHiddenDataSet(true)
        }
        else {
            setHiddenDataSet(false)
        }

        if (filterValues.fiscal === "All") {
            filterValues.period = "";
            setHiddenDataSet(true)
        }
        else {
            filterValues.period = "-FY" + (filterValues.fiscal + "").substring(2, 4);
        }
    }, [filterValues.source]);


    //when fiscal changes
    useEffect(() => {
        dispatch({
            type: "setDataElements",
            dataElements: []
        })

        //setCountOfValues(0);
        console.log("todo: figure out setCountOfValues");

        filterValues.dataSet = "All";
        filterValues.type = "All";

        dispatch({
            type: "changeFilterValues",
            filterValues: filterValues
        })

        if (filterValues.fiscal === "All") {
            filterValues.period = "";
            setHiddenDataSet(true)
        }
        else {
            filterValues.period = "-FY" + (filterValues.fiscal + "").substring(2, 4);
            if (filterValues.source === 'PDH') {
                setHiddenDataSet(true)
            }
            else setHiddenDataSet(false)
        }
        console.log(" displaying " + dataElements.length + " results")
    }, [filterValues.fiscal]);




    const handleGlobalFilterChange = event => {
        event.persist();
        filterValues[event.target.name] = event.target.value

        dispatch({
            type: "changeFilterValues",
            filterValues: filterValues
        })

        //setPage(0);
        console.log("to do implement page change, search and setInputSearch, possibly with global variables")
        //setSearchInputText(""); // reset search text
        // setSearch("");
    }

    return (
        <Grid item xs={12} md={3} >
            <Shortcut ></Shortcut>
            <Paper className={classes.sidebar}>
                <div className={`${classes.container} ${classes.sidebarContainer}`}>
                    <h4 className={classes.sidebarTitle}>Data Element Filters</h4>
                    <form autoComplete="off">
                        {/* source filter */}
                        <Grid item xs={12} className={classes.filter} >
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="source">Source</InputLabel>
                                <Select
                                    native
                                    value={filterValues.source}
                                    onChange={handleGlobalFilterChange}
                                    className={classes.select}
                                    inputProps={{
                                        name: 'source',
                                        id: 'source',
                                        classes: {
                                            icon: classes.selectIcon
                                        }
                                    }}

                                >
                                    <option value={'MER'}>All</option> />
                                    <option value={'DATIM'}>DATIM</option>
                                    <option value={'PDH'} >PDH</option>
                                    {/* <option value={'MOH'} disabled>MOH</option> */}
                                </Select>
                            </FormControl>
                        </Grid>


                        {/* fiscal year filter */}
                        <Grid item xs={12} className={classes.filter} >
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="fiscal">Fiscal Year</InputLabel>
                                <Select
                                    native
                                    value={filterValues.fiscal}
                                    onChange={handleGlobalFilterChange}
                                    className={classes.select}
                                    inputProps={{
                                        name: 'fiscal',
                                        id: 'fiscal',
                                        classes: {
                                            icon: classes.selectIcon
                                        }
                                    }}
                                >
                                    {

                                        Object.keys(codeListMap).reverse().map(

                                            key => <option key={Math.random()} >{key}</option>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>


                        <fieldset className={`${classes.fieldset} ${hiddenDataSet ? classes.hide : ''}`}>
                            {/* type filter */}
                            <Grid item xs={12} className={classes.filter}  >
                                <FormControl className={`${classes.formControl} ${hiddenDataSet ? classes.hide : ''}`}>
                                    {/* <FormControl className={classes.formControl}> */}

                                    <InputLabel htmlFor="type">Code List Type</InputLabel>
                                    <Select size="3"
                                        native
                                        value={filterValues.type}
                                        onChange={handleGlobalFilterChange}
                                        className={classes.select}
                                        inputProps={{
                                            name: 'type',
                                            id: 'type',
                                            classes: {
                                                icon: classes.selectIcon
                                            }
                                        }}

                                    >
                                        {(filterValues.fiscal === 'All') ? (<option value={'All'}>All</option>) :
                                            type.map(key => <option key={Math.random()} >{key}</option>)
                                        }

                                        {/* <option value={'SIMS'}>SIMS</option> */}
                                    </Select>
                                </FormControl>
                            </Grid>


                            {/* data set filter */}
                            {/* <Grid item xs={12} className={advanced ? classes.filter : classes.hide}> */}
                            <Grid item xs={12} className={classes.filter}>
                                <FormControl className={`${classes.formControl} ${hiddenDataSet ? classes.hide : ''}`}>
                                    <InputLabel htmlFor="dataSet">Code List</InputLabel>
                                    <Select
                                        //size={Object.filterValues(codeListMap[filterValues.fiscal]).length +""}
                                        native
                                        value={filterValues.dataSet}
                                        onChange={handleGlobalFilterChange}
                                        className={classes.select}
                                        inputProps={{
                                            name: 'dataSet',
                                            id: 'dataSet',
                                            classes: {
                                                icon: classes.selectIcon
                                            },
                                            disabled: filterValues.source === 'PDH'
                                        }}

                                    >
                                        {(filterValues.type === 'All') ? (<option value={'All'}>All</option>) : ([])}
                                        {(filterValues.type === 'All') ? (Object.values(codeListMap[filterValues.fiscal]).map(

                                            key => <option key={Math.random()} >{key}</option>)) : ([])}
                                        {Object.values(codeListMap[filterValues.fiscal]).map(

                                            key => key.includes(filterValues.type) ? (<option key={Math.random()} >{key}</option>) : ([])
                                        )
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </fieldset>


                        <fieldset className={classes.fieldset}>

                            {/* frequency filter */}
                            {/* <Grid item xs={12} className={advanced ? classes.filter : classes.hide} > */}
                            <Grid item xs={12} className={classes.filter} >
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="frequency">Reporting Frequency</InputLabel>
                                    <Select
                                        native
                                        value={filterValues.frequency}
                                        onChange={handleGlobalFilterChange}
                                        className={classes.select}
                                        inputProps={{
                                            name: 'frequency',
                                            id: 'frequency',
                                            classes: {
                                                icon: classes.selectIcon
                                            }
                                        }}

                                    >
                                        <option value={"All"}>All</option>
                                        <option value={'Annually'}>Annually</option>
                                        <option value={'Semi-Annually'}>Semi-Annually</option>
                                        <option value={'Quarterly'}>Quarterly</option>

                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* indicator filter */}
                            <Grid item xs={12} className={classes.filter} >
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="indicator">Reference Indicators</InputLabel>
                                    <Select
                                        native
                                        value={filterValues.indicator}
                                        onChange={handleGlobalFilterChange}
                                        className={classes.select}
                                        inputProps={{
                                            name: 'indicator',
                                            id: 'indicator',
                                            classes: {
                                                icon: classes.selectIcon
                                            }
                                        }}

                                    >
                                        <option value={'All'}>All</option>

                                        {indicatorsTemp.map(key => <option key={Math.random()} value={key.id} >{key.display_name}</option>)
                                        }

                                    </Select>
                                </FormControl>
                            </Grid>
                        </fieldset>
                    </form>
                </div>
            </Paper>
        </Grid >
    )
}
