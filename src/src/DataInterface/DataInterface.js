/*
Replacement file for Codelist.js and Indicator.js
TODO:
-Decide on a name for this. It's the data screen
*/
import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import SourceSelector from './SourceSelector';
import MetaDataView from './MetaDataView';

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: '30px',
        paddingLeft: '15px',
        paddingRight: '15px',
        maxWidth: '250px',
    }
}));


export default function DataInterface() {
    const classes = useStyles();

    return (
        <Fragment>
            <div className={classes.container}>
                <SourceSelector />
            </div>

            <MetaDataView />

        </Fragment>
    )
}