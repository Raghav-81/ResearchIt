import React , {Component , useState} from "react"
import "./Trending.css"
import { Button ,ButtonGroup , ToggleButton ,InputGroup , FormControl} from "react-bootstrap"
import { Topics } from "./cards.js"
import  { Papers } from "./cards.js"
import { Researchers} from "./cards.js"
import ReactDOM from "react-dom"

function Button_Toggle() {
  const [radioValue, setRadioValue] = useState('1');
  const radios = [
    { name: 'Trending Topics', value: '1' },
    { name: 'Trending Papers', value: '2' },
    { name: 'Trending Researchers', value: '3'},
  ];
  if(radioValue == '1'){
	  return (
	    <>
	      <br />
	      <ButtonGroup toggle>
	        {radios.map((radio, idx) => (
	          <ToggleButton
	            key={idx}
	            type="radio"
	            variant="success"
	            name="radio"
	            size= "lg"
	            value={radio.value}
	            checked={radioValue === radio.value}
	            onChange={(e) => setRadioValue(e.currentTarget.value)}
	          >
	            {radio.name}
	          </ToggleButton>
	        ))}
	      </ButtonGroup>
	      <br />
	      <br />
	      <br />
	      <div id = "cards">
					<Topics />
	  	  </div>
	    </>
	  );
  }
  else if(radioValue == '2'){
  	return (
	    <>
	      <br />
	      <ButtonGroup toggle>
	        {radios.map((radio, idx) => (
	          <ToggleButton
	            key={idx}
	            type="radio"
	            variant="success"
	            name="radio"
	            size= "lg"
	            value={radio.value}
	            checked={radioValue === radio.value}
	            onChange={(e) => setRadioValue(e.currentTarget.value)}
	          >
	            {radio.name}
	          </ToggleButton>
	        ))}
	      </ButtonGroup>
	      <br />
	      <br />
	      <br />
	      <div id = "cards">
			<Papers />
	  	  </div>
	    </>
	  );
  }
  else if(radioValue=='3'){
  	return(
  		<>
	      <br />
	      <ButtonGroup toggle>
	        {radios.map((radio, idx) => (
	          <ToggleButton
	            key={idx}
	            type="radio"
	            variant="success"
	            name="radio"
	            size= "lg"
	            value={radio.value}
	            checked={radioValue === radio.value}
	            onChange={(e) => setRadioValue(e.currentTarget.value)}
	          >
	            {radio.name}
	          </ToggleButton>
	        ))}
	      </ButtonGroup>
	      <br />
	      <br />
	      <br />
	      <div id = "cards">
			<Researchers />
	  	  </div>
	    </>
	   )
  	}
}
class Trending extends Component{
	render(){
		return(
			<div className = "trending">
				<InputGroup className="mb-3" size = "lg" bg="dark">
    				<FormControl
					    placeholder="Search for a paper , topic or researcher"
					    aria-label="search"
					    aria-describedby="basic-addon2"
					/>
    				<InputGroup.Append>
      					<Button style={{color:"white"}} variant="outline-success">Search</Button>
    				</InputGroup.Append>
  				</InputGroup>
				<br />
				<br />
				<Button_Toggle radio = '1'/>
	  		</div>
		)
	}
}
export default Trending;
