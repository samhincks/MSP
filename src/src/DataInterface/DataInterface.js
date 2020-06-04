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
import DetailsView from './DetailsView';
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
width: 700px;
height: 400px;
border-radius: 3px;
padding: 5px;
`
const DetailsArea = styled.div`
    width: 700px;
    height: 800px;
    border-radius: 3px;
    padding: 5px;
`

const LeftArea = styled.div`
    display:grid;
    justify-content:flex-start;
    flex-direction: column;
`

const DataInterfaceContainer = styled.div`
    display:flex;
`


export default function DataInterface() {
    const classes = useStyles();
    const [{ domain, source }, dispatch] = useStateValue();

    /*
    //.. to do: figure out how to render a copmonent from a string. React.createElement()
    https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime */
    /*
    const FilterPanel = source.components.filter || null;
    const DataView = source.components.view || MetaDataView;
    const DetailsView = source.components.details || null;
    console.log(FilterPanel, DataView, DetailsView);
    */
    return (
        <DataInterfaceContainer>
            {source.useCustomComponents && <PepfarFilterPanel />}

            <LeftArea>
                <SourceSelector />
                <FilterArea>
                    <Grid container>
                        <GenericFilter />
                    </Grid>
                </FilterArea>

                <DetailsArea>
                    <DetailsView />
                </DetailsArea>
            </LeftArea>
            <DataArea useCustomComponents={source && source.useCustomComponents} />
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
    return (
        <DataAreaContainer>
            {<SearchBar /> /*todo: PepfarSearchBar is specified in DomainConfig */}
            {/*DataView && React.createElement(DataView)*/}
            {props.useCustomComponents && <PepfarDataView />}
            {/*source.useCustomPepfarComponents && <PepfarDetailsView />*/}
            {!props.useCustomComponents && <MetaDataView />}

        </DataAreaContainer>
    )

}