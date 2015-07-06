var paint = {

manufacturer: "";
bestTemp: 199,
bestDiff: 199,
difference: 199,
x: 0,
dryTimes: "",
goodTemps: "",
dtA: "",
dtB: "",
minTemp: 199,
maxTemp: 199,
dryRay: [], 
tempToTry: 199, 
temp: 199, 
customerProduct: [], 
customerThickness: [],
kay: 0, 
currentProduct: "",
nextProduct: "",
maxDFT: 100,
minDFT: 100, 
minWFT: 100, 
maxWFT: 100, 
getDFT: 100, 
WFTstring: 100, 
finalTemp: 100
};


console.log("specifier script is loaded");

function buttonhandler () {
//Purpose: to create the right number of pull-down menus in the form.
//manufacturer = document.getElementById('mfg').value;
var bullet;
paint.x = document.getElementById("c").value;
for (i = 0; i < x; i++) {
     bullet = "b" + i;
     //console.log("value of bullet is: " + bullet);
  document.getElementById(bullet).innerHTML = "<select><option value='Choose'>Choose coating</option><option value='Intershield300V'>Intershield 300V</option><option value='Interthane990HS'>Interthane 990HS</option><option value='Intertuf262'>Intertuf 262</option><option value='Interspeed640'>Interspeed 640</option><option value='Interspeed6400NA'>Interspeed 6400NA</option><option value='Interbond998'>Interbond 998</option><option value='Interzinc22HS'>Interzinc 22HS</option><option value='Interzinc75V'>Interzinc75V</option><option value='Interseal670HS'>Interseal 670HS</option<option value='Intergard264'>Intergard 264</option><option value='Intershield803'>Intershield 803</option><option value='Intershield300V'>Intershield 300V</option><option value='Intershield300VImmersed'>Intershield 300V Immersed</option></select>   Mils:  <input type='number' name='mils' min='1' max='100'> "; 
  };
};

function menuHandler() {
  //purpose: Receive input from pull-down menus and save as a coating spec, in the form of two arrays, one for products and one for thicknesses. 
//console.log("menu-handler is activated");
paint.x = document.getElementById("c").value;
paint.temp = document.getElementById("tmp").value;
   for (i=0; i<x; i+=1)   {
      //console.log("menuhandler counter: " + i);
      paint.customerProduct[i] = eval("b"+i ).firstElementChild.value;
      paint.customerThickness[i] = eval("b"+i ).lastElementChild.value;
    }
reportBack(); //calls the report-back function so the paint spec array can be used. 
} ;

getDFT = function (theCoating, kay) {
//Purpose: Calculate wet-film thickness, using the thicknesses in the array (created by menuHandler) and product data retreived from the paint data script.
//Returns in the form of a string that will be inserted in the DOM.
paint.minDFT = eval(paint.customerThickness[kay]);
paint.maxDFT = 1.0 + paint.minDFT;
paint.minWFT = paint.minDFT/(theCoating.volumeSolids);
paint.maxWFT= paint.maxDFT/theCoating.volumeSolids;
paint.WFTstring =  "" + Math.round(paint.minWFT) + "</td><td>" + Math.round(paint.maxWFT) + "</td><td>" + paint.minDFT + "</td><td>" + paint.maxDFT ;
return paint.WFTstring;
};

var closest = function closest (coating) {
//Purpose: Go to the coating schedules array in the product's JSON object and decide which of the available temperatures is closest to the current temperature.
//Returns that temperature to be used by other functions that retrieve drying times. 
    var j;
    //console.log("closest function is activated")
for (j=0; j<coating.curingSchedules.length; j++) {
paint.tempToTry = coating.curingSchedules[j];
difference = Math.abs(paint.tempToTry-temp);
if (paint.difference < bestDiff) {
    paint.bestTemp = paint.tempToTry;
     paint.bestDiff = paint.difference;
   }
}
return paint.bestTemp; 
};

var tempRange = function tempRange (coat) {
  //Purpose: Grab first and last entries from the coatins schedule array of the product's JSON object, to report the temperature range at which the product can be applied. 
// Returns two values--the minimum and the maximum--formatted as a string to be inserted in the DOM.
var paint.minTemp = coat.curingSchedules[0];
var paint.maxTemp = coat.curingSchedules[coat.curingSchedules.length-1];
paint.goodTemps = "" +paint.minTemp + "</td><td>" + paint.maxTemp;
return goodTemps;
};


var getSchedule = function getSchedule (coat, nextcoat) {
//Retreives the proper drying times for the present coat of paint, based on the present temperature and the product used for the following coat. 
//Assembles the address for that stored data, based on input variables; retreives the data;
//Returns the answer as a text string for insertion in the DOM.
paint.dtA=coat.objectName;
paint.dtB=nextcoat.name; 
paint.finalTemp = closest(coat);

paint.dryTimesAddress = dtA + ".h.t" + finalTemp + "." + dtB;
dryStrung = eval(dryTimesAddress);
dryRay = dryStrung.split(',');

dryTimes = dryRay[0] + "</td><td>" + dryRay[1];
return dryTimes; 

};

function reportBack () {
//Purpose: Assembles the full string of data, one coat of paint at a time, calling some of the functions above for sub-assemblies of the main string. 
//Returns info that appears in the table after the "calculate" button is pushed. 
x = document.getElementById("c").value;
var info;
var output; 
    for (k=0; k<x+1; k++) {
     kay=k;
     output = "d"+k;
     console.log("output= " + output);
   currentProduct = eval(customerProduct[kay]);
   nextProduct = eval(customerProduct[kay + 1]);
   

   if (k<x-1) {console.log("getschedule "+kay)}
  else if (k=x-1) {
   nextProduct = eval(customerProduct[kay]);
    console.log('get schedule last coat');
  }
 info = "<tr><td>spot/full</td><td>" + (kay+1) + "</td><td>"+ currentProduct.ACAF +"</td><td>" +getDFT(currentProduct, kay)+"</td><td>"+currentProduct.manufacturer+"</td><td>"+currentProduct.objectName+"</td><td>"+ currentProduct.ratio + "</td><td>color</td><td>"+currentProduct.induction+"</td><td>"+tempRange(currentProduct) +"</td><td>"+getSchedule(currentProduct, nextProduct)+"</td></tr>";
document.getElementById(output).innerHTML = info;
}
};
