import React, { useState } from 'react'; 
import { Document, Page,pdfjs } from 'react-pdf'; 
import './pdf.css';


export default function Test(url) { 
//let pdf = require(url.url)
pdfjs.GlobalWorkerOptions.workerSrc = 
`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 
const [numPages, setNumPages] = useState(null); 
const [pageNumber, setPageNumber] = useState(1); 

/*To Prevent right click on screen*/
document.addEventListener("contextmenu", (event) => { 
	event.preventDefault(); 
}); 
	
/*When document gets loaded successfully*/
function onDocumentLoadSuccess({ numPages }) { 
	setNumPages(numPages); 
	setPageNumber(1); 
} 

function changePage(offset) { 
	setPageNumber(prevPageNumber => prevPageNumber + offset); 
} 

function previousPage() { 
	changePage(-1); 
} 

function nextPage() { 
	changePage(1); 
} 
console.log(url)
return ( 
	<> 
	{url.url.toString()}
	<div className="main"> 
	<Document 
		file={"./uploads/" +url.url} 
		onLoadSuccess={onDocumentLoadSuccess} 
	> 
	<Page pageNumber={pageNumber} /> 
	</Document>  
	</div> 
	</> 
); 
}
