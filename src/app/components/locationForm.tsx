'use client';

import { mdiLatitude, mdiLongitude, mdiMagnify, mdiMapMarkerRadius } from "@mdi/js";
import Icon from "@mdi/react";
import { Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import { DEFAULT_LAT, DEFAULT_LONG } from "../util/constants";

class Coordinates {
    latitude: number;
    longitude: number;
    constructor(lat: number, long: number) {
        this.latitude = lat
        this.longitude = long
    }
}

let coords = new Coordinates(DEFAULT_LAT, DEFAULT_LONG)

export default function LocationForm(o: { lat: string, long: string, onSearchCoords: (c: {latitude: Number, longitude: Number}) => void, onLocateMe: () => void }) {
  const onSearch = () => {
    o.onSearchCoords(coords)
  }
    return (
        <Grid container spacing={2}>
          <Grid item>
            <IconButton onClick={o.onLocateMe}>
              <Icon path={mdiMapMarkerRadius} size={2} color="grey"/> 
            </IconButton>
          </Grid>
          <Grid item columns={5}>
            <TextField 
              id="outlined-basic" 
              label="Latitude" 
              variant="outlined" 
              InputProps={{
                onChange: (test) => {
                    coords.latitude = parseFloat(test.target.value)
                    console.debug(coords)
                },
                defaultValue: parseFloat(o.lat),
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon path={mdiLatitude} size={1} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item columns={5}>
            <TextField 
              id="outlined-basic" 
              label="Longitude" 
              variant="outlined" 
              InputProps={{
                onChange: (test) => {
                    coords.latitude = parseFloat(test.target.value)
                    console.debug(coords)
                },
                defaultValue: parseFloat(o.long),
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon path={mdiLongitude} size={1} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={onSearch}>
              <Icon path={mdiMagnify} size={2} color="grey"></Icon>
            </IconButton>
          </Grid>
        </Grid>
    )
}