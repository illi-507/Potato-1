import React, {useRef}from 'react'
import JsPDF from 'jspdf';
function ResultTables({handleOverlayClose,handleButtonClick, showMessage,productTables}) {
     const pdfRef = useRef();
      const generatePDF = () => {
        const report = new JsPDF('landscape', 'pt', 'a2');
        report.html(document.querySelector('#html-to-export'), {
          callback : function (pdf) {
              pdf.save("a4.pdf");
          },
          margin: [20, 20, 20, 30]
      });
      }

  return (
    <div className="overlay" onClick={handleOverlayClose} ref = {pdfRef}>
            <div
              className="overlay-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="export-page" id="html-to-export"onClick={handleButtonClick}>
                <div className='export-title'>
                    My Dashboard
                </div>
                <div className='export-heading'>
                    A. Product Description + Supplier Screening
                </div>
                   {productTables[0]}
                <div className='export-heading'>
                    B. Classification Results
                </div>
                    {productTables[1]}
                <div className='export-heading'>
                    C. Compliance Results
                </div>
                  {productTables[2]}
              </div>
              {showMessage && (
                <p className="success-message">Export succeeded!</p>
              )}
              <button onClick={generatePDF}>Click To Export To Pdf </button>
              
            </div>
          </div>
        
  )
}

export default ResultTables
