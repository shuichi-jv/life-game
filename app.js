/**
 * 
 */

//const n = 70;

var height = 70;
var width = 100;

var field;
var list;

const AROUND = [
			[-1,-1],[-1,0],[-1,1],
			[ 0,-1],[ 0,0],[ 0,1],
			[ 1,-1],[ 1,0],[ 1,1]];

 window.onload = function load(){
	setUpView();
 }
 
 function genView(){
	const view = document.getElementById("field");
	view.innerHTML="";
	
	for(var i = 0;i<height;i++){
		const wrapper = document.createElement("div");
		wrapper.className="wrapper";
		for(var j = 0;j<width;j++){
			const block = document.createElement("div");
			block.classList.add("block","dead");
			if(existsGrid)block.classList.add("grid");
			block.id=i+" "+j;
			
			block.addEventListener('click',(e)=>{
				var v = e.target.id.split(" ");
				var h = parseInt(v[0]);
				var w = parseInt(v[1]);
				
				if(field[h][w]){
					field[h][w] = false;
					e.target.classList.remove("alive");
					e.target.classList.add("dead");
				}else{
					field[h][w] = true;
					e.target.classList.remove("dead");
					e.target.classList.add("alive");
				}
			})
			
			wrapper.appendChild(block);
		}
		view.appendChild(wrapper);
	}
 }
 
 var cnt = 0;
 var turn = 100;
 var span = 50;
 
function myLoop() {         
  setTimeout(function() {   
    game();
   	//show(); //console用 
	
	cnt++;
	console.log(cnt);

    if (cnt < turn) {
      myLoop();
    }
    
  }, span)
}
 
 
 
 function run(){
	console.log("run");
	
	cnt=0;
	inp();
	//show();
	myLoop();
 }
 
 var isRandom = false;
 var density = 0;
 
 function inp(){
	
	list = new Array(0);
	if(isRandom){
		
		genView();
		genField();
		
		for(var i = 0;i<height;i++){
			for(var j = 0;j<width;j++){
				var rand = Math.random();
				if(rand<density){
					field[i][j]=true;
					
					const div = document.getElementById(i+" "+j);
					div.classList.add("alive");
					div.classList.remove("dead");
					list.push([i,j]);
					}
				
			}
		}
	}else{
		
		for(var i = 0;i<height;i++)
			for(var j = 0;j<width;j++)
				if(field[i][j])list.push([i,j]);
		
	}
 }
 
 function genField(){
	field = new Array(height);
	
	for(var i = 0;i<height;i++){
		field[i] = new Array(width);
		for(var j = 0;j<width;j++)
			field[i][j] = false; 
	}
 }
 
 function game(){
	var arArr = getAroundArr();
	var change = new Array(0);
	for(var arr of arArr)if(judge(arr[0],arr[1]))change.push(arr);
	
	 showDiv(change);
	
	var newList = new Array(0);
	
	for(var arr of change){
		newList.push(arr);
		field[arr[0]][arr[1]]=field[arr[0]][arr[1]]?false:true;
	}
	
	list = newList;
 }
 
 function judge(h,w){
	var boo = field[h][w];
	
	var ln = aliveNeighbor(h,w);
	
	if(boo){
		if(ln<=1||4<=ln)return true;
	}else{
		if(ln==3)return true;
	}
	
	return false;
 }
 
 function aliveNeighbor(h,w){
	var ret = 0;
	for(var i = 0;i<9;i++){
		if(i==4)continue;
		var hh = h+AROUND[i][0];
		var ww = w+AROUND[i][1];
		
		if(0<=hh&&hh<height&&0<=ww&&ww<width)
			if(field[hh][ww])ret++;
	}
	
	return ret;
	
 }
 
 function getAroundArr(){
	var ret = new Array(0);
	
	var vst = new Array(height);
	for(var i = 0;i<height;i++){
		vst[i] = new Array(width);
		for(var j = 0;j<width;j++){
			vst[i][j] = false;
		}
	}
	
	
	for(var arr of list){
		var h = arr[0];
		var w = arr[1];
		
		for(var i = 0;i<9;i++){
			var hh = h+AROUND[i][0];
			var ww = w+AROUND[i][1];
			
			if(0<=hh&&hh<height&&0<=ww&&ww<width) 
				if(!vst[hh][ww]){
					
					ret.push([hh,ww]);
					vst[hh][ww]=true;
				}
					
		}	
	}
		
		return ret;
 }
 
 function show(){
	var sh = "";
	
	for(var arr of field){
		for(var boo of arr){
			sh+=boo? "🟩":"⬛";
		}
		sh+="\n";
	}
	console.log(sh);
 }
 
function showDiv(change){
	
	for(var arr of change){
		const div = document.getElementById(arr[0]+" "+arr[1]);
		if(div.classList.contains("alive")){
			div.classList.remove("alive");
			div.classList.add("dead");
		}else{
			div.classList.add("alive");
			div.classList.remove("dead");
		}
		
	}
	
}

//function setUpRng(){
//	changeView();
//	changeSpan();
//	changeTurn();
//}


function setUpView(){
	height = document.getElementById("rngHeight").value;
	width = document.getElementById("rngWidth").value;
	const rngValueHeight = document.getElementById("rngHeightValue");
	rngValueHeight.textContent=height;
	const rngValueWidth = document.getElementById("rngWidthValue");
	rngValueWidth.textContent=width;
	changeSpan();
	changeTurn();
	changeDensity();
	genField();
	genView();
}

function changeTurn(){
	turn = document.getElementById("rngTurn").value;
	const rngValue = document.getElementById("rngTurnValue");
	rngValue.textContent=turn;
}

function changeSpan(){
	span = document.getElementById("rngSpan").value;
	const rngValue = document.getElementById("rngSpanValue");
	rngValue.textContent=span;
}

function changeRandom(){
	isRandom = document.getElementById("chckbxRandom").checked;
}

function changeDensity(){
	density = document.getElementById("rngDensity").value;
	const rngValue = document.getElementById("rngDensityValue");
	rngValue.textContent = density;
}

var existsGrid = false;

function changeGrid(){
	existsGrid = document.getElementById("chckbxGrid").checked;
	
	for(var i = 0;i<height;i++){
		for(var j = 0;j<width;j++){
			if(existsGrid){
				const con = document.getElementById(i+" "+j);
				con.classList.add("grid");
			}else{
				const con = document.getElementById(i+" "+j);
				con.classList.remove("grid");
			}
			
		}
		
	}
}
 