/*
Replacement file for Codelist.js and Indicator.js
TODO:
-Decide on a name for this. It's the data screen
*/
import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from '../ContextSetup';
import SourceSelector from './SourceSelector';
import MetaDataView from './MetaDataView';
import PepfarDataView from './PepfarDataView';
import PepfarFilterPanel from './PepfarFilterPanel';
//import PepfarDetailsView from './PepfarDetailsView';
import Grid from '@material-ui/core/Grid';
import PepfarSearchBar from './PepfarSearchBar';

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
    const [{ domain, source }, dispatch] = useStateValue();
    //.. Todo: use customPepfarComopnents should be in domain config

    //.. There will be standard component that can display everything, some stuff has custom coponent

    return (
        <Fragment>
            <div className={classes.container}>
                <SourceSelector />
            </div>

            <Grid container>
                {source.useCustomComponents && <PepfarSearchBar /> /*todo: PepfarSearchBar is specified in DomainConfig */}
                {source.useCustomComponents && <PepfarFilterPanel />}
                {source.useCustomComponents && <PepfarDataView />}
                {/*useCustomPepfarComponents && <PepfarDetailsView />*/}
                {!source.useCustomComponents && <MetaDataView />}
            </Grid>
        </Fragment>
    )
}