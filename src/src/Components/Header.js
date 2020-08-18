/* Header displays logo and domain selector
 */
import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { Grid, Container } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../ContextSetup";

const HeaderContainer = styled.div`
    width: 100%;
  `;

const Title = styled.h3`
    color: white;
    float: left;
    font-size: 28px;
  `;

const useStyles = makeStyles((theme) => ({
  logo: {
    textAlign: "center",
    maxWidth: "200px",
    maxHeight: "100px",
    position: "absolute",
    left: "70px",
    top: "-20px",
  },
  title: {
    color: "#000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
}));


const SelectContainer = styled.div`
    max-width: 100%;
    position:relative;
`

export default function Header(props) {
  const classes = useStyles();
  const [{ domains, domain, source }, dispatch] = useStateValue();
  //const history = useHistory();
  const logoUrl = domain.logo; //.. TODO: change this to the domain chosen in this file.



  return (
    <HeaderContainer>
      <Container maxWidth="lg">
        <Grid container alignItems="center">
          <Grid item xs={10}>
            <Title className={classes.title}>
              <a href="/">
                <img src={logoUrl} className={classes.logo} alt="" />
              </a>
            </Title>
          </Grid>
          <Grid item xs={2}>
            <SimpleMenu />
          </Grid>
        </Grid>
      </Container>
    </HeaderContainer>
  );
}
function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [{ domains, domain, source }, dispatch] = useStateValue();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const updateDomain = (domain) => {
    console.log("updating domain to " + domain.id);

    dispatch({
      type: 'changeDomain',
      domain: domain
    })
    console.log("%c location", "color: purple", window.location);
    //if (window.location.pathname === '/codelist') window.location.pathname = '/datainterface/' + domain.id;//props.history.push("/datainterface")

    if (domain.id === "pepfar_msp") window.location.pathname = '/referenceIndicator';
    else {    // todo: fix this hack by proper usage of history (this hack is also in context.js)
      window.location.pathname = '/datainterface/' + domain.id;
      // https://stackoverflow.com/questions/3338642/updating-address-bar-with-new-url-without-hash-or-reloading-the-page
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <SelectContainer>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Domain
              </InputLabel>
            <Select label="Domain:" value={domain} onChange={(e) => updateDomain(e.target.value)} labelId="label" id="select">
              {domains.map(domain =>
                <MenuItem key={domain.id} value={domain}> {domain.title}</MenuItem>
              )}
            </Select>
          </SelectContainer></MenuItem>
      </Menu>
    </div>
  );
}