import React, { useState, useEffect } from "react";

import "./Admin.scss";

import { CSVReader } from "react-papaparse";
import {
  Button,
  Alert,
  SplitButton,
  Dropdown,
  DropdownButton
} from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { sendProvinceData } from "../../shared/server-api/api";
import { PROVINCES } from "./provinces";

const Admin: React.FC<any> = () => {
  const buttonRef: any = React.createRef();
  const [alert, setAlert] = useState(false);
  const [button, setButton] = useState(false);
  const [alertHeading, setAlertHeading] = useState(
    "File uploaded successfully!"
  );
  const [fileData, setIsFileData]: any = useState([]);
  const [parsedObject, setParsedObject]: any = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProvince, setSelectedProvince] = useState("Select Province");

  useEffect(() => {
    if (Object.keys(parsedObject).length !== 0) {
      sendProvinceData(selectedProvince, parsedObject).then(res => {});
    }
  });

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleSelectedProvince = (eventKey: any, event: Object) => {
    switch (eventKey) {
      case "1":
        setSelectedProvince(PROVINCES.Federal);
        break;
      case "2":
        setSelectedProvince(PROVINCES.Punjab);
        break;
      case "3":
        setSelectedProvince(PROVINCES.KP);
        break;
      case "4":
        setSelectedProvince(PROVINCES.Sindh);
        break;
      case "5":
        setSelectedProvince(PROVINCES.Balochistan);
        break;
      case "6":
        setSelectedProvince(PROVINCES.AJK);
        break;
      case "7":
        setSelectedProvince(PROVINCES.FATA);
        break;
    }
  };

  const formatDate = (date: any) => {
    let formatted_date =
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    return formatted_date;
  };

  const handleOnFileLoad = (data: any) => {
    setIsFileData(data);
    setButton(true);
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    // console.log(err);
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
    for (var j = 0; j < fileData[0].data.length; j++) {
      if (row[j].length === 0) {
        resultingRow[fileData[0].data[j].toLowerCase()] = "0";
      } else {
        resultingRow[fileData[0].data[j].toLowerCase()] = row[j];
      }
    }
    return resultingRow;
  };

  const parseFile = (eventKey: any, event: Object) => {
    if (fileData) {
      let resultingObject: any = {};
      let reports: any = [];
      for (var i = 1; i < fileData.length; i++) {
        if (fileData[i].data.length > 1) {
          reports.push(createRow(fileData[i].data));
        }
      }
      resultingObject["report"] = JSON.stringify(reports);
      resultingObject["date"] = new Date(formatDate(selectedDate)).getTime();
      setParsedObject(resultingObject);
    }
  };

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
              <DropdownButton
                id="dropdown-basic-button"
                className="province-dropdown"
                variant="secondary"
                title="Select Province"
              >
                <Dropdown.Item eventKey="1" onSelect={handleSelectedProvince}>
                  Federal
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" onSelect={handleSelectedProvince}>
                  Punjab
                </Dropdown.Item>
                <Dropdown.Item eventKey="3" onSelect={handleSelectedProvince}>
                  KP
                </Dropdown.Item>
                <Dropdown.Item eventKey="4" onSelect={handleSelectedProvince}>
                  Sindh
                </Dropdown.Item>
                <Dropdown.Item eventKey="5" onSelect={handleSelectedProvince}>
                  Balochistan
                </Dropdown.Item>
                <Dropdown.Item eventKey="6" onSelect={handleSelectedProvince}>
                  AJK
                </Dropdown.Item>
                <Dropdown.Item eventKey="7" onSelect={handleSelectedProvince}>
                  FATA
                </Dropdown.Item>
              </DropdownButton>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange} //only when value has changed
              />
              <SplitButton
                id="dropdown-split-variants-Secondary"
                variant="secondary"
                title={button ? file.name : "No File Selected"}
                disabled={!button}
              >
                <Dropdown.Item eventKey="1" onSelect={parseFile}>
                  Cases File
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" onSelect={parseFile}>
                  Quarantine file
                </Dropdown.Item>
                <Dropdown.Item eventKey="3" onSelect={parseFile}>
                  Health Facilities File
                </Dropdown.Item>
              </SplitButton>
            </div>
          </aside>
        )}
      </CSVReader>
    </div>
  );
};
export default Admin;
