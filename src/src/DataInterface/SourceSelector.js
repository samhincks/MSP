/*
MetadatasetSelector includes both a source selector and metadataset selector, depending
on the value

- Some code is refactored from Shortcut
*/
import React, { useState, useEffect, Fragment } from 'react';
import domainConfig from '../domainConfig.json';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRibbon } from '@fortawesome/free-solid-svg-icons'
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import { useStateValue } from "../ContextSetup";
import { queryMetadataSet, OCLConnector } from "../Connector/apiQueries";



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
    //const [source, setSource] = useState(domainConfig.domains[0]); //.. default value is the selected domain as chosen in Header.js's sources[0].metadataSets
    //.. if we have a context and update one thing, then it updates everything

    const classes = useStyles();

    const [{ domain, sources, source, connector, metadataSets }, dispatch] = useStateValue();

    // Hook tied to changes in connector and domain
    useEffect(() => {
        async function updateMetadatasets() {
            const metadataSets = await connector.getMetadataSets();

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

    //.. Create React component to be placed in relevant area in Domain (which has code sucked out from Indicator.js)
    //.. Todo: add FontAwesomeIcon
    //.. Todo, make metadatasets set by Reducer changes so that they can be called when APi returns inSource
    console.log(sources);
    return (
        <div className={classes.container}>
            <Paper className={classes.sidebar}>
                <Grid container>
                    <Grid item xs={12} md={12}  >
                        {sources.length > 0 &&
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
                                    <LocalOfferOutlinedIcon style={{ color: '#1D5893', marginRight: '5px' }} />  {metadataSet.title}
                                </Button>

                            )}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}


