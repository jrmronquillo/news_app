


//Application specific code
//window.onload = setPig;

window.onload = main;
//window.onload = initFunction;



//window.onkeydown = Controller;
function View(controller){
	console.log('view initatied----------------------->');
    this.controller = controller;
    var self = this;
    this.controller.loadNewsData();
    this.controller.loadESPNData();


    setInterval(function(){
      self.controller.loadESPNData();
      self.controller.loadNewsData();
    }, 60000);

    // the function below will fail on chrome browser 
    this.controller.setPig();



    
    //pull data every minute (60,000 milliseconds)
    //setInterval(function(){
    //self.controller.jsonREQUEST('http://10.23.223.38/rssTest', self.controller.dataIngestor2);
    // 	document.getElementById('canvas-data').appendChild(this.controller.getNewsData());
    // 	}, 300000);

  

    setInterval(this.controller.timer, 1000);

    // set default highlight
    var dataItems = document.getElementById('data-list');
    console.log(dataItems);
    console.log('dataItems children collection: '+dataItems.children);
    

    var downIndicator = document.getElementById('down-indicator');
    var downSpan = document.createElement('span');
    var textnode = document.createTextNode(""); 

    downSpan.appendChild(textnode);
    downSpan.classList.add('&or;');
    downIndicator.appendChild(downSpan);

    // item views
    //this.allMenuItems = document.getElementById('list-container-1').children;

   	//this.err = document.getElementById('error-message');

   	//this.err.innerHTML = controller.getErrorMessage();

    window.addEventListener('keydown', this.controller);
    window.onerror = function(errorMsg, url, lineNumber){
		   // If Webkit throws an error on the STB - the app crashes.
		   // To prevent the propagation and therefore the crash
		   // return true

		   // Look for this console.log message in the logs
		   // To access the logs use http://{STB_IP}/itv/getLogs
		   //console.log(errorMsg);
		   return true;
		 };

	console.log('end of view reached!');
}

function Model(){
  this.sampleText = "Leaderboard1";
  this.className = "testClass";
  this.listContainer = document.getElementById('list-container-1');
  this.elem2Focus = '';
  this.leftMenuPosition = 0;
  this.dataListPosition = 0;
  this.errorMessage = "";
  this.focusedListPosition = 0;
}

this.PlayerModel = function (data){
	this.id = data.id;
	this.name = data.name;
};

this.NewsModel = function(newsObj){
	this.title = newsObj;
};

const emptyDataSet = [];

const testData = [
					{
					'id': 1,
					'name': 'Andrew Agassi'},
					 {
					 'id': 2,
					 'name': 'Peter griffin Sampras'},
					 {
					 'id': 3,
					 'name': 'Selena Willya'},
					 {
					 'id': 4,
					 'name': 'Naomi Kyoto'},
					 {
					 'id': 5,
					 'name': 'Nova djokoy'},
					 {
					 'id': 6,
					 'name': 'Rog Strix Federali'},
				];




