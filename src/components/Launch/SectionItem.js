import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faUser,
  faUserDoctor,
  faBrush,
  faListUl,
  faBriefcase,
  faStar,
  faChartSimple
} from "@fortawesome/free-solid-svg-icons";

function SectionItem({
  title,
  color,
  border,
  setInvokeChat1,
  setChat1UploadButton,
  setInvokeChat2,
  setChat2UploadButton,
  setShowOverlay,
}) {
  const styles = {
    backgroundColor: color,
    border: "3px solid " + border,
    boxShadow: "0 20px 20px " + color,
  };

  let Icon = useRef(faUser);
  let rotation = useRef(0);
 /* useEffect(() => {
    initialization();
  },[]);*/
  initialization();
  function initialization() {
    switch (title) {
      case "Sanctions Check":
        break;

      case "Upload Products Doc":
        Icon.current = faUserDoctor;
        console.log("into doctor: ---");
        break;
      case "Finding HTSUS Code":
        Icon.current = faBrush;
       // rotation.current = 180;
        break;

      case "Legal Ruling Check and Duty Rate Calculation":
        Icon.current = faListUl;
        break;

      case "Commercial Invoice":
        Icon.current = faUserDoctor;
        break;

      case "Bill of Landing":
        Icon.current = faBrush;
     //   rotation.current = 180;
        break;

      case "IFS Form":
        Icon.current = faBriefcase;
        break;
      case "UCCBP Form 7501":
        Icon.current = faStar;
        break;

      case "Export the Results to Pdf":
        Icon.current = faChartSimple;
        break;
      default:
        console.log("a general item");
        break;
    }
  }

  function handleItemClick(title) {
    switch (title) {
      case "Sanctions Check":
        setInvokeChat1(true);
        setChat1UploadButton && setChat1UploadButton(false);
        break;

      case "Upload Products Doc":
        setInvokeChat2(true);
        setChat2UploadButton && setChat2UploadButton("item1");

        console.log("into doctor: ---");
        console.log("Upload Products Doc setChat2UploadButton true");
        break;
      case "Finding HTSUS Code":
        setInvokeChat2(true);
        setChat2UploadButton && setChat2UploadButton("item2");
        console.log("Finding HTSUS Code setChat2UploadButton true");
        break;

      case "Legal Ruling Check and Duty Rate Calculation":
        setInvokeChat2(true);
        setChat2UploadButton && setChat2UploadButton("item3");
        console.log(
          "Legal Ruling Check and Duty Rate Calculation setChat2UploadButton true"
        );
        break;

      case "Export the Results to Pdf":
        setShowOverlay(true);
        break;
      default:
        console.log("a general item");
        break;
    }
  }

  return (
    <div
      className="section-item"
      /* style={styles}*/
      onClick={() => handleItemClick(title)}
    >
      <div className="seciton-item-icon">
        <FontAwesomeIcon
          icon={Icon.current}
          rotation={rotation.current}
          style={{ color: "#80DEEA", fontSize: "50px" }}
        />
      </div>
      {title}
    </div>
  );
}

export default SectionItem;
