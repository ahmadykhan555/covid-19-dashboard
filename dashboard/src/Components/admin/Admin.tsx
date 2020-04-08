import React, { useState } from "react";

import "./Admin.scss";

import { CSVReader } from "react-papaparse";
import { Button, Alert, SplitButton, Dropdown } from "react-bootstrap";

const Admin: React.FC<any> = () => {
  const buttonRef: any = React.createRef();
  const [alert, setAlert] = useState(false);
  const [button, setButton] = useState(false);
  const [alertHeading, setAlertHeading] = useState('File uploaded successfully!');
  const [fileData, setIsFileData]: any = useState([]);
  const [parsedObject, setParsedObject]: any = useState([]);

  const handleOnFileLoad = (data: any) => {
    setIsFileData(data);
    setButton(true);
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err);
  };
  const message = alert ? (
    <div>
      <Alert variant="success">
        <Alert.Heading>{alertHeading}</Alert.Heading>
      </Alert>
    </div>
  ) : null;

  const handleOpenDialog = (e: any) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const compareColumnNames = (a: any, b: any) => {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  const handleCasesFile = (eventKey: any, event: Object) => {
    if (fileData) {
      var expexted = {
        ...['District', 'Total Deaths', 'Total Deaths in last 24 Hours', 'Total Confirmed Cases',
                      'Total Confirmed Cases in Last 24 hours', 'Total Suspected Cases Under Investigation',
                      'Total Suspected Cases Under Investigation in Last 24 hours', 'Total Cases Tested Negative',
                      'Total Cases Suspected Negative in Last 24 Hours', 'Total Tests Conducted',
                      'Total Recovered Patients'
        ]
      }
      var colNames = { ...fileData[1].data }

      if (!compareColumnNames(expexted, colNames)) {
        setAlert(true);
        setAlertHeading('Incorrect file or incorrect data format!')
      } else {
        setAlert(true);
        setButton(false);
        setAlertHeading('File uploaded successfully!')
      }

      for (var i=2; i<fileData.length; i++) {
        var dict: any = {};
        dict[fileData[i].data[0]] = {};
        for (var j=1; j<fileData[2].data.length; j++) {
          dict[fileData[i].data[0]][fileData[1].data[j]] = fileData[i].data[j];
        }
        setParsedObject(parsedObject.push(dict));
      }
      console.log(parsedObject);
    }
  }

  const handleQuarantineFile = (eventKey: any, event: Object) => {}
  
  const handleHealthFile = (eventKey: any, event: Object) => {}

  return (
    <div className="admin">
      {message}
      <CSVReader
        ref={buttonRef}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        noClick
        noDrag
      >
        {({ file }: any) => (
          <aside
            style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}
          >
            <div className="browse-button">
              <Button variant="primary" onClick={handleOpenDialog}>
                Browse file
              </Button>
              <SplitButton
                id='dropdown-split-variants-Secondary'
                variant='secondary'
                title={button ? file.name: 'No File Selected'}
                disabled={!button}
              >
                <Dropdown.Item eventKey="1" onSelect={handleCasesFile}>Cases File</Dropdown.Item>
                <Dropdown.Item eventKey="2" onSelect={handleQuarantineFile}>Quarantine file</Dropdown.Item>
                <Dropdown.Item eventKey="3" onSelect={handleHealthFile}>Health Facilities File</Dropdown.Item>
              </SplitButton>
            </div>
          </aside>
        )}
      </CSVReader>
    </div>
  );
};
export default Admin;
