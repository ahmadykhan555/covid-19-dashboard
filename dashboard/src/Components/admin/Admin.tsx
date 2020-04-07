import React, { useState } from "react";

import "./Admin.scss";

import { CSVReader } from "react-papaparse";
import { Button, Alert } from "react-bootstrap";

const Admin: React.FC<any> = () => {
  const buttonRef: any = React.createRef();

  const [is_uploaded, setIsUploaded] = useState(false);
  const handleOnFileLoad = (data: any) => {
    setIsUploaded(true);
    console.log(data);
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err);
  };
  const alert = is_uploaded ? (
    <div>
      <Alert variant="success">
        <Alert.Heading>File uploaded successfully!</Alert.Heading>
      </Alert>
    </div>
  ) : null;

  const handleOpenDialog = (e: any) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  return (
    <div className="admin">
      {alert}
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
                Browe file
              </Button>
            </div>
          </aside>
        )}
      </CSVReader>
    </div>
  );
};
export default Admin;
