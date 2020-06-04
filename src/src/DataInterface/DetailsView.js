import React, { useEffect } from 'react';
import { useStateValue } from "../ContextSetup";
import styled from 'styled-components';

import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const DetailsContainer = styled.div`
    max-width: 100%;
    position: relative;
`

const getTreeItemsFromData = treeItems => {
    //if (typeof treeItems === 'object') treeItems = [treeItems];
    return treeItems.map(treeItemData => {
        let children = undefined;
        if (treeItemData.children && treeItemData.children.length > 0) {
            children = getTreeItemsFromData(treeItemData.children);
        }
        return (
            <TreeItem
                key={treeItemData.id}
                nodeId={treeItemData.id}
                label={treeItemData.id + ": " + treeItemData.name}
                children={children}
            />
        );
    });
};


const DataTreeView = ({ treeItems }) => {
    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {getTreeItemsFromData(treeItems)}
        </TreeView>
    );
};



export default function DetailsView() {
    const [{ details }, dispatch] = useStateValue();

    const data = [{
        id: 'root',
        name: 'Parent',
        children: [
            {
                id: '1',
                name: 'Child - 1',
            },
            // …
        ],
    }];

    // Hook tied to changes in domain, source, and metadataSet
    useEffect(() => {
        async function updateDetails() {
            // console.log("updating details", details);
        }

        updateDetails()
    }, [details]);


    //.. todo implement serch
    //..let data = filtered ? filtered : connector && connector.jsonData;
    //let data = searchResults;

    return (
        <DetailsContainer>
            {details && <DataTreeView treeItems={details} />}
        </DetailsContainer >
    )
}