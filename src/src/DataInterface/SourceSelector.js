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
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';


import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import { useStateValue } from "../ContextSetup";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: '20px'
    },
    shortcutButton: {
        paddingLeft: '10px',
        justifyContent: "left",
        color: props => '#1d5893',
        width: '100%',
        minWidth: '250px',
        fontSize: '1.0em',
        backgroundColor: props => props.index === 0 && props.initState ? '#C1A783' : "white",
        '&:hover, &:focus': {
            backgroundColor: '#C1A783',
            color: '#000000'
        }
    },
    selected: {
        backgroundColor: '#C1A783',
        color: '#000000'
    },
    shortcutButtonSelected: {
        paddingLeft: '10px',
        justifyContent: "left",
        color: '#000000',
        backgroundColor: '#C1A783',
        width: '100%',
        minWidth: '250px',
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
    margin-top: 20px;
    margin-right:20px;
`
const MetadataSetContainer = styled.div`
    display:flex;
    flex-direction: column;
    max-width: 150px
    margin-top: 10px;
`
const MetadataSetTab = styled.div`
    margin:2px
`

/* Source Selector gives choice of Source and MetadataSet
 */
export default function SourceSelector() {
    let attributes = {}
    attributes.color = "blue";
    const classes = useStyles(attributes);
    const [{ sources, source, connector, metadataSets }, dispatch] = useStateValue();
    const [initState, setInitState] = useState(true);

    // Hook tied to changes in connector and domain
    useEffect(() => {
        async function updateMetadatasets() {
            dispatch({
                type: 'changeMetadataSets',
                metadataSets: []
            })
            const metadataSets = await connector.getMetadataSets();
            //console.log(metadataSets);
            dispatch({
                type: 'changeMetadataSets',
                metadataSets: metadataSets
            })
            dispatch({
                type: 'changeSearchResults',
                searchResults: {}
            });
            dispatch({
                type: 'setPageNum',
                pageNum: 1
            });
        }

        updateMetadatasets()

    }, [source]); //.. if this array is empty, this hook is like componentDidMount. 

    const updateSource = (source) => {
        //.. do we need to update Source?
        dispatch({
            type: 'changeSource',
            source: source
        })
        setInitState(false);

    }

    return (
        <div className={classes.container}>
            <Grid container>
                <Grid item xs={12} md={12}  >
                    {sources.length > 1 &&
                        <SelectContainer>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Source
                            </InputLabel>
                            <Select value={source} onChange={(e) => updateSource(e.target.value)} labelId="label" id="select">
                                {sources.map(source =>
                                    <MenuItem key={source.id} value={source}>{source.title}</MenuItem>
                                )}
                            </Select>
                        </SelectContainer>
                    }

                    <MetadataSetContainer>
                        { //.. todo make metadatasets the one seletected
                            metadataSets && metadataSets.map((metadataSet, index) =>
                                <MetadataSetButton key={metadataSet.id + "a"} metadataSet={metadataSet} setState={setInitState} initState={initState} index={index} color="blue" />
                            )}
                    </MetadataSetContainer>
                </Grid>
            </Grid>

        </div>
    )
}

const MetadataSetButton = (props) => {
    const [{ metadataSets, metadataSet }, dispatch] = useStateValue();
    let classes = useStyles(props);
    //console.log("%c initial state", "color:green", props.initState)

    //.. the component to update when metadataSets is changed (which it is when the async call is returned in Header.js in updateMetadatasets).
    const updateMetadataset = (metadataSet, target) => {
        props.setState(false);
        dispatch({
            type: 'changeMetadataSet',
            metadataSet: metadataSet
        })
        dispatch({
            type: 'setPageNum',
            pageNum: 1
        });
    }

    return (
        <MetadataSetTab key={props.metadataSet.id}>
            <Button variant="outlined"
                key={props.metadataSet.id || props.metadataSet.short_code}
                value={props.metadataSet}
                onClick={(e) => updateMetadataset(props.metadataSet, e.target)}
                color="primary"
                className={props.metadataSet.id === metadataSet.id ? classes.shortcutButtonSelected : classes.shortcutButton} >
                <LocalOfferOutlinedIcon style={{ color: '#1D5893' }} />
                {props.metadataSet.title || props.metadataSet.name}
            </Button>
        </MetadataSetTab>
    )
}