function Controller(model){
  console.log('Controller Triggered!---------------> ');
  var self = this;
  this.model = model;

  var xhr = new XMLHttpRequest();

  this.jsonREQUEST = function(url, callback){
  	  console.log('json request triggered!');
	  var xhr = new XMLHttpRequest();

	  xhr.onreadystatechange = function() {
	    if (xhr.readyState === 4) {
	      callback(xhr.responseText);
	    }
	  };

	  xhr.open('GET', url, true);
	  xhr.send();
	  console.log('end of jsonREQUEST reached!');
	};

  this.loadNewsData = function(){
    self.jsonREQUEST('http://10.23.223.38/rssTest', self.dataIngestor2);
  };

  this.loadESPNData = function(){
    self.jsonREQUEST('http://10.23.223.38/espnFeed', self.sportsDataIngestor);
  };

  
  this.newsArr = ['initial data'];

  this.dataIngestor = function(dataObj){
  	console.log('dataIngestor triggered!');
  	var jsonObj = JSON.parse(dataObj);
  	console.log(jsonObj.title);
  	// store 
  	jsonObj.title.forEach(function(articleTitle){
  		self.newsArr.push(new NewsModel(articleTitle));
  	});
  	console.log('dataIngestor.newsArr -->'+self.newsArr);
  	console.log('reached end of dataIngestor');
  };

  this.dataIngestor2 = function(dataObj){
  	console.log('dataIngestor2 triggered!!');
  	
  	// uncomment dataObj below to set to empty string for testing
  	// dataObj = '';
  	// dataObj = null;
  	//dataObj = undefined;

  	var dataContainer = document.getElementById('data-list');
  	var updatedList = document.createElement('ul');
  	updatedList.id='data-list';
	var liElem = document.createElement('li');
	
	liElem.classList.add('canvas-data-item-container');
  	if(dataObj){
  		var jsonObj = JSON.parse(dataObj);
  		jsonObj.title.forEach(function(articleTitle){
			var titleText = document.createTextNode(articleTitle);
			var listItem = document.createElement('li');
			listItem.classList.add('canvas-data-item-container');
			listItem.appendChild(titleText);
			updatedList.appendChild(listItem);
		});
	
  	} else{
  		console.log('data was not detected');
  		var titleText = document.createTextNode('Your data is operating with a mind of its own at the moment. Please check back later.');
  		var listItem = document.createElement('li');
  		listItem.classList.add('canvas-data-item-container');
  		listItem.appendChild(titleText);
  		updatedList.appendChild(listItem);

  		// attempt to populate second list item
  		listItem.appendChild(titleText);
  		updatedList.appendChild(listItem);
  	}

	
	dataContainer.parentNode.replaceChild(updatedList, dataContainer.parentNode.children[0]);
	console.log('end of dataIngestor2 reached!');
  };

  this.sportsDataIngestor = function(sportsDataObj){
    console.log('sportsdatObj:');
    console.log(sportsDataObj);
    var sportsDataContainer = document.getElementById('data-list2');
    var sportsListElem = document.createElement('ul');
    sportsListElem.id = 'data-list2';
    if(sportsDataObj){
      var sportsJsonObj = JSON.parse(sportsDataObj);
      console.log('sportsJsonObj');
      console.log(sportsJsonObj.title[0]);
      var sportsTitleText = document.createTextNode(sportsJsonObj.title[0]);
      var sportsItemElem = document.createElement('li');
      sportsItemElem.classList.add('canvas-data-item-container');
      sportsItemElem.appendChild(sportsTitleText);
      sportsListElem.appendChild(sportsItemElem);

      //sportsJsonObj.title.forEach(function(sportsArticleTitle){
      //  var sportsTitleText = document.createTextNode(sportsArticleTitle);
      //  var sportsItemElem = document.createElement('li');
      //  sportsItemElem.classList.add('canvas-data-item-container');
      //  sportsItemElem.appendChild(sportsTitleText);
      //  sportsListElem.appendChild(sportsItemElem);
      //});
    }

  sportsDataContainer.parentNode.replaceChild(sportsListElem, sportsDataContainer.parentNode.children[0]);
  console.log('end of sportsDataIngestor reached!');
  };
  


  this.timer = function(){
  		var d = new Date();
		var t = d.toLocaleTimeString();
		var secondsVar = t[6];
		document.getElementById("test-data").innerHTML = t;
		
		// downArrow test
		//var downElem = document.getElementById('down-indicator');
		//downElem.classList.toggle('display-none');

	};




  this.updateData = function(){
  	console.log('update data triggered!');
  	self.jsonREQUEST();
  	self.dataProcess();
  	console.log('self.getNewsData()-->'+self.getNewsData());
  	//document.getElementById('canvas-data').appendChild(self.getNewsData());
  	//document.getElementById('canvas-data').replaceChild(self.getNewsData());
  	var testElem = document.createElement('ul');

  	document.getElementById('canvas-data').replaceChild(testElem);
  };

 this.playersArr = [];
 
 // data intake
this.test_newsArr = [];






this.dataObjCheck = function(){
	console.log('dataObj check');
	console.log(dataObj);
};




this.dataProcess = function(){
	console.log('dataProcess triggered!');
	console.log(dataObj.title);
	dataObj.title.forEach(function(dataElem){
		//console.log('>M<><><<>');
		//console.log(dataElem);
		self.newsArr.push(new NewsModel(dataElem));
	});
};

this.dataProcess2 = function(){
	console.log('dataprocess 2 triggered!');
	console.log(dataObj);
};

 this.defaultHighlight = function(){
 	console.log('default highlight function called!');
 	console.log(self.model.listContainer);
 	// set position to first item
 	self.model.position = 0;
 	self.model.listContainer.children[0].classList.add('underline');
 };

 this.setHighlight = function(){
 	console.log('setHighlight function called!');
 	console.log('getFocusListPosition'+this.getFocusedListPosition());
 	self.model.listContainer.children[this.getFocusedListPosition()].classList.add('underline');
 };

 this.getFocusedListPosition = function(){
 	console.log('getFocusedListPosition called!');
 	return self.model.focusedListPosition;
 };

 this.highlightPrevChild = function(){
 	console.log('highlight prev child called');
 	var leftMenuObj = document.querySelector("#list-container-1");
 	var dataObj = document.querySelector("#data-list-container");
 	if(leftMenuObj == self.model.listContainer){
		self.model.listContainer.children[this.getLeftMenuPosition()-1].classList.add('underline');
		self.model.leftMenuPosition = this.getLeftMenuPosition() - 1;
		
 	} else {
 		self.model.listContainer.children[this.getDataListPosition()-1].classList.add('underline');
		self.model.dataListPosition = this.getDataListPosition() - 1;
	}
 
 };


 this.highlightPrevChild2 = function(){
 	console.log('highlightPrevChild2 called!');
 	var leftMenuObj = document.querySelector("#list-container-1");
 	var dataObj = document.querySelector("#data-list-container");
 
 	if(leftMenuObj == self.model.listContainer){
 		self.model.leftMenuPosition = this.getLeftMenuPosition()-1;
		self.model.focusedListPosition = this.getLeftMenuPosition(); 
 	} else {
 		self.model.dataListPosition = this.getDataListPosition()-1;
 		self.model.focusedListPosition = this.getDataListPosition();
 	}

 	console.log(self.model);
 };

 this.highlightNextMenuItem = function(){
 	return self.model.listContainer;
 };

 this.highlightNextChild = function(){
 	console.log('highlight next Child called!');
 	//check  model is set to which list
 	var leftMenuObj = document.querySelector("#list-container-1");
 	var dataObj = document.querySelector("#data-list-container");
 
 	
 	if(leftMenuObj == self.model.listContainer){
		self.model.listContainer.children[this.getLeftMenuPosition()+1].classList.add('underline');
		self.model.leftMenuPosition = this.getLeftMenuPosition() + 1;
 	} else {
 		self.model.listContainer.children[this.getDataListPosition()+1].classList.add('underline');
		self.model.dataListPosition = this.getDataListPosition() + 1;
	}
	console.log('leftMenuPosition'+self.model.leftMenuPosition);
	console.log('dataListPosition'+self.model.dataListPosition);
 };


 this.highlightNextChild2 = function(){
 	console.log('highlightNextChild2 called!');
 	var leftMenuObj = document.querySelector("#list-container-1");
 	var dataObj = document.querySelector("#data-list-container");
 
 	if(leftMenuObj == self.model.listContainer){
 		self.model.leftMenuPosition = this.getLeftMenuPosition()+1;
		self.model.focusedListPosition = this.getLeftMenuPosition(); 
 	} else {
 		self.model.dataListPosition = this.getDataListPosition()+1;
 		self.model.focusedListPosition = this.getDataListPosition();
 	}

 	console.log(self.model);
 };

this.setScrollPosition = function(){
	console.log('setScrollPosition function called!');
	var highlightedItem = document.querySelector('#data-list-container').children[this.getFocusedListPosition()];
	console.log(highlightedItem);
	highlightedItem.scrollIntoView(false);
	//window.scrollTo(0,1000);
	//console.log(container.scrollTop);
	//console.log(container.scrollLeft);
};




//EVENTLISTENER INTERFACE
  this.handleEvent = function(e){
    e.stopPropagation();
    console.log('------');
    console.log(e.keyCode);
    
    switch(e.keyCode){
      case 37:
      	console.log('leftArrow detected!');
      	navigator.Exit();
        //self.clearUnderlines();
      	//self.switchLists();
      	//self.defaultHighlight();
      	//self.setHighlight();
      	break;
      case 38:
      	//upArrow
      	console.log('upArrow keypress detected!');
      	self.upScroll()
        
      	break;
      case 39:
      	console.log('right arrow triggered');
		    self.clearUnderlines();
		    self.switchLists();
		    //self.defaultHighlight();
		    self.setHighlight();
		    break;
      case 40:
      	//downArrow
      	console.log('down arrow detected!');
      	self.downScroll();
        
        break;
      default:
        console.log(e.target);
        console.log(e.keyCode);
    }
    return false; 
  };


  this.upScroll = function(){
  	console.log('upscroll function triggered; current scroll amount:150');
  	var canvasData = document.getElementById('canvas-data');
  	canvasData.scrollTop-=150;
  
  };

  this.downScroll = function(){
  	console.log('downScroll triggered!');

  	var canvasData = document.getElementById('canvas-data');
  	
  	canvasData.scrollTop+=150;

  	//canvasData.scroll(0,newScrollPos);
  	//console.log('new scroll top val:'+canvasData.scrollTop);
  };

 this.getPlayerData = function(){
 	
 	var list = document.createElement('ul');
 	list.id = "data-list-container";
 	// validate player data here ----->
 	if(this.playersArr && this.playersArr.length){
	 	console.log('data detected');
	 	for(var i = 0; i < this.playersArr.length; i++) {
	       // Create the list item:
	       var item = document.createElement('li');
	       
	       //set tabIndex to -1 to attempt to allow focus on a li element;
	       //item.tabIndex = -1;
	       

	       // Set its contents:
	      item.appendChild(document.createTextNode(this.playersArr[i].name));
		  item.classList.add('canvas-data-item-container');
	      // Add it to the list:
	      list.appendChild(item);
	    }
	    return list;

	 } else {
	 	var errorObj = document.createElement('h1');
	 	errorObj.innerHTML = 'No data available.';
	 	errorObj.classList.add('error-message');
	 	console.log('no data available');
	 	console.log(errorObj);
	 	return errorObj;
	 }


	 

 };

 this.getNewsData = function(){
 	console.log('getNewsData triggered');
 	var unorderedList = document.createElement('ul');
 	unorderedList.id = "data-list-container";
 	console.log('newsarr output -->'+self.newsArr);
 	for(var i = 0; i<this.newsArr.length; i++){
 		var listElem = document.createElement('li');
 		listElem.appendChild(document.createTextNode(this.newsArr[i].title));
 		listElem.classList.add('canvas-data-item-container');
 		unorderedList.appendChild(listElem);
 	}
 	return unorderedList;
 };





 this.getSelectedList = function(){
 	return self.model.listContainer;
 };

 this.switchLists = function(){
 	console.log('switchLists function called!');
 	if(this.getSelectedList() == document.getElementById('list-container-1')){
 		self.model.listContainer = document.getElementById('data-list-container');
 		self.model.focusedListPosition = this.getDataListPosition();
 	} else {
 		self.model.listContainer = document.getElementById('list-container-1');
 		self.model.focusedListPosition = this.getLeftMenuPosition();
 	}
 };

 this.setPig = function(){

	console.log('setPig triggered');
	// navigator test
	//console.log('attempting to blind');
	//navigator.blind(false);

	// set pig
	var in_x = 0;
	var in_y = 0;
	var in_width = 0;
	var in_height = 0;
	var out_x = 670;
	var out_y = 0;
	var out_width = 1250;
	var out_height = 870;
	//var testeee = navigator.clearBackground(in_x, in_y, in_width, in_height);
	//console.log(testeee);
	var setVid = VideoSource.setInputOutputWindow(in_x, in_y, in_width, in_height, out_x, out_y, out_width, out_height);
	console.log('setPig reached end of script');
	return false;
};

this.toggleListContainer = function(){
	// inteneded to be called from a left/right arrow keypress
	
	// change list container in model 
	self.model.listContainer = document.getElementById('');
};


//GET ELEMENT TO HIGHLIGHT
this.getElementToHighlight = function() {
	return self.model.elem2Focus;
};

//GET LEFT MENU POSITION
this.getLeftMenuPosition = function(){
 	return self.model.leftMenuPosition;
 };

 //GET DATA LIST POSITION
 this.getDataListPosition = function(){
 	return self.model.dataListPosition;
 };



//GET MODEL HEADING
  this.getModelHeading = function(){
    return self.model.sampleText;
  };


//GET ERR MESSAGE
this.getErrorMessage = function(){
	return self.model.errorMessage;
};
//GET MODEL CLASSNAME
  this.getClassName = function(){
  	return self.model.className;
  };

// Clear all underlines
this.clearUnderlines =function(){
	console.log('clearUnderlines called');
	// clear underline and cells from all lists
  	// declare object for all children of list items
    var listItemsArr = document.getElementById('list-container-1').children;
    var leaderboardItemsArr = document.getElementById('data-list-container').children;

    // initialize by checking if there highlights on any list elements 
	// and if found, clear them.

	// loop for left menu items
    var counter = listItemsArr.length-1;
    while(counter >= 0){
    	if(listItemsArr[counter].classList.contains('underline')){
    		listItemsArr[counter].classList.toggle('underline');
    	}
    	counter--;
    }
	
	    
    // loop for data items
    var counter2 = leaderboardItemsArr.length-1;
    while(counter2 >= 0){
    	if(leaderboardItemsArr[counter2].classList.contains('underline')){
    		leaderboardItemsArr[counter2].classList.toggle('underline');
    	}
    	counter2--;
    }

	console.log('clearUnderlines completed!');

};

//CHANGE THE MODEL
  this.keyHandler = function(target){
  	console.log('keyHandler called, attempting to clear underlines!');
  	self.clearUnderlines();

  	if(target >1){
		console.log('keyhandler called right, should move higlight to leaderboard-->'); 
		self.model.elem2Focus = document.getElementById('data-list-container').children[0];
		this.getElementToHighlight().classList.add('underline');		
  	}

    var maxElemItems = allListItems.length-1;

    if(target<2){
	    // if highlight is not the last element, increment position
	    // if it is last element, move highlight to the first element
	    	
		// change the model by setting the model.position
		var newPos = self.getHighlightPosition() + target;
		if (newPos < 0 ){
			self.model.position = 0;
		} else if ( newPos > maxElemItems){
			self.model.position = maxElemItems;
		} else {
			self.model.position = newPos;
		}
	}

    // add underline to element with matching position from the model
    allListItems[self.getHighlightPosition()].classList.add('underline');

   
  };

  console.log('end of controller reached!');
}

function main(){
  //pullData('http://10.23.223.38/rssTest', doSomethingWithData);
  var model = new Model();
  var controller = new Controller(model);
  var view = new View(controller);
  console.log('end of main reached');
}

//-------------------------

