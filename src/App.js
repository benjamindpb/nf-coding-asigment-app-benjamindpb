import React, { useState } from 'react';
import Map from './components/Map';
import { Button, Form, InputGroup } from 'react-bootstrap';
import api from './services/api';

export default function App() {
  const handleSelect = (e) => {
    setActivity(e.target.value)
  }

  const onChangeDate = (e) => {
    const date = new Date(e.target.value);
    setActivityDate(date);
  }

  const [activity, setActivity] = useState('soil');

  // soil sample variables
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [carbon, setCarbon] = useState();
  // fertilization area variables
  const [polygonPointsStr, setPolygonPoints] = useState();
  const [fertilizer, setFertilizer] = useState();

  const [activityDate, setActivityDate] = useState(new Date());

  const createActivity = async () => {
    if (activity === 'soil') {
      await api.post('/activity/soil', {
        coords: [lat, lng],
        carbonMeasurement: carbon,
        activityDate,
      })
    }
    if (activity === 'fertilization') {
      await api.post('/activity/fertilization', {
        polygonPointsStr,
        fertilizerApplied: fertilizer,
        activityDate,
      })
    }
  }

  return (
    <div className='container-fluid p-2 bg-light'>
      <h3>NF Coding Assigment - Full Stack </h3>
      <h4>Land Activity Tracking Application with Map Integration and Graph Visualization</h4>
      <h5>Candidate: Benjamín del Pino </h5>
      <hr></hr>
      <div className='row d-flex justify-content-center'>
        <div className='col col-md-6'>
          <Form.Label className='mt-2'>Create new activity:</Form.Label>
          <Form.Select size="sm" onChange={e => handleSelect(e)}>
            <option value="soil">Soil Sample</option>
            <option value="fertilization">Fertilization Area</option>
          </Form.Select>
          {
            activity === 'soil' ?
              <div>
                <InputGroup className='my-2' size="sm">
                  <InputGroup.Text>Latitude</InputGroup.Text>
                  <Form.Control onChange={e => setLat(e.target.value)} value={lat || ''} />
                  <InputGroup.Text>Longitude</InputGroup.Text>
                  <Form.Control onChange={e => setLng(e.target.value)} value={lng || ''} />
                </InputGroup>
                <InputGroup size="sm" >
                  <InputGroup.Text>Carbon Measurement</InputGroup.Text>
                  <Form.Control onChange={(e) => setCarbon(e.target.value)} />
                </InputGroup>
              </div> :
              <div>
                <InputGroup className='my-2' size="sm">
                  <InputGroup.Text>Polygon Points</InputGroup.Text>
                  <Form.Control as="textarea" placeholder='ex: [
                             [100.0, 0.0],
                             [101.0, 0.0],
                             [101.0, 1.0],
                             [100.0, 1.0],
                             [100.0, 0.0]
                         ]' onChange={e => setPolygonPoints(e.target.value)} value={polygonPointsStr || ''} />
                </InputGroup>
                <p className="fs-6 text-info">(You must enter a string that represents an <b>array of coordinates</b> that start and end in the same point)</p>
                <InputGroup size="sm">
                  <InputGroup.Text>Fertilizer Applied</InputGroup.Text>
                  <Form.Control onChange={(e) => setFertilizer(e.target.value)} />
                </InputGroup>
              </div>
          }
        </div>
      </div>
      <div className='row mt-2 d-flex justify-content-center'>
        <div className='col col-md-6'>
          <InputGroup className='my-2' size="sm">
            <InputGroup.Text>Activity Date</InputGroup.Text>
            <Form.Control type='date' onChange={e => onChangeDate(e)} />
          </InputGroup>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col d-flex justify-content-center'>
          <Button variant="secondary" onClick={createActivity}>Create</Button>
        </div>
      </div>
      <Map />
    </div>
  );
}
