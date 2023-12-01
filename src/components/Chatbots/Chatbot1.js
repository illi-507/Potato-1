import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Message from "./Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import GooglePalmService from "./GooglePalmService";

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

function SanctionsCheck({handleClickCheck}){
  return (
    <div className="file-upload-section" onClick={handleClickCheck}>
      Sanctions Check
    </div>
  );
}

function Chatbot1({ invokeChat1, setInvokeChat1,chat1UploadButton,setProductTables}) {
  const uploadRef = useRef(null);

  function handleClickUpload() {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  }

  async function handleClickCheck(){
    let prev1 = allMessages;
    prev1.push(userLoadingBubble);
    setAllMessages([...prev1]);
    setTimeout(()=>{containerRef.current.scrollTop = containerRef.current.scrollHeight;},200);
    
    let companyCheckList = await myProcessAIPrompt(companyCheckInput);
    console.log("companyCheckList",companyCheckList);
   // console.log("companyCheckList:",companyCheckList.response.candidates[0].output);
    companyCheckList = companyCheckList.response.candidates[0].output;
    console.log("companyCheckList",companyCheckList);
    let checkResultDom =  
     <Message role={"user"} 
     content={{companyCheckMarkUp: companyCheckList }}
     others={{ setProductTables:setProductTables}} />

     let prev = allMessages;
     prev.pop();
     prev.push(checkResultDom);
     setAllMessages([...prev]);
     setTimeout(()=>{containerRef.current.scrollTop = containerRef.current.scrollHeight;},200);

  }

  const { user, isAuthenticated } = useAuth0();

  let picture = user && user.picture;
  const bot1Prompt =
    "Please upload your supplier information here , any forms description, photocopy would work.";

  const styles = {
    transform: `translateX(${invokeChat1 ? "0%" : "130%"})`,
  };
  const [fileUrl, setFileUrl] = useState("");
   const [companyCheckInput, setCompanyCheckInput] = useState(null);

  const userLoadingBubble = (
    <Message role={"user"} others={{ loading: true }} />
  );

  const [allMessages, setAllMessages] = useState([
    <Message role={"bot"} content={{ text: bot1Prompt }} />,
  ]);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
      handleFileUpload(file);    
  };

  const handleFileUpload = async (selectedFile) => {
    if (selectedFile) {
   
      let prev1 = allMessages;
      if(prev1.length>1){
        prev1.pop();
      }
      prev1.push(userLoadingBubble);
      setAllMessages([...prev1]);
      setTimeout(()=>{containerRef.current.scrollTop = containerRef.current.scrollHeight;},200);

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
            array = [...array, ...block.textlines];
          }        

        
          const companyListMessage = (
            <Message role={"user"} content={{ userPic:picture, companyList: array }} />
          );
          let prev = allMessages;
          prev.pop();
          prev.push(companyListMessage);
          setAllMessages([...prev]);
          setTimeout(()=>{containerRef.current.scrollTop = containerRef.current.scrollHeight;},200);

            let companyCheckInput = 
          {
            source: "google",
            data: JSON.stringify(textURLResponse.data.blocks),
            prompt: `For each organization item in the list, try your best, 
              generate a table with the following columns: "company name, 
              country, status", status for entity sanction checking with result 
              of "pass", "failed" or "Limited". For Huawei, it should be failed, 
              and Lenovo would be limited.`,
          }

          console.log("companyCheckInput", companyCheckInput);

          setCompanyCheckInput(companyCheckInput);       

        } else {
          // Handle errors
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  async function myProcessAIPrompt(payload){
    const { data, prompt, source } = payload;
    let response = await GooglePalmService.generateText({
      text: `for data: ###${data}### ${prompt}`,
    });

    return {
      source, response
    }
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

  console.log("fileUrl : ", fileUrl);

  async function genPDF2textURL(url) {
    const res = await axios.post(`https://dk-api-proxy.deno.dev/parse/pdf`, {
      url,
    });

    console.log("genPDF2textURL", res);
    return res;
  }

  const [isHover, setIsHover] = useState(false);
  const containerRef = useRef(null);

  return (
    <div className="chatbot-1-container" style={styles} >
   {/*  <div className="chatbot-background-overlay"></div>*/}
      <button
        className="chatbot-1-close"
        onClick={() => {
          setInvokeChat1(false);
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
          style={{ color: isHover ? "#2d3436" : "#bdc3c7", fontSize: "50px" }}
        />
      </button>
      <div className="chat-container" ref={containerRef}>
        {allMessages.map((item) => {
          return item;
        })}
        {chat1UploadButton?
          <FileUploadSection handleClickUpload={handleClickUpload} />:
           <SanctionsCheck handleClickCheck={handleClickCheck}/>}
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

export default Chatbot1;
