import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useStateValue } from '../ContextSetup';

const useStyles = makeStyles(theme => ({

}));

export default function PepfarDetailsView() {
    const [{ selectedDataElement, detailPanel, dataElementDetail }, dispatch] = useStateValue();

    const classes = useStyles();

    //compare dropdown menu
    const [compare, setCompare] = React.useState({
        DATIM: true,
        PDH: false,
        MOH: false,
    });
    const handleCompareChange = name => event => {
        setCompare({ ...compare, [name]: event.target.checked });
    };

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogMessage, setDialogMessage] = React.useState('');
    const [comparePanel, setComparePanel] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    let deMappings = {};
    let de = {}
    let selectDataTemp = {};


    const { DATIM, PDH, MOH } = compare;


    //setup the comparison panel
    const [selectedDatim, setSelectedDatim] = React.useState([]);

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
                //setComparePanel({ ...comparePanel, [side]: open });

                //const selectDataTemp = [];

                //get data element details of the selected data elements

                // eslint-disable-next-line array-callback-return

                let temp = []
                Object.values(selectDataTemp).map(value => {
                    temp.push(value)
                }
                )
                setSelectedDatim(temp);
                let compareLink = ''
                Object.keys(selectedDataElement).map(key => {
                    compareLink = compareLink + 'id' + (parseInt(key) + 1) + '=' + selectedDataElement[key] + '&'
                })
                compareLink = '/compare?' + compareLink.substring(0, compareLink.length - 1)
                history.push(compareLink)
            }
        }
        else {
            setComparePanel({ ...comparePanel, [side]: open });
        }
    };

    const toggleDetailDrawer = (dataElement, side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        dispatch({
            type: "setDataElementDetail",
            dataElementDetail: dataElement
        })
        //setDetailPanel({ ...detailPanel, bottom: true });
        dispatch({
            type: "setDetailPanel",
            detailPanel: { ...detailPanel, [side]: open }
        })

        if (!open) {
            history.push('/codelist')
        }
    };

    return (
        <div>
            <Drawer anchor="bottom" open={comparePanel.bottom} onClose={toggleDrawer('bottom', false)} >
                <Grid container className={classes.comparePanelContainer}>
                    <Grid item xs={12}>
                        {/* <div className={classes.fixedTop}> */}
                        <div >
                            <CloseIcon onClick={toggleDrawer('bottom', false)} className={classes.closeComparePanel}>add_circle</CloseIcon>
                            <h2 className={classes.comparisonPanelTitle}>DATA ELEMENT COMPARISON</h2>
                            {/* comparison panel title */}
                            <div className={classes.compareTitle}>
                                {DATIM ? <div className={classes.compareTitleColumn}>DATIM</div> : ''}
                                {PDH ? <div className={classes.compareTitleColumn}>PDH</div> : ''}
                                {MOH ? <div className={classes.compareTitleColumn}>MOH</div> : ''}
                            </div>
                        </div>

                        {/* datim row */}
                        <div className={classes.compareRow} >
                            {/* <ErrorBoundary> */}
                            {
                                selectedDatim.map(datim => {
                                    !deMappings[datim.id] ? getMappings(datim.id) : ''
                                    return (
                                        <div className={classes.compareRowColumn} key={Math.random()}>
                                            <div className={classes.fixedTop}>
                                                {/* <div className={classes.compareCardSummary}> */}
                                                <div className={classes.compareTitle}>
                                                    {/* <div className={classes.compareCardText}>DATIM Data Element: </div> */}
                                                    <div className={classes.compareTitleColumn}>{datim.display_name}</div>
                                                    {/* <div className={classes.compareCardText}>DATIM UID: <strong>{datim.external_id}</strong></div> */}
                                                </div>
                                            </div>
                                            <ExpansionPanel className={classes.expandPanel}>
                                                <ExpansionPanelSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel3b-content"
                                                    id="panel3b-header"
                                                    onClick={() => !deMappings[datim.id] ? getMappings(datim.id) : ''}
                                                >

                                                    <Table className={classes.comboTable} aria-label="simple table">
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell><strong>Short Name</strong></TableCell>
                                                                <TableCell>{datim.names[1] ? (datim.names[1].name) : 'N/A'}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell><strong>Code</strong></TableCell>
                                                                <TableCell>{datim.names[2] ? (datim.names[2].name) : 'N/A'}</TableCell>
                                                            </TableRow>
                                                            <TableRow className={classes.comboTable}>
                                                                <TableCell><strong>Description</strong></TableCell>
                                                                <TableCell>{(datim.descriptions) ? datim.descriptions[0].description : "N/A"}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell><strong>UID</strong></TableCell>
                                                                <TableCell>{datim.id ? (datim.id) : 'N/A'}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell><strong>Source</strong></TableCell>
                                                                <TableCell>{datim.extras.source ? (datim.extras.source) : 'N/A'}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell><strong>Data Type</strong></TableCell>
                                                                <TableCell>{datim.datatype ? (datim.datatype) : 'N/A'}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell><strong>Domain Type</strong></TableCell>
                                                                <TableCell>{datim.extras.domainType ? (datim.extras.domainType) : 'N/A'}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell><strong>Value Type</strong></TableCell>
                                                                <TableCell>{datim.extras.valueType ? (datim.extras.valueType) : 'N/A'}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell><strong>Aggregation Type</strong></TableCell>
                                                                <TableCell>{datim.extras.aggregationType ? (datim.extras.aggregationType) : 'N/A'}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell><strong>Applicable Periods</strong></TableCell>
                                                                <TableCell>
                                                                    {
                                                                        datim.extras['Applicable Periods'] ? (datim.extras['Applicable Periods'].length > 0 ? (Object.keys(datim.extras['Applicable Periods']).map(

                                                                            key =>

                                                                                datim.extras['Applicable Periods'][key] + ", "

                                                                        )
                                                                        ) : 'N/A') : 'N/A'
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell><strong>Result/Target</strong></TableCell>
                                                                <TableCell>{datim.extras.resultTarget ? datim.extras.resultTarget : 'N/A'}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>

                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails className={classes.panelDetail}>


                                                    {/* <Route render={({ history }) => ( */}
                                                    <div className={classes.tableContainer} key={Math.random()}>
                                                        {/* data element Disaggregations */}
                                                        <strong>Disaggregations</strong>:<br />

                                                        <Table className={classes.table} aria-label="simple table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Name</TableCell>
                                                                    <TableCell>Code</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody >
                                                                {
                                                                    (deMappings[datim.id]) ? Object.keys(Object(deMappings[datim.id])).map(

                                                                        key =>
                                                                            <TableRow key={Math.random()}>
                                                                                <TableCell component="th" scope="row">
                                                                                    {Object(deMappings[datim.id])[key].to_concept_name}
                                                                                </TableCell>
                                                                                <TableCell component="th" scope="row">
                                                                                    {Object(deMappings[datim.id])[key].to_concept_code}
                                                                                </TableCell>
                                                                            </TableRow>

                                                                    ) : (Object.keys(emptyMap).map(

                                                                    ))
                                                                }
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                    {/* )}></Route> */}
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>


                                        </div>
                                    )
                                })
                            }
                            {/* </ErrorBoundary> */}
                        </div>
                    </Grid>
                </Grid>
            </Drawer >
            <Drawer anchor="bottom" open={detailPanel.bottom} onClose={toggleDetailDrawer('bottom', false)}>
                <Grid container className={classes.comparePanelContainer} justify="space-between">
                    {/* <Grid container alignItems="center" justify="space-between"> */}
                    <Grid item xs={6}  >
                        <h2 className={classes.comparisonPanelTitle}>DATA ELEMENT DETAILS</h2>
                    </Grid>

                    <Grid item xs={6}  >
                        <CloseIcon onClick={toggleDetailDrawer(dataElementDetail, 'bottom', false)} className={classes.closeComparePanel}>add_circle</CloseIcon>
                    </Grid>

                    <Grid item xs={6}  >
                        {dataElementDetail ?
                            <Table className={classes.comboTable} style={{ marginRight: '20px' }} aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell><strong>Short Name</strong></TableCell>
                                        <TableCell>{dataElementDetail.names[1] ? (dataElementDetail.names[1].name) : 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Code</strong></TableCell>
                                        <TableCell>{dataElementDetail.names[2] ? (dataElementDetail.names[2].name) : 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow className={classes.comboTable}>
                                        <TableCell><strong>Description</strong></TableCell>
                                        <TableCell>{(dataElementDetail.descriptions) ? dataElementDetail.descriptions[0].description : "N/A"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Data Type</strong></TableCell>
                                        <TableCell>{dataElementDetail.datatype ? (dataElementDetail.datatype) : 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Domain Type</strong></TableCell>
                                        <TableCell>{dataElementDetail.extras.domainType ? (dataElementDetail.extras.domainType) : 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Value Type</strong></TableCell>
                                        <TableCell>{dataElementDetail.extras.valueType ? (dataElementDetail.extras.valueType) : 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Aggregation Type</strong></TableCell>
                                        <TableCell>{dataElementDetail.extras.aggregationType ? (dataElementDetail.extras.aggregationType) : 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Applicable Periods</strong></TableCell>
                                        <TableCell>
                                            {
                                                dataElementDetail.extras['Applicable Periods'] ? (dataElementDetail.extras['Applicable Periods'].length > 0 ? (Object.keys(dataElementDetail.extras['Applicable Periods']).map(

                                                    key =>

                                                        dataElementDetail.extras['Applicable Periods'][key] + ", "

                                                )
                                                ) : 'N/A') : 'N/A'
                                            }
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Result/Target</strong></TableCell>
                                        <TableCell>{dataElementDetail.extras.resultTarget ? dataElementDetail.extras.resultTarget : 'N/A'}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table> : ''}
                    </Grid>
                    <Grid item xs={6}  >
                        <div>
                            <div className={classes.heroContainer}>
                                <div style={{ paddingBottom: '10px' }}>COMPARE WITH</div>
                                <div>
                                    <GridList cellHeight={60} className={classes.gridList} cols={2}>
                                        <GridListTile >
                                            <Paper component="form" className={classes.compare}>
                                                <InputBase
                                                    className={classes.input}
                                                    //inputProps={{ 'aria-label': 'search data elements' }}
                                                    id="compareSearch"
                                                    key="compareSearch"
                                                    onKeyDown={handleKeyPressCompare}
                                                    onChange={handleCompareInputChange}
                                                    value={compareInputText}
                                                />
                                            </Paper>
                                        </GridListTile>

                                        <GridListTile>
                                            <Button type="button" className={classes.margin} aria-label="search" onClick={() => performCompare(dataElementDetail, null)} variant="outlined" >
                                                COMPARE
                                            </Button>
                                        </GridListTile>
                                    </GridList>
                                    <div><InfoIcon fontSize='default' color="disabled"></InfoIcon><i style={{ color: '#8a8987' }}>Please enter a Data Element UID</i></div>
                                </div>

                            </div>
                            <div style={{ padding: '20px', marginLeft: '170px' }}>or select a linked data element below</div>
                        </div>
                        <div>
                            <Table className={classes.comboTable} style={{ marginLeft: '20px', maxWidth: '700px' }} aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell><strong>Linked Resources</strong></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>

                                    {dataElementDetail ? (
                                        (deMappings[dataElementDetail.id]) ? Object.keys(Object(deMappings[dataElementDetail.id])).map(

                                            function (key) {
                                                if (deMappings[dataElementDetail.id][key].map_type === "Derived From") {
                                                    let name = ''
                                                    let code = ''
                                                    let source = ''
                                                    let type = ''
                                                    if (deMappings[dataElementDetail.id][key].to_concept_code !== dataElementDetail.id) {
                                                        name = Object(deMappings[dataElementDetail.id])[key].to_concept_name
                                                        code = deMappings[dataElementDetail.id][key].to_concept_code
                                                        source = de[deMappings[dataElementDetail.id][key].to_concept_code].extras.source
                                                        type = de[deMappings[dataElementDetail.id][key].to_concept_code].concept_class
                                                    }
                                                    else {
                                                        let from_concept_url = deMappings[dataElementDetail.id][key].from_concept_url
                                                        if (from_concept_url.endsWith('/')) {
                                                            from_concept_url = from_concept_url.substring(0, from_concept_url.length - 1)
                                                        }
                                                        let arr = from_concept_url.split('/')
                                                        let derivationId = arr[arr.length - 1]
                                                        name = de[derivationId].display_name
                                                        code = de[derivationId].id
                                                        source = de[derivationId].extras.source
                                                        type = de[derivationId].concept_class
                                                        console.log(name + code + source + type)
                                                    }
                                                    return (
                                                        <TableRow>
                                                            <TableCell component="th" scope="row" style={{ maxWidth: '300px' }}>
                                                                <Grid container alignItems="center"
                                                                    //justify="space-between"
                                                                    spacing={2}>
                                                                    <Grid item xs={12}  >
                                                                        {name}
                                                                    </Grid>
                                                                    <Grid item xs={3}  >
                                                                        <Chip
                                                                            variant="outlined"
                                                                            size="small"
                                                                            style={{ marginTop: '10px' }}
                                                                            label={"UID: " + code}
                                                                            clickable
                                                                        /></Grid>
                                                                    <Grid item xs={3}  >
                                                                        <Chip
                                                                            variant="outlined"
                                                                            size="small"
                                                                            style={{ marginTop: '10px', marginLeft: '15px', backgroundColor: '#d8ebe0' }}
                                                                            label={"Source: " + source}
                                                                            clickable
                                                                        /></Grid>
                                                                    <Grid item xs={3}  >
                                                                        <Chip
                                                                            variant="outlined"
                                                                            size="small"
                                                                            style={{ marginTop: '10px', marginLeft: '15px', backgroundColor: '#c0b3c7' }}
                                                                            label={"Type: " + type}
                                                                            clickable
                                                                        /></Grid>
                                                                </Grid>
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" style={{ alignItems: 'left' }}>
                                                                <Button type="button" className={classes.margin} aria-label="search" onClick={() => performCompare(dataElementDetail, code)} variant="outlined" >
                                                                    COMPARE
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                }
                                            }) : ''
                                    ) : ''
                                    }

                                </TableBody>
                            </Table>
                        </div>
                    </Grid>
                </Grid>
            </Drawer>
        </div>
    )
}