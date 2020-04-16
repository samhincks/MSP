/*
Replacement file for Codelist.js and Indicator.js
TODO:
-Decide on a name for this. It's the data screen
*/
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import SourceSelector from './SourceSelector';

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: '30px',
        paddingLeft: '15px',
        paddingRight: '15px',
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))'
    }
}));


export default function DataInterface() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <SourceSelector />
        </div>
    )
}