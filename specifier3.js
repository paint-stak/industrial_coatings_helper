//variables p1, p2 and p3 represent the empty buckets
//whatever products will be used on the first, second 
//and third coats of a paint job.

var Intershield300V = {
objectName: "Intershield300V",
name: "i300v",
Manufacturer: "International Paint",
chemistry: "epoxy",
type: "anticorrosive-primer",
ratio: "1-1",
volumeSolids: 0.63,
curingSchedules: [23, 41, 77, 95],
w: "almost there",
h:{
    t22: "really, really close",

    t23: {
           touchDry: "6hrs", 
           hardDry: "28 hrs",
           potLife: "6hrs", 
           i979: ["30 hrs", "5 dys"],
           i267: ["30 hrs", "14 dys"],
           i740: ["30 hrs", "7 dys"],
           i300vImmersed: ["30 hrs", "14 dys"],
           i300v: ["30 hrs", "6 mths"],
           i990hs: ["30 hrs", "3 dys"],
           i640: ["6 hrs", "NA"]
    },

    t41: {
            touchDry: "4hrs", 
            hardDry: "17hrs", 
            potLife: "6hrs", 
            i979: ["18hrs", "5dys"], 
            i267: ["18hrs", "14dys"], 
            i740: ["18hrs", "7dys"], 
            i300v: ["18 hrs", "6mnths"], 
            i300vImmersed: ["18hrs", "14 dys"], 
            i990hs: ["18hrs", "3dys"],
            i640: ["6 hrs", "NA"]
    },

    t77: {
            touchDry: "3hrs", 
            hardDry: "4hrs", 
            potLife: "2hrs",  
            i979: ["6.5hrs", "3dys"], 
            i267: ["6.5hrs", "14dys"], 
            i740: ["6.5hrs", "7dys"], 
            i300vImmersed: ["6.5hrs", "14dys"], 
            i300v: [ "6.5 hrs", "5.5mnths"], 
            i990hs: ["6.5hrs", "3dys"],
            i640: ["2 hrs", "NA"]
    },
   

    t95:  {
             touchDry: "60 mins", 
             hardDry: "2 hrs", 
             potLife: "60 mins", 
             i979: ["4 hrs", "3 dys"], 
             i267: ["4 hrs", "14 dys"], 
             i740: ["4 hrs", "7 dys"], 
             i300vImmersed: ["4 hrs", "14 dys"], 
             i300v: ["4 hrs", "3 mnths"], 
             i990hs: ["4 hrs", "3 dys"],
             i640: ["60 mins", "NA"]
    }//cloze 95 degrees
} //cloze h
}; //cloze 300v objekt

var bestTemp = 199;
var bestDiff = 199;
var difference;
var minMaxDry;
var x;
var dryTimes;
var goodTemps;
var dtA;
var dtB;

var goGetIt;
var min_dft = 5.0; //later this will be provided by the user
var temp = 80; //later this will be provided by the user



var p1 = Intershield300V;
var p2 = Intershield300V
//var p3 = Interthane990hs;

var getDFT = function getDFT () {
var max_dft =  min_dft + 1;
var min_wft = min_dft/(Intershield300V.volumeSolids);
var max_wft = max_dft/(Intershield300V.volumeSolids);
WFTstring = max_dft + ", " + min_wft + ", " + max_wft;
return WFTstring;
};
//This function below will decide which column of curing schedule
//is best, by picking the one whose name (a temperature) is 
//closest to the current temperature. It uses the curing-schedules
//array, which is a property of each paint-product object.
var closest = function closest () {
    var i;
    //console.log("closest function is activated")
for (i=0; i<Intershield300V.curingSchedules.length; i++) {
var tempToTry = Intershield300V.curingSchedules[i];
difference = Math.abs(tempToTry-temp);
if (difference < bestDiff) {
    bestTemp = tempToTry;
     bestDiff = difference;
     //console.log("new best temp is " + bestTemp);
}
//else console.log("The best temp is still " + bestTemp);
}
return bestTemp;
};

var tempRange = function tempRange () {
var minTemp = Intershield300V.curingSchedules[0];
var maxTemp = Intershield300V.curingSchedules[Intershield300V.curingSchedules.length-1];
goodTemps = minTemp + ", " + maxTemp;
return goodTemps;
};


var getSchedule = function getSchedule () {
//console.log("getSchedule function is activated")
dtA = p1.objectName;
dtB = p2.name; 
var finalTemp = closest();
dryTimesAddress = dtA + ".h.t" + finalTemp + "." + dtB;
dryTimes = eval(dryTimesAddress);
};


getSchedule();
tempRange();


console.log(Intershield300V.name);
console.log("your mils dry/wet: " + min_dft + ", " + getDFT());
console.log("Your temp is: " + temp);
console.log("Your working temp range is: " + goodTemps);


console.log("Your dry times address is: " + dryTimesAddress);
console.log("your actual dry times are: " + dryTimes);
/* the p1 to p3 variables don't work because they are
are above the objects. The arrays may have to be replaced
with objects--because it will take less time to indicate
the dry times within an object, rather than search
through an array*/