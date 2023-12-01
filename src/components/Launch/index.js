import React, { useState } from "react";
import SectionTitle from "./SectionTitle";
import UploadSupplier from "./UploadSupplier";
import SectionItem from "./SectionItem";
import Chatbot1 from "../Chatbots/Chatbot1";
import { Link } from "react-router-dom";
import Chatbot2 from "../Chatbots/Chatbot2";
import ResultTables from "./ResultTables";

function LaunchPage({ buttonRef }) {
  const [invokeChat1, setInvokeChat1] = useState(false);
  const [invokeChat2, setInvokeChat2] = useState(false);
  const [chat1UploadButton, setChat1UploadButton] = useState(true);
  const [chat2UploadButton, setChat2UploadButton] = useState(true);

  const [showOverlay, setShowOverlay] = useState(false);
  const [showMessage, setShowMessage] = useState(false);


  const handleButtonClick = () => {
    // Your export logic here (e.g., exporting to PDF)
    // For the sake of this example, we'll simulate a delay using setTimeout
    setShowMessage(false); // Reset the message state
    setShowOverlay(false); // Close the overlay
    setTimeout(() => {
      setShowMessage(true); // Show the success message after 1 second
    }, 1000);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
    setShowMessage(false); // Reset the message state if the overlay is closed
  };

  const[productTables, setProductTables] = useState([]);


  console.log("productTables///////////////", productTables);
  return (
    <div className="launch-container">
      <SectionTitle title="Supplier Manager" />
      <div className="section-item-container">
        <UploadSupplier
          setInvokeChat1={setInvokeChat1}
          setChat1UploadButton={setChat1UploadButton}
        />
        <SectionItem
          title="Sanctions Check"
          color="#feca57"
          border="#ffa801"
          setInvokeChat1={setInvokeChat1}
          setChat1UploadButton={setChat1UploadButton}
        />
        <Link to={"/"} ref={buttonRef} className="home-link">
          Home
        </Link>
      </div>
      <Chatbot1
        invokeChat1={invokeChat1}
        setInvokeChat1={setInvokeChat1}
        chat1UploadButton={chat1UploadButton}
        setProductTables={setProductTables}
       //</div> setProductTables={setProductTables}
      ></Chatbot1>
      <SectionTitle
        title="Product Planning Expert"
        backgroundColor="#ffcccc"
        boxShadow="0 0 30px #ffcccc"
      />
      <div className="section-item-container">
        <SectionItem
          title="Upload Products Doc"
          color="#E1BEE7"
          border="#CE93D8"
          setInvokeChat2={setInvokeChat2}
          setChat2UploadButton={setChat2UploadButton}
        />
        <SectionItem
          title="Finding HTSUS Code"
          color="#E1BEE7"
          border="#CE93D8"
          setInvokeChat2={setInvokeChat2}
          setChat2UploadButton={setChat2UploadButton}
        />
        <SectionItem
          title="Legal Ruling Check and Duty Rate Calculation"
          color="#E1BEE7"
          border="#CE93D8"
          setInvokeChat2={setInvokeChat2}
          setChat2UploadButton={setChat2UploadButton}
        />
        <Chatbot2
          invokeChat2={invokeChat2}
          setInvokeChat2={setInvokeChat2}
          chat2UploadButton={chat2UploadButton}
          setProductTables={setProductTables}

        ></Chatbot2>
      </div>

      <SectionTitle
        title="Customer Expert"
        backgroundColor="#dff9fb"
        boxShadow="0 0 30px #dff9fb"
      />
      <div className="section-item-container">
        <SectionItem
          title="Commercial Invoice"
          color="#80DEEA"
          border="#81ecec"
        />
        <SectionItem
          title="Bill of Landing"
          color="#80DEEA"
          border="#81ecec"
        />
        <SectionItem
          title="IFS Form"
          color="#80DEEA"
          border="#81ecec"
        />
        <SectionItem
          title="UCCBP Form 7501"
          color="#80DEEA"
          border="#81ecec"
        />
      </div>

      <SectionTitle
        title="Analytics Expert"
        backgroundColor="#FFCDD2"
        boxShadow="0 0 30px #FFCDD2"
      />
      <div className="section-item-container">
        <SectionItem
          title="Export the Results to Pdf"
          color="#FFCCBC"
          border="#FFAB91"
          setShowOverlay={setShowOverlay}
        />
        {showOverlay && (
          <ResultTables  handleOverlayClose = {handleOverlayClose} 
           handleButtonClick = {handleButtonClick} showMessage ={showMessage}
           productTables={productTables}
          />
         )}
      </div>
      <div style={{ height: "50px" }}></div>
    </div>
  );
}

export default LaunchPage;
