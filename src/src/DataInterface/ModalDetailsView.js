import React, { useEffect } from 'react';
import { useStateValue } from "../ContextSetup";
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Modal from '@material-ui/core/Modal';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TableChartIcon from '@material-ui/icons/TableChart';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

const DetailsContainer = styled.div`
    max-width: 100%;
    position: relative;
`

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

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
    const classes = useStyles();

    return (
        <div >
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {getTreeItemsFromData(treeItems)}
            </TreeView>
        </div>
    );
};

function getModalStyle() {
    const top = 50; //+ rand();
    const left = 50;// + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


const ModalContent = styled.div`
`

export default function DetailsView() {
    const [{ details }, dispatch] = useStateValue();
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = React.useState(false);
    const [alignment, setAlignment] = React.useState('left');

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Hook tied to changes in domain, source, and metadataSet
    useEffect(() => {
        async function updateDetails() {
            // console.log("updating details", details);
            if (details) setOpen(true); //.. modal should be closed when loaded by global variables
        }
        updateDetails()
    }, [details]);

    let title;
    let description;
    let attributes;
    try {
        title = details.title;// details && details.items[6].name;
        description = details.description;// details && details.items[9].children && details.items[9].children[0].children && details.items[9].children[0].children[2].name
        attributes = details.attributes;
    }
    catch (e) {
        title = "err";
        description = "err";
        attributes = [];
    }
    let showAll = false;
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                {alignment == 'left' ? <DetailsTable attributes={attributes} title={title} description={description} /> : <DataTreeView treeItems={details.items} />}
                <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                >
                    <ToggleButton value="left" aria-label="left aligned">
                        <TableChartIcon />
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">
                        <FormatListBulletedIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        </Modal >
    )
}




const DetailsTable = (props) => {
    const classes = useStyles();

    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(true);

    return (
        <div>
            <h2 id="simple-modal-title">{props.title}</h2>
            <p id="simple-modal-description">
                {props.description}
            </p>
            <List dense={dense}>
                {props.attributes.map((attribute) =>
                    <ListItem key={attribute.id}>
                        <ListItemText
                            primary={attribute.name}
                            secondary={secondary ? attribute.value : null}
                        />
                    </ListItem>
                )}
            </List>
        </div>
    )
}