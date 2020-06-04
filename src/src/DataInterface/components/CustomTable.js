import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';

import Popover from '@material-ui/core/Popover';
// core components
import styles from "../../Styles/tableStyle.js";
import { useStateValue } from '../../ContextSetup';
import { BottomNavigationAction } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
    const classes = useStyles();
    const { tableHead, tableData, tableHeaderColor } = props;
    const [{ connector, metadataSet, details }, dispatch] = useStateValue();
    const maxLengthOfCell = 75; // numCharacters in max length of a cell
    const [selected, setSelected] = React.useState([]);

    async function handleCustomTableClick(entry) {
        const details = await connector.getDetails(metadataSet, entry.url);
        dispatch({
            type: 'setDetails',
            details: details
        });
    }

    const minimizeLength = (item) => {
        return (item.length > maxLengthOfCell) ? getDescriptivePartOfText(item) : item;
    }
    const maximizeLength = (item) => {
        return (item.length > maxLengthOfCell) ? item : null;
    }

    function getDescriptivePartOfText(item) {
        return item.substring(0, maxLengthOfCell - 3) + "...";
    }

    function handleCellOpen(e) {
        //console.log(e)
    }
    const isSelected = (name) => {
        selected.indexOf(name) !== -1
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        console.log(name);
        //setSelected([]);
        console.log(selected);

    }
    function handleCellClose(e) {

    }
    function rowHover(e) {
        //    e.target.addClass('row-hover');
    }
    // consider rchanging tooltip to Popover: https://material-ui.com/components/popover/
    // try hacking material ui from here https://material-ui.com/components/tables/
    return (
        <div className={classes.tableResponsive}>
            <Table className={classes.table}>
                {tableHead !== undefined ? (
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                        <TableRow className={classes.tableHeadRow}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={false}
                                />
                            </TableCell>
                            {tableHead.map((prop, key) => {
                                return (
                                    <TableCell
                                        className={classes.tableCell + " " + classes.tableHeadCell}
                                        key={key}
                                    >
                                        {prop}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                ) : null}
                <TableBody>
                    {tableData.map((prop, key) => {
                        const isItemSelected = isSelected(key);
                        const labelId = `enhanced-table-checkbox-${key}`;
                        if (isItemSelected) { console.log(key) }
                        return (
                            <TableRow hover key={key} onMouseOver={rowHover} onClick={(event) => handleClick(event, key)} className={classes.tableBodyRow}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={isItemSelected}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </TableCell>
                                {prop.values.map((item, key) => {
                                    return (
                                        <Tooltip onClose={handleCellClose} key={key + "t"} onOpen={handleCellOpen} title={maximizeLength(item) || ""} placement="top-start">
                                            <TableCell onClick={() => handleCustomTableClick(prop)} className={classes.tableCell} key={key} item={item}>
                                                {minimizeLength(item)}
                                            </TableCell>
                                        </Tooltip>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

const CustomTableRow = (props) => {
    console.log(props);
}

CustomTable.defaultProps = {
    tableHeaderColor: "gray"
};

CustomTable.propTypes = {
    tableHeaderColor: PropTypes.oneOf([
        "warning",
        "primary",
        "danger",
        "success",
        "info",
        "rose",
        "gray"
    ]),
    tableHead: PropTypes.arrayOf(PropTypes.string)
};
