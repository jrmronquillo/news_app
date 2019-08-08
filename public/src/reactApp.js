
'use strict';

const e = React.createElement;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testVar: 1,
      focusPosition: 1, 

      };
    this.function1 = this.function1.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount(){
    console.log('componentDidMount function triggered!');
    document.addEventListener('keydown', this.handleKeyPress);
  }
  
  function1(){
  	console.log('function1 triggered');
    console.log(this.state.testVar);
    this.setState({
      testVar: this.state.testVar + 1,
      focusPosition: this.state.focusPosition +1,
    })
  }

  handleKeyPress(e){
    console.log(e.keyCode);
      var action;
      //Don't for get to put a BREAK after every case OR it will
      //Fall through like it does below.
      switch(e.keyCode){
        case 13: // Select / Enter
        case 48 : // 0
        case 49 : // 1
        case 50 : // 2
        case 51 : // 3
        case 52 : // 4
        case 53 : // 5
        case 54 : // 6
        case 55 : // 7
        case 56 : // 8
        case 57 : // 9
        case 79 : // Info
        case 87 : // Rewind Trick play
        case 9 : // FF Trick play
        case 65 : //Active
        case 67 : // Next Trick play
        case 72 : // red
        case 74 : // green
        case 75 : // yellow
        case 76 : // blue
        case 80: // Play Trick play
        case 82 : // Record Trick play
        case 83 : // Stop Trick play
        case 85 : // Pause Trick play
        case 46 : // Back Trick play
        case 37: //left
          console.log('left triggered');
          action='left';
          break;
        case 33: //pageup channelUp
        case 34: //pagedown channelDown
        case 38: //up
        case 39: //right
          console.log('right triggered');
          action='right';
          break;
        case 40: //down
        case 47: //back
        case 189 : //dash
        default :
          action = 'none';
          break;

      }
      if (action='right' && this.state.focusPosition < 2){
        this.setState({
          focusPosition: this.state.focusPosition +1,
        });
      } else {
        this.setState({
          focusPosition: 1,
        });
      }

      // return false prevents keys from bubbling to UI
      return false;
    }



  render(){
  	return(
  		<div className="containerMain">
  			<button className={this.state.focusPosition == 1 ? 'button-highlighted' : 'button-inactive'} onClick={this.function1}>Donate</button>
        <button className={this.state.focusPosition == 2 ? 'button-highlighted' : 'button-inactive'}>Exit</button>
  		</div>
  	)
  }
}


const domContainer = document.querySelector('#react_main_container');
ReactDOM.render(< Main />, domContainer);