import React, {useState, useEffect} from 'react';
import { Container, Table, Loader, Dimmer, Segment } from 'semantic-ui-react'

import { fetchData } from '../services.js';
import { MainTable } from './MainTable';
import { AggregatedTable } from './AggregatedTable';
import { Calculator } from './Calculator';

export const Main = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  setTimeout(() => setLoading(false), 3000);

  const getData = () => {
    fetchData().then((response) => setData(response)).catch((e) => console.log(e));
  }

  useEffect(() => {
    getData();
    const timer = setInterval(() => getData(), 10000)

    return () => {
      clearInterval(timer);
    }
  }, []);

  if(Object.keys(data).length === 0) {
    return null;
  }
  return (
    <Container style={{marginBottom: "50px", position: "relative", border: 0}}>
      <Dimmer.Dimmable as={Segment} dimmed={loading} style={{border: 0}}>
        <Dimmer active={loading} inverted>
          <Loader>Loading</Loader>
        </Dimmer>
        <h1 style={{marginTop: '50px'}}>Foreign Exchange Data</h1>
        <hr/>
        <Calculator rates={data.rates}/>
        <MainTable tableData={data.tableData} />
        <AggregatedTable aggregatedData={data.aggregatedData} />
      </Dimmer.Dimmable>
    </Container>
)}
