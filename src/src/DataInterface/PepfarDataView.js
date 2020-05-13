import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import { useStateValue } from '../ContextSetup';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { getConfig } from '../config.js';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import TreeView from '@material-ui/lab/TreeView';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import GetAppIcon from '@material-ui/icons/GetApp';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import styled from 'styled-components';
import TablePagination from '@material-ui/core/TablePagination';


import { Route, NavLink, useLocation, useHistory } from 'react-router-dom';

import { getCodeListMap, getCodeList } from '../currentCodelist.js'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    popOver: {
        padding: '20px',
        minWidth: '200px'
    },
    cssFocused: {},
    expansionPanelSummary: {
        borderBottom: '1px solid #C1A783',
        color: '#000000',
    },
    expansionPanelDetails: {
        paddingTop: '30px',
        flexDirection: 'column',
        color: '#000000'
    },
    comboTable: {
        boxShadow: 'none',
        border: 'none',
        maxWidth: '100%',
    },
    expansionPanelLeft: {
        paddingBottom: '30px'
    },
    chip: {
        marginRight: '5px'
    },
    downloadButton: {
        marginRight: '20px',
        marginTop: '10px',
        '&:hover, &:focus': {
            backgroundColor: '#C1A783',
            color: '#000000'
        }
    },
    formLegend: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '1.2em',
        marginBottom: '10px'
    },
    dataElementContent: {
        paddingLeft: '1em',
        paddingBottom: '50px'
    },
    errorMessage: {
        textAlign: 'center',
        color: '#FF0000',
        marginBottom: '0 !important'
    },
    closeComparePanel: {
        float: 'right',
        margin: '1em',
        cursor: 'pointer',
        padding: '10px',
        border: '1px solid #111111',
        borderRadius: '50%',
        marginTop: 0
    },
    actionButton: {
        marginLeft: '20px',
        marginTop: '10px',
        marginBottom: '20px',
        '&:hover, &:focus': {
            backgroundColor: '#C1A783',
            color: '#000000'
        }
    },
    detailsButton: {
        marginTop: '10px',
        marginBottom: '20px',
        '&:hover, &:focus': {
            backgroundColor: '#C1A783',
            color: '#000000'
        }
    },
    dataElementContainer: {
    },
    tabDashboard: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },
    derivatives: {
        maxHeight: 600,
        flexGrow: 1,
        width: 1000,
    },
    [theme.breakpoints.down('md')]: {
        actionButton: {
            fontSize: '0.7em'
        }
    },
    filter: {
        marginBottom: '1em'
    },
    formulaButton: {
        marginTop: '1em',
        backgroundColor: '#eeeeee',
        border: 0
    },
    tabContainer: {
        borderBottom: '1px solid #C1A783',
        width: '100%'
    },
    bigIndicator: {
        backgroundColor: '#C1A783'
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
        heading: {
            wordBreak: 'break-all'
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


const ActionButtonLabel = styled.p`
    margin:0;
    padding:0;
    font-size: 0.9em;  
    font-weight: bold;
`;


//tab panel function
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const domain = getConfig().domain;
const org = getConfig().org;
const version = getConfig().source;
const codeListMap = getCodeListMap();
const codeListJson = getCodeList();


const sortJSONByKey = function (data, key, direction) {
    return data.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        if (direction === 'asc') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (direction === 'desc') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
        return true;
    });
}

const sortJSON = function (data, direction) {
    return data.sort(function (x, y) {
        if (direction === 'asc') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (direction === 'desc') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
        return true;
    });
}

let deMappings = {};
let de = {}
let selectDataTemp = {};
let derivedCoC = {}
let pdhDerivatives = {}

