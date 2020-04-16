import React, { useState } from "react";

import styled from "styled-components";
import { Grid, Container } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";

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


export default function Header() {
  const classes = useStyles();
  const [{ domains, domain }, dispatch] = useStateValue();
  const logoUrl = domain.logo; //.. TODO: change this to the domain chosen in this file.

  const updateDomain = (domain) => {
    dispatch({
      type: 'changeDomain',
      domain: domain
    })
  }

  return (
    <HeaderContainer>
      <Container maxWidth="lg">
        <Grid container alignItems="center">
          <Grid item xs={10}>
            <Title className={classes.title}>
              <a href="/">
                <img src={logoUrl} className={classes.logo} alt="DATIM logo" />
              </a>
            </Title>
          </Grid>
          <SelectContainer>
            <Select value={domain} onChange={(e) => updateDomain(e.target.value)} labelId="label" id="select">
              {domains.map(domain =>
                <MenuItem key={domain.id} value={domain}>{domain.title}</MenuItem>
              )}
            </Select>
          </SelectContainer>
        </Grid>
      </Container>
    </HeaderContainer>
  );
}
