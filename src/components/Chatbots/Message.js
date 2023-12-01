import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import ProductTable from "./LegalAndDutyTable";
function ChatBubble({ role, content, others }) {
  console.log("in ChatBubble: ", content && content.companyList);
  let borderColor = "";
  let fontColor = "";

  if (role === "bot") {
    borderColor = "40px solid #ecf0f1";
    fontColor = "black";
  } else {
    borderColor = "40px solid #3498db";
    fontColor = "white";
  }

  if (content && content.companyList && others && others.setProductTables) {
    let setTables = others.setProductTables;
    let tableContent = content.companyList.map((item, index) => {
      return <div key={index}>{item}</div>;
    });
    setTables((prev) => {
      return [...prev, tableContent];
    });
  }

  if (
    content &&
    content.companyCheckMarkUp &&
    others &&
    others.setProductTables &&
    others.extraProductInfo
  ) {
    let setTables = others.setProductTables;

    let tableContent = (
      <CompanyTable
        extraData={others.extraProductInfo}
        tableBorderColor="black"
        inputString={content.companyCheckMarkUp}
        setCompanyNames={
          others && others.setCompanyNames && others.setCompanyNames
        }
      />
    );

    setTables((prev) => {
      return [...prev, tableContent];
    });
  } else if (
    content &&
    content.companyCheckMarkUp &&
    others &&
    others.setProductTables
  ) {
    let setTables = others.setProductTables;

    let tableContent = (
      <CompanyTable
        tableBorderColor="black"
        inputString={content.companyCheckMarkUp}
        setCompanyNames={
          others && others.setCompanyNames && others.setCompanyNames
        }
      />
    );

    setTables((prev) => {
      return [...prev, tableContent];
    });
  }

  if (
    content &&
    content.productTableData &&
    others &&
    others.setProductTables
  ) {
    let setTables = others.setProductTables;
    let tableContent = <ProductTable products={content.productTableData} />;
    setTables((prev) => {
      return [...prev, tableContent];
    });
  }

  return (
    <div
      className="chat-bubble"
      style={{
        marginBottom: role === "user" && "50px",
        backgroundColor: role === "bot" ? "#ecf0f1" : "#3498db",
        color: fontColor,
      }}
    >
      <div
        className="chat-bubble-triangle"
        style={{ borderBottom: borderColor, color: fontColor }}
      ></div>
      {content && typeof content.text === "string" && content.text}
      {content &&
        content.companyList &&
        content.companyList.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      {content && content.companyCheckMarkUp && (
        <CompanyTable
          inputString={content.companyCheckMarkUp}
          setCompanyNames={
            others && others.setCompanyNames && others.setCompanyNames
          }
        />
      )}

      {content && content.productTableData && (
        <ProductTable products={content.productTableData} />
      )}

      {others && others.loading && <p className="loading"></p>}
    </div>
  );
}

const CompanyTable = ({
  inputString,
  setCompanyNames,
  tableBorderColor,
  extraData,
}) => {
  const rows = inputString.split("\n");
  console.log("table rows: ", rows);
  let companyNames = [];
  let extraDataIndex = 0;
  const table = (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        marginBottom: "40px",
        maxWidth:"80vw"
      }}
    >
      {rows.map((row, rowIndex) => {
        let cells = row
          .split("|")
          .map((cell) => cell.trim())
          .filter(Boolean)
          .filter((cell) => /[a-zA-Z0-9]/.test(cell));
      
        if (cells.length && extraData && extraData.length &&extraData[extraDataIndex]) {
          console.log("INTO PUSHING~--------",extraData[extraDataIndex], extraDataIndex );
          cells = [...cells, ...extraData[extraDataIndex]];
          extraDataIndex++;
        }

        console.log("cells: ", cells);


        const Element = rowIndex === 0 ? "th" : "td";
        let temp = cells[0];
        if (
          temp !== undefined &&
          !temp.includes("Heading") &&
          temp !== "Device Name"
        ) {
          companyNames.push(cells[0]);
        }
       
        if( !temp ||
           temp.includes("Heading") ){
            return;
          }
        return (
          <tr key={rowIndex}>
            {cells.map((cell, cellIndex) => (
              <Element
                key={cellIndex}
                style={{
                  border: tableBorderColor
                    ? "1px solid black"
                    : "1px solid white",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {cell}
              </Element>
            ))}
          </tr>
        );
      })}
    </table>
  );

  console.log("companyNames in bubble: ", companyNames);
  setCompanyNames && setCompanyNames([...companyNames]);
  return <div>{table}</div>;
};

function Message({ role, content, others }) {
  const { user } = useAuth0();

  return (
    <div className="message-container">
      <div className="bot-icon">
        {role === "bot" ? (
          <FontAwesomeIcon
            icon={faUser}
            style={{ color: "#e1b12c", fontSize: "60px", padding: "20px" }}
          />
        ) : (
          <img
            className="user-logo123"
            src={user && user.picture}
            alt={content && content.userPic}
          />
        )}
      </div>
      <ChatBubble content={content} role={role} others={others} />
    </div>
  );
}

export default Message;
