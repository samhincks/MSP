/*
--------------------------------------------------------------------------------
4/27/2020
The Source Selector Component lets users chose between different Sources and Metadatasets.
Metadatasets are retrieved by a call to the connector which may populate the
global metadataSets array from what is stored in domainConfig or via an API call.

The component's views update when sources or metadataSets change value which they 
may be do by the selection enabled by the component itself, but also by a change in
Domain as specified in Header.js 

Source Selector is also hooked to a change in Source which also occurs when the component
mounts with the useEffect() convention. 
--------------------------------------------------------------------------------
*/
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import { useStateValue } from "../ContextSetup";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: '50px'
    },
    shortcutButton: {
        paddingLeft: '10px',
        justifyContent: "left",
        color: '#1d5893',
        width: '100%',
        fontSize: '1.0em',
        '&:hover, &:focus': {
            backgroundColor: '#C1A783',
            color: '#000000'
        }
    },

    shortcutButtonSelected: {
        color: '#000000',
        backgroundColor: '#C1A783',
        width: '100%',
        cursor: 'pointer',
        fontSize: '1.0em',
        '&:hover, &:focus': {
            backgroundColor: '#C1A783',
            color: '#000000'
        }
    },

    sidebar: {
        margin: '0em',
        marginRight: '2em'
    },
}));

const SelectContainer = styled.div`
    max-width: 100%;
    position: relative;
    back
`

export default function SourceSelector() {

    const classes = useStyles();
    const [{ sources, source, connector, metadataSets }, dispatch] = useStateValue();

    // Hook tied to changes in connector and domain
    useEffect(() => {
        async function updateMetadatasets() {
            const metadataSets = await connector.getMetadataSets();
            console.log(metadataSets);
            dispatch({
                type: 'changeMetadataSets',
                metadataSets: metadataSets
            })
        }

        updateMetadatasets()
    }, [source]); //.. if this array is empty, this hook is like componentDidMount. 

    const updateSource = (source) => {
        //.. do we need to update Source?
        dispatch({
            type: 'changeSource',
            source: source
        })
    }

    //.. the component to update when metadataSets is changed (which it is when the async call is returned in Header.js in updateMetadatasets).
    const updateMetadataset = (metadataSet) => {
        dispatch({
            type: 'changeMetadataSet',
            metadataSet: metadataSet
        })
    }

    return (
        <div className={classes.container}>
            <Paper className={classes.sidebar}>
                <Grid container>
                    <Grid item xs={12} md={12}  >
                        {sources.length > 1 &&
                            <SelectContainer>
                                <Select value={source} onChange={(e) => updateSource(e.target.value)} labelId="label" id="select">
                                    {sources.map(source =>
                                        <MenuItem key={source.id} value={source}>{source.title}</MenuItem>
                                    )}
                                </Select>
                            </SelectContainer>
                        }

                        { //.. todo make metadatasets the one seletected
                            metadataSets && metadataSets.map(metadataSet =>
                                <Button variant="outlined"
                                    key={metadataSet.id} value={metadataSet}
                                    onClick={() => updateMetadataset(metadataSet)}
                                    color="primary"
                                    className={classes.shortcutButton}>
                                    <LocalOfferOutlinedIcon style={{ color: '#1D5893', marginRight: '5px' }} />  {metadataSet.title || metadataSet.name}
                                </Button>

                            )}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}