export default function PepfarDataView() {
    const classes = useStyles();
    const [{ filterValues, dataElements, search, selectedDataElement, detailPanel, dataElementDetail }, dispatch] = useStateValue();

    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [comparePanel, setComparePanel] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const [error, setError] = useState(null);
    const [errorDisplay, setErrorDisplay] = useState(null);
    //setup the comparison panel
    const [selectedDatim, setSelectedDatim] = React.useState([]);


    const [dropDownName, setDropDownName] = React.useState("");
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogMessage, setDialogMessage] = React.useState('');
    //const [selectedDataElement, setSelectedDataElement] = React.useState([]);
    //    const [dataElementDetail, setDataElementDetail] = React.useState(null);
    const [collection, setCollection] = useState("");
    const [deloading, setDELoading] = useState(false);
    //const [dataElements, setDataElementsData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    var [count, setCountOfValues] = useState(0);
    const params = new URLSearchParams(useLocation().search)
    const [indicators, setIndicators] = useState([""]);
    const [indicatorsTemp, setIndicatorsTemp] = useState([""]);
    const [indicatorQuery, setIndicatorQuery] = useState("")

    //compare dropdown menu
    const [compare, setCompare] = React.useState({
        DATIM: true,
        PDH: false,
        MOH: false,
    });

    /* const [detailPanel, setDetailPanel] = React.useState({
         top: false,
         left: false,
         bottom: false,
         right: false,
     });*/


    let queryDataElementsAllPeriodsMER = 'https://api.' + domain + '/orgs/' + org + '/sources/MER' + version + '/concepts/?verbose=true&conceptClass="Data+Element"&limit=' + rowsPerPage + '&page=' + (page + 1) + indicatorQuery;
    let queryDataElementsAllPeriods = 'https://api.' + domain + '/orgs/' + org + '/collections/' + filterValues.source + '/concepts/?verbose=true&conceptClass="Data+Element"&limit=' + rowsPerPage + '&page=' + (page + 1) + indicatorQuery;
    let queryDataElementsByPeriod = 'https://api.' + domain + '/orgs/' + org + '/collections/' + filterValues.source + filterValues.period + '/concepts/?verbose=true&conceptClass="Data+Element"&limit=' + rowsPerPage + '&page=' + (page + 1) + indicatorQuery;
    const queryIndicators = 'https://api.' + domain + '/orgs/' + org + '/sources/MER' + version + '/concepts/?verbose=true&conceptClass="Reference+Indicator"&limit=0';
    let queryByCodeList = 'https://api.' + domain + '/orgs/' + org + '/collections/' + collection + '/concepts/?conceptClass="Data+Element"&verbose=true&limit=' + rowsPerPage + '&page=' + (page + 1) + indicatorQuery;



    //.. if the search global variable changes, then update query strings (which in turn are hooked to API calls)
    useEffect(() => {
        if (search && search !== "") {
            queryDataElementsAllPeriodsMER = queryDataElementsAllPeriodsMER + "&q=" + search;
            queryDataElementsAllPeriods = queryDataElementsAllPeriods + "&q=" + search;
            queryDataElementsByPeriod = queryDataElementsByPeriod + "&q=" + search;
            queryByCodeList = queryByCodeList + "&q=" + search;
        }
        loadDataElementsByPeriod();
    }, [search]);

    /*
    Now it seems like all the loading code is re-run when the search query changes in codelist
    Can we isolate just the bits that need to be rerun when our search query has changed externally?
    search isn't a state of the whole component anymore, we don't run through and reinitialize
    the queries again.

    I'd recommend trying to understand exactly why the bookmarked effect below which is linked to
    query changes doesn't run when the global variable changes. If it doesn't work, consider
    adding search here, but we are gaining a deep understanding by doing this.
    */


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const loadDataElementsByPeriod = async () => {
        setDELoading(true)
        if (filterValues.type === "All") {
            //setDataElementsData([]);
            //setCountOfValues(0);
            try {
                let response = [];
                let queryToRun = ""
                if (filterValues.fiscal === 'All') {
                    if (filterValues.source === 'MER') {
                        queryToRun = queryDataElementsAllPeriodsMER
                    } else {
                        queryToRun = queryDataElementsAllPeriods
                    }
                    console.log(" queryDataElementsAllPeriods " + queryToRun)
                }
                else {
                    queryToRun = queryDataElementsByPeriod
                    console.log(" queryDataElementsByPeriod " + queryToRun)
                }
                response = await fetch(queryToRun);
                if (!response.ok) {
                    console.log(response);
                    dispatch({
                        type: "setDataElements",
                        dataElements: []
                    })

                    setCountOfValues(0);
                    setErrorDisplay("Failed to fetch");
                    setDELoading(false)
                    throw new Error(
                        `Error when retrieving data elements: ${response.status} ${response.statusText}`
                    );
                }
                const jsonData = await response.json();
                if (!jsonData.length || jsonData.length === 0) {
                    console.log("jsonData is empty");
                    dispatch({
                        type: "setDataElements",
                        dataElements: []
                    })

                    setCountOfValues(0);
                    setDELoading(false)
                    throw new Error(
                        `There is no data for this selection. `
                    );
                }
                setDELoading(false)
                setErrorDisplay(null);
                var sortedData = sortJSONByKey(jsonData, 'display_name', 'asc');

                //filter by default filters
                const temp = [];
                dispatch({
                    type: "setDataElements",
                    dataElements: sortedData
                })

                setCountOfValues(parseInt(response.headers.get('num_found')));
                console.log(jsonData.length + " dataElements.length ")
                console.log(response.headers.get('num_found') + " results found ")
                console.log(response.headers.get('num_returned') + " results returned ")
            } catch (e) {
                setDELoading(false)
                console.log("error:" + e.message);
                setError(e.message);
                setErrorDisplay(e.message);
            }
        }
    }

    useEffect(() => {
        async function loadData() {
            if (params.get('dataElementid')) {
                await getMappings(params.get('dataElementid'))
                //setDataElementDetail(de[params.get('dataElementid')]);
                dispatch({
                    type: "setDataElementDetail",
                    dataElementDetail: de[params.get('dataElementid')]
                })
                //setDetailPanel({ ...detailPanel, bottom: true });
                dispatch({
                    type: "setDetailPanel",
                    detailPanel: { ...detailPanel, bottom: true }
                })
            }
        }
        loadData();
        //toggleDetailDrawer(de[params.get('dataElementid')], 'bottom', true)
    }, []);

    useEffect(() => {
        console.log("about to run loadDataElements");
        loadDataElementsByPeriod();
    }, [queryDataElementsByPeriod, queryDataElementsAllPeriods, queryDataElementsAllPeriodsMER]);

    const loadDataElementsData = async () => {
        if (collection !== "" && filterValues.dataSet !== "All") {
            console.log(" queryByCodeList " + queryByCodeList)
            //setDataElementsData([]);
            //setCountOfValues(0);
            setDELoading(true)
            try {
                const response = await fetch(queryByCodeList);
                if (!response.ok) {
                    console.log(response);
                    dispatch({
                        type: "setDataElements",
                        dataElements: []
                    })
                    setCountOfValues(0);
                    setDELoading(false)
                    setErrorDisplay("Failed to fetch")
                    throw new Error(
                        `Error when retrieving data elements ${response.status} ${response.statusText}`
                    );
                }
                const jsonData = await response.json();
                if (!jsonData.length || jsonData.length === 0) {
                    console.log("jsonData is empty");
                    dispatch({
                        type: "setDataElements",
                        dataElements: []
                    })
                    setCountOfValues(0);
                    setDELoading(false)
                    throw new Error(
                        `There is no data for this selection.  `
                    );
                }
                setErrorDisplay(null);
                setDELoading(false)
                var sortedData = sortJSONByKey(jsonData, 'display_name', 'asc');
                dispatch({
                    type: "setDataElements",
                    dataElements: sortedData
                })
                setCountOfValues(parseInt(response.headers.get('num_found')));
                console.log(dataElements.length + " results returned ")
                console.log(response.headers.get('num_found') + " results found ")

            } catch (e) {
                setDELoading(false)
                console.log("error:" + e.message);
                setError(e.message);
                setErrorDisplay(e.message);
            }
        }
    }
    useEffect(() => {
        loadDataElementsData();
    }, [queryByCodeList]);

    const loadIndicatorsData = async () => {
        console.log("loadIndicatorsData - queryIndicators : " + queryIndicators);
        try {
            const response = await fetch(queryIndicators);
            if (!response.ok) {
                console.log(response);
                throw new Error(
                    `Error when retrieving indicators: ${response.status} ${response.statusText}`
                );
            }
            const jsonData = await response.json();
            if (!jsonData.length || jsonData.length === 0) {
                console.log("jsonData is empty");
                throw new Error(
                    `There is no data for this selection. `
                );
            }

            console.log("indicators: " + jsonData.length);
            var sortedData = sortJSON(jsonData, 'display_name', 'asc');
            setIndicators(sortedData);
            setIndicatorsTemp(sortedData)
        } catch (e) {
            console.log("error:" + e.message);
            setError(e.message);
        }
    }

    useEffect(() => {
        loadIndicatorsData();
    }, [queryIndicators]);


    const clearSelectedDataElements = event => {
        dispatch({
            type: "setSelectedDataElement",
            selectedDataElement: []
        })
        selectDataTemp = {}
    }
    const popOpen = Boolean(anchorEl);
    const popId = popOpen ? 'popover' : undefined;
    const popHandleClose = () => {
        setAnchorEl(null);
    };

    const { DATIM, PDH, MOH } = compare;

    const handleCompareChange = name => event => {
        setCompare({ ...compare, [name]: event.target.checked });
    };


    //implement comparison checkbox
    const handleCompareCheckbox = dataElement => event => {
        event.stopPropagation();

        //remove the element from the selected data element when unclick
        if (selectedDataElement.includes(dataElement.id)) {
            const newSelectedDataElement = selectedDataElement.filter(data => {
                return data !== dataElement.id;
            });
            dispatch({
                type: "setSelectedDataElement",
                selectedDataElement: newSelectedDataElement
            })

            if (Object.keys(selectDataTemp).includes(dataElement.id)) {
                delete selectDataTemp[dataElement.id]
            }
        } else {
            //add the element from the selected data element when click
            !deMappings[dataElement.id] ? getMappings(dataElement.id) : '';
            const newSelectedDataElement = [...selectedDataElement, dataElement.id];

            dispatch({
                type: "setSelectedDataElement",
                selectedDataElement: newSelectedDataElement
            })
            selectDataTemp[dataElement.id] = dataElement
        }
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };


    const toggleDetailDrawer = (dataElement, side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        //setDataElementDetail(dataElement);
        dispatch({
            type: "setDataElementDetail",
            dataElementDetail: dataElement
        })
        dispatch({
            type: "setDetailPanel",
            detailPanel: { ...detailPanel, [side]: open }
        })
        //setDetailPanel({ ...detailPanel, [side]: open });
    };

    const copyToClipboard = str => {
        console.log("copied text" + str)
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        //handleTooltipOpen()
    };


    const styles = theme => ({
        root: {
            margin: 0,
            padding: theme.spacing(4),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

    const DialogTitle = withStyles(styles)(props => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    const DialogContent = withStyles(theme => ({
        root: {
            padding: theme.spacing(4),
        },
    }))(MuiDialogContent);

    const DialogActions = withStyles(theme => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
    }))(MuiDialogActions);


    //when open the drawer
    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        if (open) {
            if (selectedDataElement.length > 3) {
                setDialogOpen(true);
                setDialogMessage("You cannot compare more than 3 data elements at a time")
            }
            else if (selectedDataElement.length < 2) {
                setDialogOpen(true);
                setDialogMessage("Please select 2-3 data elements")
            }

            else {
                setCompare({ ...comparePanel, [DATIM]: true });
                setComparePanel({ ...comparePanel, [side]: open });

                //const selectDataTemp = [];

                //get data element details of the selected data elements

                // eslint-disable-next-line array-callback-return
                console.log("toggleDrawer dataElements")
                console.log(selectedDataElement)
                let temp = []
                Object.values(selectDataTemp).map(value => {
                    temp.push(value)
                }
                )
                setSelectedDatim(temp);

            }
        }
        else {
            setComparePanel({ ...comparePanel, [side]: open });
        }
    };


    function getDownloadLabel() {
        let downloadLabel = "Download";
        if (filterValues.dataSet === "All") {
            if (selectedDataElement.length > 0) {
                downloadLabel = "Download Selected Data Elements";
            }
        } else if (filterValues.dataSet !== "" && filterValues.dataSet !== "All") {
            if (selectedDataElement.length > 0) {
                downloadLabel = "Download Selected Data Elements";
            } else {
                downloadLabel = "Download Full Code List";
            }
        }
        return downloadLabel;
    }

    //set dropdown popup
    const dropDownMenu = buttonName => event => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setDropDownName(buttonName);
    };

    const [downloadValue, setDownloadValue] = React.useState('HTML');
    const handleDownloadChange = event => {
        setDownloadValue(event.target.value);
    };


    async function getMappings(id) {
        //setExpanded(true);
        let queryMapping = 'https://api.' + domain + '/orgs/' + org + '/sources/MER' + version + '/concepts/' + id + '/?includeMappings=true&includeInverseMappings=true';
        console.log(" queryByDataElement " + queryMapping)

        try {
            let response = await fetch(queryMapping);
            if (!response.ok) {
                console.log(response);
                setErrorDisplay("Failed to fetch")
                throw new Error(
                    `Error when retrieving data element mappings ${response.status} ${response.statusText}`
                );
            }

            let jsonData = await response.json();
            let sortedData = sortJSONByKey(jsonData.mappings, 'to_concept_name', 'asc');
            if (!deMappings[id]) {
                deMappings[id] = sortedData;
            }
            if (!de[id]) {
                de[id] = jsonData
            }
            // if the data element has linkages, retrieve those as well
            Object.keys(Object(deMappings[id])).map(

                async function (key) {
                    if (Object(deMappings[id])[key].map_type === 'Derived From') {
                        let derivationId = Object(deMappings[id])[key].to_concept_code
                        if (derivationId === id) {
                            let from_concept_url = Object(deMappings[id])[key].from_concept_url
                            if (from_concept_url.endsWith('/')) {
                                from_concept_url = from_concept_url.substring(0, from_concept_url.length - 1)
                            }
                            let arr = from_concept_url.split('/')
                            derivationId = arr[arr.length - 1]
                        }
                        if (!deMappings[derivationId]) {
                            queryMapping = 'https://api.' + domain + '/orgs/' + org + '/sources/MER' + version + '/concepts/' + derivationId + '/?includeMappings=true&includeInverseMappings=true';
                            response = await fetch(queryMapping);
                            if (!response.ok) {
                                console.log(response);
                                setErrorDisplay("Failed to fetch")
                                throw new Error(
                                    `Error when retrieving data element mappings ${response.status} ${response.statusText}`
                                );
                            }
                            jsonData = await response.json()
                            sortedData = sortJSONByKey(jsonData.mappings, 'to_concept_name', 'asc');
                            deMappings[derivationId] = sortedData
                            if (!de[derivationId]) {
                                de[derivationId] = jsonData
                            }
                        }
                    }
                }
            )
        } catch (e) {
            console.log("error:" + e.message);
            setError(e.message);
            //setErrorDisplay(e.message);
        }
    };


    const performDownload = event => {
        const baseDownloadURL = "https://test.ohie.datim.org:5000/show-msp";
        let downloadURL = "";
        if (selectedDataElement.length > 0) {
            downloadURL = baseDownloadURL + "?dataElements=" + selectedDataElement.toString().trim() + "&format=" + downloadValue.trim();
        } else if (filterValues.dataSet !== "All") {
            downloadURL = baseDownloadURL + "?collection=" + collection + "&format=" + downloadValue.trim();
        }
        let downloadLink = document.createElement('a');
        downloadLink.href = downloadURL;
        if (downloadValue.trim() !== "CSV") {
            downloadLink.setAttribute("target", "_blank");
        }
        downloadLink.setAttribute('download', "download");
        downloadLink.click();
        revokeDownloadLink(downloadLink.href);
    }

    function revokeDownloadLink(href) {
        setTimeout(function () {
            window.URL.revokeObjectURL(href);
        }, 10000);
    }

    //set initial panel state and panel handle change function
    const [panel, setPanel] = React.useState(0);
    const handleChange = (event, newPanel) => {
        setPanel(newPanel);
    };

    const [checked, setChecked] = React.useState(false);
    const [format, setFormat] = React.useState('Names');

    const toggleChecked = () => {
        setChecked(prev => !prev);
        if (!checked) {
            setFormat('UIDs')
        }
        else {
            setFormat('Names')
        }
    };


    function populatePDHDerivatives(source_data_elements) {
        source_data_elements.map(source_data_element => {
            if (!pdhDerivatives[source_data_element.source_data_element_name]) {
                let source_data_element_nameArray = [];
                source_data_element_nameArray.push(source_data_element.source_category_option_combo_name + source_data_element.add_or_subtract);
                pdhDerivatives[source_data_element.source_data_element_name] = source_data_element_nameArray;
            }
            else {
                let source_data_element_nameArray = Array.from(pdhDerivatives[source_data_element.source_data_element_name]);
                source_data_element_nameArray.push(source_data_element.source_category_option_combo_name + source_data_element.add_or_subtract);
                pdhDerivatives[source_data_element.source_data_element_name] = source_data_element_nameArray;
            }
        })
    }

    const expandAll = (array) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setExpanded(array)
    }

    const collapseAll = (array) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setExpanded([])
    }


    /* 
    ------------------------------------------------------
    Note these are what appears when the expanded filter panel shows up.
    They belong in the PepfarFilterPanel. But the DataSet hook uses dataloading
    which happens in the data view. In a generic DataView, loading should happen
    in a connector, resulting in a change in the DataElements global variable
    */
    //when data set changes
    useEffect(() => {
        dispatch({
            type: "setDataElements",
            dataElements: []
        })
        setCountOfValues(0)

        if (filterValues.dataSet === "All") {
            loadDataElementsByPeriod()
        }
        else {
            codeListJson.codeList.map(cl => {
                if (filterValues.dataSet === cl.full_name) {
                    console.log(" dataset changed ")
                    setCollection(cl.id)
                }
            })
            console.log(" displaying " + dataElements.length + " results")
        }
    }, [filterValues.dataSet]);

    useEffect(() => {
        dispatch({
            type: "setDataElements",
            dataElements: []
        })
        setCountOfValues(0)

        if (filterValues.type === "All") {
            filterValues.dataSet = "All";
        }
        else {
            let element = document.getElementById("dataSet");
            let dataType = element.options[element.selectedIndex].text;
            filterValues.dataSet = dataType;
        }

        dispatch({
            type: "changeFilterValues",
            filterValues: filterValues
        })

    }, [filterValues.type]);

    /**
     * ------------------------------------------------------
     */


    //Error handling
    class ErrorBoundary extends React.Component {
        constructor(props) {
            super(props);
            this.state = { error: null, errorInfo: null };
        }

        componentDidCatch(error, errorInfo) {
            // Catch errors in any components below and re-render with error message
            this.setState({
                error: error,
                errorInfo: errorInfo
            })
            // You can also log error messages to an error reporting service here
        }

        render() {
            if (this.state.errorInfo) {
                // Error path
                return (
                    <Dialog onClose={handleDialogClose} aria-labelledby="customized-dialog-title" open={dialogOpen}>
                        <DialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                        </DialogTitle>
                        <DialogContent >
                            <Typography gutterBottom>
                                {dialogMessage}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleDialogClose} color="primary">
                                OK </Button>
                        </DialogActions>
                    </Dialog>
                );
            }
            // Normally, just render children
            return this.props.children;
        }
    }


    return (
        <Grid item xs={12} md={9} className={classes.dataElementContent}>

            {/* dashboard, including download, compare, select all buttons */}
            <div className={classes.tabDashboard}>
                <div>
                    {selectedDataElement && selectedDataElement.length > 0 ?
                        <Button variant="outlined" className={classes.actionButton} onClick={clearSelectedDataElements} id="clearDataElementButton">
                            <ActionButtonLabel> Clear Selection   <span style={{ background: '#D3D3D3', marginLeft: '2px', paddingLeft: '5px', paddingRight: '5px', borderRadius: '5px' }}> {selectedDataElement.length}</span></ActionButtonLabel></Button>
                        : null}
                    <Button variant="outlined" className={classes.actionButton} onClick={dropDownMenu("download")} id="downloadButton" disabled={selectedDataElement.length === 0 && filterValues.dataSet === "All" ? true : false}>
                        <ActionButtonLabel> {getDownloadLabel()}</ActionButtonLabel>
                        {
                            selectedDataElement.length === 0 && filterValues.dataSet === "All" ?
                                <GetAppIcon /> : <GetAppIcon style={{ color: '#1D5893' }} />
                        }
                    </Button>

                    <Button variant="outlined" className={classes.actionButton}
                        onClick={toggleDrawer('bottom', true)}
                        id="comparisonButton">
                        <ActionButtonLabel>Compare selected data elements</ActionButtonLabel>
                        <CompareArrowsIcon style={{ color: '#1D5893', marginLeft: '2px' }} />
                    </Button>
                    {/* </NavLink> */}
                </div>

                <div>
                    <Dialog onClose={handleDialogClose} aria-labelledby="customized-dialog-title" open={dialogOpen}>
                        <DialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                        </DialogTitle>
                        <DialogContent >
                            <Typography gutterBottom>
                                {dialogMessage}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleDialogClose} color="primary">
                                OK </Button>
                        </DialogActions>
                    </Dialog>
                </div>



                {/* popover panel */}
                <Popover
                    id={popId}
                    open={popOpen}
                    anchorEl={anchorEl}
                    onClose={popHandleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}

                >
                    {/* download popover panel */}
                    {
                        dropDownName === "download" ?
                            <FormControl component="fieldset" className={classes.popOver}>
                                <FormGroup>
                                    <FormLabel component="legend" className={classes.formLegend}>Data Format</FormLabel>
                                    <RadioGroup aria-label="download" name="downloadRadio" value={downloadValue} onChange={handleDownloadChange}>
                                        <FormControlLabel control={<Radio style={{ color: '#D55804' }} value="HTML" />} label="HTML" />
                                        <FormControlLabel control={<Radio style={{ color: '#D55804' }} value="CSV" />} label="CSV" />
                                        <FormControlLabel control={<Radio style={{ color: '#D55804' }} value="JSON" />} label="JSON" />
                                        <FormControlLabel control={<Radio style={{ color: '#D55804' }} value="XML" />} label="XML" />
                                    </RadioGroup>
                                    <Button type="submit" variant="outlined" className={classes.downloadButton} onClick={performDownload}>
                                        Download DATA</Button>
                                </FormGroup>
                            </FormControl> :

                            //  compare popover panel
                            <FormControl component="fieldset" className={classes.popOver}>

                                <FormGroup>

                                    <FormLabel component="legend" className={classes.formLegend}>Data Sources</FormLabel>
                                    <FormControlLabel
                                        control={<Checkbox checked={DATIM} style={{ color: '#D55804' }} onChange={handleCompareChange('DATIM')} value="DATIM" />}
                                        label="DATIM" disabled
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={PDH} style={{ color: '#D55804' }} onChange={handleCompareChange('PDH')} value="PDH" />}
                                        label="PDH"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={MOH} style={{ color: '#D55804' }} onChange={handleCompareChange('MOH')} value="MOH" />
                                        }
                                        label="MOH"
                                    />
                                    <Button type="submit" variant="outlined" className={classes.downloadButton} onClick={toggleDrawer('bottom', true)} >
                                        COMPARE SOURCES </Button>
                                </FormGroup>
                            </FormControl>
                    }
                </Popover>

            </div>
            {/* Loading */}
            {deloading ?
                <div>
                    <LinearProgress mode="indeterminate" />
                    <div style={{ paddingTop: '1rem', paddingLeft: '1rem' }}>Loading data elements ...</div>
                </div> : ([])
            }
            {/* data elements */}
            {/* {dataElements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(dataElement => ( */}
            {/* {/* <ErrorBoundary> */}
            {dataElements.map(dataElement => (
                <div key={dataElement.id}>

                    <ExpansionPanel className={classes.dataelementContainer}
                        TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
                        onClick={() => !deMappings[dataElement.id] ?
                            getMappings(dataElement.id) : ''}

                    >
                        {/* data elements summary */}
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.expansionPanelSummary}
                            style={{ backgroundColor: selectedDataElement.includes(dataElement.id) ? '#f2dee5' : 'white' }}
                        >
                            <ErrorBoundary >
                                <FormControlLabel
                                    aria-label="Acknowledge"
                                    onClick={handleCompareCheckbox(dataElement)}
                                    onFocus={event => event.stopPropagation()}
                                    control={<Checkbox />}
                                    checked={selectedDataElement.includes(dataElement.id) ? true : false}

                                // label="I acknowledge that I should stop the click event propagation"
                                />
                                <Grid container alignItems="center"
                                    spacing={1}>
                                    <Grid item xs={9}  >
                                        <Typography className={classes.heading}>
                                            <strong>{dataElement.display_name}</strong>
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={3}>

                                    </Grid>

                                    <Grid item xs={2} >
                                        <Tooltip disableFocusListener title="Click to copy UID">
                                            <Chip
                                                variant="outlined"
                                                size="small"
                                                style={{ color: '#4e4f4f', marginTop: '10px' }}
                                                label={"UID: " + dataElement.id}
                                                onClick={() => copyToClipboard(dataElement.id)}
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={2} >
                                        <Chip
                                            variant="outlined"
                                            size="small"
                                            style={{ marginLeft: '25px', backgroundColor: '#d8ebe0', color: '#4e4f4f', marginTop: '10px' }}
                                            label={"Source: " + dataElement.extras.source}
                                            clickable
                                        /></Grid>
                                    <Grid item xs={2} >
                                        <Chip
                                            variant="outlined"
                                            size="small"
                                            style={{ marginLeft: '25px', backgroundColor: '#c0b3c7', color: '#4e4f4f', marginTop: '10px' }}
                                            label={"Type: " + dataElement.concept_class}
                                            clickable
                                        /></Grid>
                                    <Grid item xs={3} ></Grid>
                                </Grid>
                            </ErrorBoundary>
                        </ExpansionPanelSummary>



                        {/* data elements details */}
                        <ExpansionPanelDetails
                            className={classes.expansionPanelDetails}

                        >
                            <Grid container>
                                <Grid item xs={12} className={classes.expansionPanelLeft}>
                                </Grid>

                                <Grid item xs={12} className={classes.expansionPanelLeft}>
                                    <strong>Description: </strong> {(dataElement.descriptions) ? dataElement.descriptions[0].description : "N/A"}
                                </Grid>

                                <Grid item xs={12} className={classes.expansionPanelLeft}>
                                    {/* <ExpansionPanelActions> */}
                                    <Button variant="outlined" className={classes.detailsButton} onClick={toggleDetailDrawer(dataElement, 'bottom', true)} color="primary">
                                        View Data Element Details
                                    </Button>
                                    {/* </ExpansionPanelActions> */}
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                        <ExpansionPanel className={classes.dataElementContainer}
                            TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
                            onClick={() => !deMappings[dataElement.id] ?
                                getMappings(dataElement.id) : ''}
                        >
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className={`${classes.expansionPanelSummary} ${classes.formulaButton}`}
                                onClick={() => !deMappings[dataElement.id] ?
                                    getMappings(dataElement.id) : ''}
                            >
                                <Typography className={classes.heading} onClick={() => !deMappings[dataElement.id] ?
                                    getMappings(dataElement.id) : ''}><strong>Disaggregations and Derivations</strong></Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.expansionPanelDetails} >
                                <ErrorBoundary>
                                    {/* <Route render={() => ( */}
                                    {/* <div className={classes.tableContainer}> */}
                                    <Tabs value={panel} onChange={handleChange} className={classes.tabContainer} classes={{ indicator: classes.bigIndicator }}>
                                        <Tab label="DISAGGREGATIONS FORMULA" {...a11yProps(0)} />
                                        <Tab label="DISAGGREGATIONS LIST" {...a11yProps(1)} />
                                        <Tab label="DERIVATIONS" {...a11yProps(2)} />
                                    </Tabs>
                                    <TabPanel value={panel} index={0} className={classes.tabPanel}>
                                        <Grid container alignItems="center" justify="space-between">
                                            <Grid   >
                                                <div className={classes.tableContainer}>
                                                    {

                                                        (deMappings[dataElement.id]) ? Object.keys(Object(deMappings[dataElement.id])).map(

                                                            key =>
                                                                Object(deMappings[dataElement.id])[key].map_type === 'Has Option' ? (
                                                                    checked ? (Object(deMappings[dataElement.id])[key].to_concept_code +
                                                                        ((key === Object.keys(Object(deMappings[dataElement.id]))[Object.keys(Object(deMappings[dataElement.id])).length - 1]) ? '' : ' + '))
                                                                        : (Object(deMappings[dataElement.id])[key].to_concept_name + ((key === Object.keys(Object(deMappings[dataElement.id]))[Object.keys(Object(deMappings[dataElement.id])).length - 1]) ? '' : ' + ')))

                                                                    : '') : ''
                                                    }

                                                </div></Grid>
                                            <Grid item xs={3} >
                                                <FormControlLabel
                                                    value="Start"
                                                    control={<Switch color="primary" checked={checked} onChange={toggleChecked} />}
                                                    label={format}
                                                    labelPlacement="start"
                                                />
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={panel} index={1} className={classes.tabPanel}>
                                        <Grid item xs={12} className={classes.comboTable}>

                                            <Table className={classes.table} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell>Code</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        (deMappings[dataElement.id]) ? Object.keys(Object(deMappings[dataElement.id])).map(

                                                            key =>
                                                                Object(deMappings[dataElement.id])[key].map_type === 'Has Option' ? (
                                                                    <TableRow key={Math.random()}>
                                                                        <TableCell component="th" scope="row">
                                                                            {Object(deMappings[dataElement.id])[key].to_concept_name}
                                                                        </TableCell>
                                                                        <TableCell component="th" scope="row">
                                                                            {Object(deMappings[dataElement.id])[key].to_concept_code}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ) : ''
                                                        ) : ''
                                                    }
                                                </TableBody>
                                            </Table>
                                        </Grid>
                                    </TabPanel>

                                    <TabPanel value={panel} index={2} className={classes.tabPanel} >

                                        {/* {pdhDerivatives = []} */}
                                        {
                                            (dataElement.extras.source_data_elements) ? populatePDHDerivatives(dataElement.extras.source_data_elements) : ''
                                        }

                                        <Grid container alignItems="center" justify="space-between">
                                            <Grid item xs={6}></Grid>
                                            <Grid item xs={3}></Grid>
                                            <Grid item xs={3}>
                                                <div>
                                                    {expanded.length !== 0 ? <Button variant="outlined" color="primary" onClick={collapseAll(Object.keys(derivedCoC).concat(Object.keys(pdhDerivatives)))}>Collapse All</Button>
                                                        :
                                                        <Button variant="outlined" color="primary" onClick={expandAll(Object.keys(derivedCoC).concat(Object.keys(pdhDerivatives)))}>Expand All</Button>}
                                                </div>
                                            </Grid>
                                        </Grid>
                                        {dataElement.extras.source_data_elements ?
                                            <TreeView
                                                className={classes.derivatives}
                                                defaultCollapseIcon={<ExpandMoreIcon />}
                                                defaultExpanded={expanded}
                                                defaultExpandIcon={<ChevronRightIcon />}
                                                style={{ overflow: 'scroll', width: '800px' }}

                                            >
                                                {
                                                    Object.keys(derivedCoC).map(
                                                        key =>
                                                            <TreeItem key={key} nodeId={key} label={"Derived COC: " + key} expanded>
                                                                {Object.values(derivedCoC[key]).map(
                                                                    value =>
                                                                        <TreeItem nodeId={value} label={"Source Data Element: " + value}>
                                                                            {Object.values(pdhDerivatives[value]).map(
                                                                                coc =>
                                                                                    key === coc.derivedDisag ?
                                                                                        <TreeItem nodeId={coc.sourceDisag} label={"Source COC: " + (coc.sourceDisag.split('|')[0] + ' ............................... ' + (coc.sourceDisag.split('|')[1] === 1 ? ' ADD' : ' SUB'))}>
                                                                                        </TreeItem>
                                                                                        : ''
                                                                            )}
                                                                        </TreeItem>
                                                                )}

                                                            </TreeItem>
                                                    )
                                                }

                                            </TreeView> : 'There are no derivations for this selection'}
                                    </TabPanel>
                                    {pdhDerivatives = []}
                                    {derivedCoC = []}
                                    {/* </div> */}

                                </ErrorBoundary>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </ExpansionPanel>

                </div>
            ))}
            {/* <PepfarDetailsView />*/}


            <table>
                <tbody>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50, 100]}
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
            </table>
        </Grid>
    )
}