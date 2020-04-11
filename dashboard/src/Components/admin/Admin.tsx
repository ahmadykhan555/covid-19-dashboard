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

  const createRow = (row: any) => {
    const resultingRow: any = {};
    // const tempRow: any = {};
    for (var j=0; j<fileData[0].data.length; j++) {
      if (row[j].length === 0) {
        resultingRow[fileData[0].data[j].toLowerCase()] = '0';
      } else {
        resultingRow[fileData[0].data[j].toLowerCase()] = row[j];
      }
    }
    // resultingRow['reports'] = tempRow;
    // resultingRow['date'] = Date.now();
    return resultingRow;
  }

  const parseFile = (eventKey: any, event: Object) => {
    if (fileData) {

      for (var i=1; i<fileData.length; i++) {
        if (fileData[i].data.length > 1) {
          setParsedObject(parsedObject.push(createRow(fileData[i].data)));
        }
      }
      console.log(parsedObject);

    }

  }

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
                <Dropdown.Item eventKey="1" onSelect={parseFile}>Cases File</Dropdown.Item>
                <Dropdown.Item eventKey="2" onSelect={parseFile}>Quarantine file</Dropdown.Item>
                <Dropdown.Item eventKey="3" onSelect={parseFile}>Health Facilities File</Dropdown.Item>
              </SplitButton>
            </div>
          </aside>
        )}
      </CSVReader>
    </div>
  );
};
export default Admin;
