import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import * as utils from './utils';
import { defaultState } from './defaultState';


let port = 8087;
let app = express();
app.listen(port, console.log("Server listening on port", port));

app.get('/fetchTableData', (req,res) => {
  axios.get('https://open.exchangerate-api.com/v6/latest')
    .then((response) => {
      const rates  = response.data;
      let data = utils.createTableData(defaultState, rates);
      res.send(data);
    }).catch((error) => {
      console.log(error);
    });
  })
