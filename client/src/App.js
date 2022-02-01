import React, { useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  MapContainer,
  TileLayer,
  Circle,
  Tooltip,
  useMapEvent,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

const center = [32.92495, -97.03985];

const columns = [
  { field: 'id', headerName: 'ID', width: 15 },
  {
    field: 'mls',
    headerName: 'MLS',
    width: 100,
    editable: true,
  },
  {
    field: 'rent',
    headerName: 'Rent/m',
    width: 100,
    editable: true,
  },
];

const rows = [
  { id: 1, mls: '14675648', rent: '2200' },
  { id: 2, mls: '14669093', rent: '3200' },
  { id: 3, mls: '14679033', rent: '2250' },
  { id: 4, mls: '14658272', rent: '2100' },
  { id: 5, mls: '14677345', rent: '2495' },
  { id: 6, mls: '14656240', rent: '3000' },
  { id: 7, mls: '14664523', rent: '3100' },
  { id: 8, mls: '14659065', rent: '2095' },
  { id: 9, mls: '14672731', rent: '2800' },
];




export default function App() {
  const [cPoint, setCpoint] = useState(null)
  const [radius, setRadius] = useState(0.5)

  function MyComponent() {
    useMapEvent('click', (e) => {
      const { lat, lng } = e.latlng
      setCpoint([lat, lng])
    })
    return null
  }
  return (
    <Grid container >
      <Grid lg={2} container
        direction="column"
        justifyContent="flex-start"
        alignItems="center" item>
        <h1 >GIS Project</h1>
        <TextField id="outlined-basic" label="Radius"
          type="number" variant="outlined" inputProps={{
            maxLength: 5,
            step: 0.1,
            min: 0.1,
            max: 0.5
          }} value={radius} onChange={e => setRadius(e.target.value)} />
        <div style={{ height: 600, width: '100%', marginTop: 20, marginBottom: 20 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
        <Typography variant="h6" component="p" style={{ marginTop: 20 }}>
          Avg price : $2135.22
        </Typography>
      </Grid>
      <Grid lg={10} item>
        <MapContainer
          center={center}
          zoom={10}
          style={{ height: '100vh' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cPoint && <Circle
            center={cPoint}
            pathOptions={{ color: 'red' }}
            radius={radius * 100}
            size={10}
          >
            <Tooltip>Radius:{radius}km</Tooltip>
          </Circle>}
          <MyComponent />
        </MapContainer>
      </Grid>
    </Grid>
  );
}
