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
import ModalDetailsView from './ModalDetailsView';
import PepfarFilterPanel from './PepfarFilterPanel';
import GenericFilter from './GenericFilter';
//import PepfarDetailsView from './PepfarDetailsView';
import Grid from '@material-ui/core/Grid';
import SearchBar from './SearchBar';
import styled from 'styled-components'

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: '30px',
        paddingLeft: '15px',
        paddingRight: '15px',
        maxWidth: '250px',
    }
}));

const FilterArea = styled.div`
maxHeight: 400px;
border-radius: 3px;
padding: 5px;
`
const DetailsArea = styled.div`
    border-radius: 3px;
    padding: 5px;
`

const LeftArea = styled.div`
    justify-content:flex-start;
    flex-direction: column;
    align-items:
    box-sizing: border-box;
    margin-left:200px;
    margin-top:148px;
`

const DataInterfaceContainer = styled.div`
    display:flex;
    width:100%;
    `
//.. add custom component configured in domainConfig to componentsMap 
const componentsMap = { SourceSelector, GenericFilter, MetaDataView, SearchBar, ModalDetailsView };

function getComponent(componentName) {
    const DynamicComponent = componentsMap[componentName];
    if (DynamicComponent)
        return <DynamicComponent />;
    else {
        console.log("%c Could not find component ", "color:red", componentName);
        return null;
    }
}

export default function DataInterface() {
    const classes = useStyles();
    const [{ domain, source }, dispatch] = useStateValue();
    let removeSearch = false;
    if (source.removeSearch) removeSearch = source.removeSearch;
    let detailsComponent = source.detailsComponent || domain.detailsComponent;
    let sourceSelectorComponent = source.sourceSelectorComponent || domain.sourceSelectorComponent;
    let filterComponent = source.filterComponent || domain.filterComponent;
    let searchComponent = source.searchComponent || domain.searchComponent;
    let viewComponent = source.viewComponent || domain.viewComponent;


    return (
        <DataInterfaceContainer>
            {source.useCustomComponents && <PepfarFilterPanel />}
            <LeftArea>
                {sourceSelectorComponent ? getComponent(sourceSelectorComponent) : <SourceSelector />}
                <FilterArea>
                    <Grid container>
                        {filterComponent ? getComponent(filterComponent) : <GenericFilter />}
                    </Grid>
                </FilterArea>

                <DetailsArea>
                    {detailsComponent ? getComponent(detailsComponent) : <ModalDetailsView />}
                </DetailsArea>
            </LeftArea>
            <DataArea removeSearch={removeSearch} searchComponent={searchComponent} viewComponent={viewComponent} />
        </DataInterfaceContainer>
    )
}


const DataAreaContainer = styled.div`
    display: flex;
    align-items: left;
    flex-direction: column;
    padding-bottom:100px;
    /*background-color: lightblue;*/
    width:100%
`

function DataArea(props) {
    const classes = useStyles();

    let removeSearch = false;
    if (props.removeSearch) removeSearch = props.removeSearch;
    return (
        <DataAreaContainer>
            {!(removeSearch) && (props.searchComponent ? getComponent(props.searchComponent) : <SearchBar />)}
            {props.viewComponent ? getComponent(props.viewComponent) : <MetaDataView />}
        </DataAreaContainer>
    )

}