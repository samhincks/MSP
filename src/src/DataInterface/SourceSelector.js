/*
MetadatasetSelector includes both a source selector and metadataset selector, depending
on the value

- Some code is refactored from Shortcut
*/
import React, { useState, Fragment } from 'react';
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
import { queryMetadataSet } from "../Connector/Connector";

import { Connector } from "../Connector/Connector";
import { PepfarIndicatorConnector, PepfarElementConnector } from "../Connector/Connector";

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

    const [{ sources, source, metadataSets, metadataSet }, dispatch] = useStateValue();

    const updateSource = (source) => {
        dispatch({
            type: 'changeSource',
            source: source
        })
    }

    const updateMetadataset = async (metadataSet) => {
        let connector;//.. TODO: handle all cases

        switch (metadataSet.id) {
            case 'reference-indicators':
                connector = new PepfarIndicatorConnector(metadataSet);
                break;
            case 'data-elements':
                connector = new PepfarElementConnector(metadataSet);
                break;
        }

        const jsonData = await connector.getJSONDataFromAPI();
        console.log(jsonData);

        dispatch({
            type: 'changeMetadataset',
            metadataSet: metadataSet
        })

        dispatch({
            type: 'setConnector',
            connector: connector
        })
    }

    //.. Create React component to be placed in relevant area in Domain (which has code sucked out from Indicator.js)
    //.. Todo: add FontAwesomeIcon

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

                        {metadataSets.map(metadataSet =>
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


