
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var Main = function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main(props) {
    _classCallCheck(this, Main);

    var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

    _this.state = {
      testVar: 1,
      focusPosition: 1

    };
    _this.function1 = _this.function1.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    return _this;
  }

  _createClass(Main, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log('componentDidMount function triggered!');
      document.addEventListener('keydown', this.handleKeyPress);
    }
  }, {
    key: 'function1',
    value: function function1() {
      console.log('function1 triggered');
      console.log(this.state.testVar);
      this.setState({
        testVar: this.state.testVar + 1,
        focusPosition: this.state.focusPosition + 1
      });
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(e) {
      console.log(e.keyCode);
      var action;
      //Don't for get to put a BREAK after every case OR it will
      //Fall through like it does below.
      switch (e.keyCode) {
        case 13: // Select / Enter
        case 48: // 0
        case 49: // 1
        case 50: // 2
        case 51: // 3
        case 52: // 4
        case 53: // 5
        case 54: // 6
        case 55: // 7
        case 56: // 8
        case 57: // 9
        case 79: // Info
        case 87: // Rewind Trick play
        case 9: // FF Trick play
        case 65: //Active
        case 67: // Next Trick play
        case 72: // red
        case 74: // green
        case 75: // yellow
        case 76: // blue
        case 80: // Play Trick play
        case 82: // Record Trick play
        case 83: // Stop Trick play
        case 85: // Pause Trick play
        case 46: // Back Trick play
        case 37:
          //left
          console.log('left triggered');
          action = 'left';
          break;
        case 33: //pageup channelUp
        case 34: //pagedown channelDown
        case 38: //up
        case 39:
          //right
          console.log('right triggered');
          action = 'right';
          break;
        case 40: //down
        case 47: //back
        case 189: //dash
        default:
          action = 'none';
          break;

      }
      if (action = 'right' && this.state.focusPosition < 2) {
        this.setState({
          focusPosition: this.state.focusPosition + 1
        });
      } else {
        this.setState({
          focusPosition: 1
        });
      }

      // return false prevents keys from bubbling to UI
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'containerMain' },
        React.createElement(
          'button',
          { className: this.state.focusPosition == 1 ? 'button-highlighted' : 'button-inactive', onClick: this.function1 },
          'Donate'
        ),
        React.createElement(
          'button',
          { className: this.state.focusPosition == 2 ? 'button-highlighted' : 'button-inactive' },
          'Exit'
        )
      );
    }
  }]);

  return Main;
}(React.Component);

var domContainer = document.querySelector('#react_main_container');
ReactDOM.render(React.createElement(Main, null), domContainer);