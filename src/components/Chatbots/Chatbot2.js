import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Message from "./Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faHeadset,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import GooglePalmService from "./GooglePalmService";
import {mockNames} from './MockData';
import ProductTable from "./LegalAndDutyTable";
let pdfUrl =
  "https://dotku.github.io/fin-rider/assets/pdfs/sampleManufactures.pdf";
const MY_API_KEY = "AZS8TvnMBRj6nChKYqTRsz";

function FileUploadSection({ handleClickUpload }) {
  return (
    <div className="file-upload-section" onClick={handleClickUpload}>
      Upload File
    </div>
  );
}

function SanctionsCheck({ handleClickCheck }) {
  return (
    <div className="file-upload-section" onClick={handleClickCheck}>
      Find HTSUS Code
    </div>
  );
}

function LegalRulingDutyRate({ handleDutyCheckClick }) {
  return (
    <div className="file-upload-section" onClick={handleDutyCheckClick}>
      Get Legal Check and Duty Rate
    </div>
  );
}

function Chatbot2({ invokeChat2, setInvokeChat2, chat2UploadButton,setProductTables }) {
  console.log("chat2UploadButton ?", chat2UploadButton);
  const uploadRef = useRef(null);

  function handleClickUpload() {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  }

  async function handleClickCheck() {
    let prev1 = allMessages;
    prev1.push(userLoadingBubble);
    setAllMessages([...prev1]);
    setTimeout(() => {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, 200);

    let companyCheckList = await myProcessAIPrompt(companyCheckInput);
    console.log("companyCheckList in chatbot2: ",companyCheckList);
    console.log(
      "companyCheckList:",
      companyCheckList.response.candidates[0].output
    );
    companyCheckList = companyCheckList.response.candidates[0].output;
    let checkResultDom = (
      <Message
        role={"user"}
        content={{ companyCheckMarkUp: companyCheckList }}
        others={{ setCompanyNames: setCompanyNames,setProductTables:setProductTables,
                  extraProductInfo:extraProductInfo }}

      />
    );

    let prev = allMessages;
    prev.pop();
    prev.push(checkResultDom);
    setAllMessages([...prev]);
    setTimeout(() => {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, 200);
  }

  async function handlcLegalCompliance() {
    console.log("checking handlcLegalCompliance.....");

    const prompt = `depends on each row of product name, write a pharagh for each 
    product, tell me if the product can import to the US?`;
    const data = "8517.12.0050";
    //const { data, prompt, source, product } = payload;
    /*let response = await GooglePalmService.generateMessage({
      messages: [{ content: `${prompt}` }],
    });*/
    let response = await fetch(
      `https://finai-server.deno.dev/fin-rider/chatgpt`,
      {
        method: "POST",
        body: JSON.stringify({
          messages: [
            { role: "system", content: data },
            {
              role: "user",
              content: prompt || "tell me the related ruling content",
            },
          ],
        }),
      }
    ).then((res) => res.json());
    console.log("handlcLegalCompliance", response);
    return response;
  }

  const { user, isAuthenticated } = useAuth0();

  let picture = user && user.picture;
  const bot2Prompt =
    "Hello, Now we are starting classification of goods. Please Upload your product information.";

  const styles = {
    transform: `translate(${invokeChat2 ? "0%,60%" : "130%,60%"})`,
  };

  //      transform: translate(130%,55%);

  const [fileUrl, setFileUrl] = useState("");
  const [companyCheckInput, setCompanyCheckInput] = useState(null);
  const [companyNames, setCompanyNames] = useState([]);
  const [legalAndDutyData, setLegalAndDutyData] = useState([]);
  const [extraProductInfo, setExtraProductInfo] = useState([]);

  const userLoadingBubble = (
    <Message role={"user"} others={{ loading: true }} />
  );

  const [allMessages, setAllMessages] = useState([
    <Message role={"bot"} content={{ text: bot2Prompt }} />,
  ]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file);
  };

  const handleFileUpload = async (selectedFile) => {
    if (selectedFile) {
      let prev1 = allMessages;
      if (prev1.length > 1) {
        prev1.pop();
      }
      prev1.push(userLoadingBubble);
      setAllMessages([...prev1]);
      setTimeout(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }, 200);

      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log("selectedFile", selectedFile);
      try {
        const response = await fetch(
          "https://www.filestackapi.com/api/store/S3?key=" + MY_API_KEY,
          {
            method: "POST",
            body: formData,
            headers: { "Content-Type": "application/pdf" },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log("Response Data:", responseData);

          const textURLResponse = await genPDF2textURL(responseData.url);
          let array = [];
          for (const block of textURLResponse.data.blocks) {
            console.log("block:--------",block);
            array = [...array, ...block.textlines];
          }
          console.log("upload product data:------------",array);

          function extractLastTwoValues(data) {
            const result = [];
          
            for (let i = 1; i < data.length; i++) {
              const parts = data[i].split(' ');
              const date = parts[parts.length - 2];
              let price = parts[parts.length - 1];
              if(!price.includes("$")){
                price = "$"+price;
              }
          
              result.push([date, price]);
            }
          
            return result;
          }

          let extraData = extractLastTwoValues(array);
          
          extraData.shift();
          extraData.unshift(["Date","Price(USD)"])
          console.log("extraData:", extraData);
          setExtraProductInfo(extraData);

          const companyListMessage = (
            <Message
              role={"user"}
              content={{ userPic: picture, companyList: array }}
      
            />
          );
          let prev = allMessages;
          prev.pop();
          prev.push(companyListMessage);
          setAllMessages([...prev]);
          setTimeout(() => {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }, 200);

          let productCheckInput = {
            source: "google",
            data: JSON.stringify(textURLResponse.data.blocks),
            prompt: `try your best, predict, gen US HTSUS heading result markdown 
            table with column:
            
              "Device Name", 
              "company name", 
              "manufacture origin", 
              "HTSUS Name"
              "HTSUS" 
            
            in capital case columns by using the items in the system. 
            HTSUS code should be full 10 digits in format like "1234.56.7890" 
            Sample of HTSUS Name would be "Mobile Phones", "Portable Automatic Data Processing Machines" and ect.`,
          };
          setCompanyCheckInput(productCheckInput);
        } else {
          // Handle errors
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  async function myProcessAIPrompt(payload) {
    const { data, prompt, source } = payload;
    let response = await GooglePalmService.generateText({
      text: `for data: ###${data}### ${prompt}`,
    });

    return {
      source,
      response,
    };
  }
  const processAIPrompt = async (payload) => {
    console.log("processAIPrompt called paypload", payload);
    const { data, prompt, source } = payload;
    let responce;
    switch (source) {
      case "google":
        console.log("into google");
        responce = await GooglePalmService.generateText({
          text: `for data: ###${data}### ${prompt}`,
        });
        break;
      default:
        console.log("into default");
        responce = await fetch(
          `https://finai-server.deno.dev/fin-rider/chatgpt`,
          {
            method: "POST",
            body: JSON.stringify({
              messages: [
                { role: "system", content: data },
                {
                  role: "user",
                  content: prompt,
                },
              ],
            }),
          }
        ).then((res) => res.json());
    }

    return {
      source,
      responce,
    };
  };

  async function processManufacturesCheck(url) {
    const genPDF2TextRsp = await genPDF2textURL(pdfUrl);
    const processAIPromptRsp = await processAIPrompt({
      data: JSON.stringify(genPDF2TextRsp.data.blocks),
      prompt:
        "get the list of manufactures from the pdf without any introduction",
    });

    const respond = processAIPromptRsp.responce.rsp.choices[0].message.content;
    console.log("processManufacturesCheck response: ", respond);
    return respond;
  }

  async function genPDF2textURL(url) {
    const res = await axios.post(`https://dk-api-proxy.deno.dev/parse/pdf`, {
      url,
    });

    console.log("genPDF2textURL", res);
    return res;
  }

  async function handleDutyEstimation(productDeviceNames) {
    const prompt =
      "what is the duty rate for importing this product to the US?";

    const promises = productDeviceNames.map(async (productDeviceName) => {
      const response = await GooglePalmService.generateText({
        text: `for product ${productDeviceName}, ${prompt}`,
      });
      console.log(`Response for ${productDeviceName}: `, response);
      return { productDeviceName, response };
    });

    const allResponses = await Promise.all(promises);
    return allResponses;
  }

  async function handleDutyCheckClick() {
    try {

    let prev = allMessages;
    prev.push(userLoadingBubble);
    setAllMessages([...prev]);
    setTimeout(() => {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, 200);
  
      let productNames = companyNames;
     //  productNames = mockNames;

      let canImportMessages = await processProductNames(productNames);
      console.log("canImportMessages: ", canImportMessages);
      
      canImportMessages = canImportMessages.map(item=>
        {
          let content = item.candidates[0].content;
          let match = ImportConditionCheckCell(content);
          return {
            match: match, content:content,
          }
        }
        )
       console.log("mapped :", ); 
       let index = 0;
       for(let item of canImportMessages){
        console.log(index, item);
        index++;
       }


      const responses = await handleDutyEstimation(productNames);

      //setLegalAndDutyData
      let tempArray = [];
      for (let i = 0; i < productNames.length; i++) {
        let object = {};
        object.name = productNames[i];
        object.duty = responses[i].response.candidates[0].output;
        object.importAllowed = canImportMessages[i].match!==null? "Yes":"No";
        object.importMessage =  canImportMessages[i].content;
        tempArray.push(object);
      }

      let tempAllMessage = allMessages;
      tempAllMessage.pop();

      let legalAndDutyResult = (
        <Message
          role={"user"}
          content={{ productTableData:tempArray }}   
          others={{setProductTables:setProductTables}}
        />
      );
      tempAllMessage.push(legalAndDutyResult); 
      setAllMessages([...tempAllMessage]);
      setTimeout(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }, 200);
      
       
      setLegalAndDutyData([...tempArray]);
      console.log("All responses: ", responses);
      console.log("tempArray: ", tempArray);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  
  function ImportConditionCheckCell(content) {   
    const regex = /yes/i;
    const match = regex.exec(content);    
    //console.log("Match? ", match);
    return match;
  }

  async function processProductNames(productNames) {

    let promiseArray = [];
    for(let item of productNames){
      promiseArray.push(canImport(item));
    }

    try {
          let result = await Promise.all(promiseArray);
           console.log("final result: ", result);
      return result;
    } catch (error) {
      // Handle errors if any of the promises are rejected
      console.error(error);
    }
   
  }
  async function canImport(productName) {
    const prompt = `can ${productName} import to the US?`;

    let response = await GooglePalmService.generateMessage({
      messages: [{ content: `${prompt}` }],
    });

    return response;
    //console.log(response);
  }

  const [isHover, setIsHover] = useState(false);
  const containerRef = useRef(null);

  let ActionButton ;
  if(chat2UploadButton==="item1"){
    ActionButton = <FileUploadSection handleClickUpload={handleClickUpload} />;
  }
  else if(chat2UploadButton==="item2"){
    ActionButton =  <SanctionsCheck handleClickCheck={handleClickCheck} />;
  }
  else {
    ActionButton =  <LegalRulingDutyRate handleDutyCheckClick={handleDutyCheckClick} />;
  }

  return (
    <div className="chatbot-2-container" style={styles}>
      <button
        className="chatbot-1-close" 
        onClick={() => {
          setInvokeChat2(false);
        }}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        <FontAwesomeIcon
          icon={faXmark}
          style={{ color: isHover ? "#2d3436" : "#bdc3c7", fontSize: "50px",}}
        />
      </button>
      <div className="chat-container" ref={containerRef}>
        {allMessages.map((item) => {
          return item;
        })}
        {ActionButton}
       {/** <button onClick={handleDutyCheckClick}>Duty check</button>*/} 
      </div>

      {
        <div className="upload-invisible">
          Chatbot1
          <input type="file" onChange={handleFileChange} ref={uploadRef} />
          <button onClick={handleFileUpload}>Upload</button>
          <button onClick={() => genPDF2textURL(pdfUrl)}>
            get company names
          </button>
        </div>
      }
    </div>
  );
}

export default Chatbot2;
