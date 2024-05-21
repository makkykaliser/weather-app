'use client';

import { mdiWeatherCloudy, mdiWeatherFog, mdiWeatherLightning, mdiWeatherNight, mdiWeatherPouring, mdiWeatherSunny } from "@mdi/js";
import Icon from "@mdi/react";
import { Grid } from "@mui/material";

const icons = [
  {
    key: ['sunny'],
    icon: mdiWeatherSunny
  },
  {
    key: ['cloudy'],
    icon: mdiWeatherCloudy
  },
  {
    key: ['rain', 'shower'],
    icon: mdiWeatherPouring
  },
  {
    key: ['thunder'],
    icon: mdiWeatherLightning
  },
  {
    key: ['fog'],
    icon: mdiWeatherFog
  },
  {
    key: ['clear'],
    icon: mdiWeatherNight
  }
]

export default function weatherInfo(w: {weather: string, location: String, temp: String}) {
    
  let useIcons = []
  icons.forEach((i) => {
    i.key.forEach((k) => {
      if (w.weather.toLowerCase().includes(k)) {
        useIcons.push(i.icon)
      }
    })
  })
  
  let icon =           
  <Grid item xs={12}>
    <Icon path={useIcons[0]} size={4} color="#3f3970" />
  </Grid>

    return (
        <Grid container columns={1} spacing={2}>
          <Grid item xs={12}>
            <h1 className="text-2xl">{w.weather}</h1>
          </Grid>
          <Grid item xs={12}>
            <span className="text-xl">{w.location}</span>
          </Grid>
            {icon}
          <Grid item xs={12}>
            <h1 className="text-5xl">{w.temp.length > 0 ? `${w.temp}°` : ''}</h1>
          </Grid>
        </Grid>
    )
}

