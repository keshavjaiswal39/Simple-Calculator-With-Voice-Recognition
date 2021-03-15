// to get access to the id "history-value" 
function getHistory()
{
    return document.getElementById("history-value").innerText;
}

// to print the history value
function printHistory(num)
{
    document.getElementById("history-value").innerText=num;
}

// to get access to the id "output-value" 
function getOutput()
{
    return document.getElementById("output-value").innerText;
}

// to print the output value
function printOutput(num)
{
    // if value is empty, it sets it to empty, instead of printing 0
    if(num=="")
    {
        document.getElementById("output-value").innerText=num;
    }
    else
    {
        document.getElementById("output-value").innerText=getFormattedNumber(num);
    }
}

// to read the output comma separated to make readability easy
function getFormattedNumber(num)
{
    // in case of negative number as a output we will return ""
    if(num=="-")
    {
        return "";
    }
    var n=Number(num);
    var value=n.toLocaleString("en");
    return value;
}

// this will convert my comma separated back to the original number
function reverseNumberFormat(num)
{
    return Number(num.replace(/,/g,''));
}

// Now we will get back to the operations for the operators
var operator=document.getElementsByClassName("operator");
for(var i=0;i<operator.length;i++)
{
    // this will help us give an event if we click the operators
    operator[i].addEventListener('click',function(){
        // if we click on clear, both the history and output gets cleared
        if(this.id=="clear")
        {
            printHistory("");
            printOutput("");
        }

        // for backspace, commas should not be there so we get the number and convert it to string
        else if(this.id=="backspace")
        {
            var output=reverseNumberFormat(getOutput()).toString();
            // we will remove the last character using substring function
            if(output)   // if output has a value
            {
                output=output.substr(0,output.length-1);
                printOutput(output);
            }
        }

        // for all the operators like +,-,*,/,....
        else
        {
            var output=getOutput();
            var history=getHistory();

            if(output=="" && history!="")
            {
                // if the last character is an operator
                if(isNaN(history[history.length-1]))
                {
                    history=history.substr(0,history.length-1);
                }
            }

            // the operators does not work if the output is empty
            // so lets first check the output is not empty
            if(output!="" || history!="")
            {
                // if output is empty but history is not empty then output must be set to empty value
                output=output==""?
                output:reverseNumberFormat(output);

                // in the calculator, when a operator is clicked the output value is fiest added to the history
                history=history+output;

                // if the user clicks in the "=" operator then the history will be evaluated
                if(this.id=="=")
                {
                    // this will evaluate the history
                    var result=eval(history);
                    // we will print the result in the output
                    printOutput(result);
                    // the history gets empty
                    printHistory("");
                }

                // if we click on other operator except the "="
                else
                {
                    // the operators gets added to the history and output is set to empty
                    history=history+this.id;
                    printHistory(history);
                    printOutput("");
                }
            } 
        }   
    })
}

// Now we will get back to the operations for the numbers
var number=document.getElementsByClassName("number");
for(var i=0;i<number.length;i++)
{
    // this will help us give an event if we click the operators
    number[i].addEventListener('click',function(){
            var output=reverseNumberFormat(getOutput());

            // if output is a number
            if(output!=NaN)
            {
                output=output+this.id;
                printOutput(output);
            }
    });
}

var microphone = document.getElementById('microphone');
microphone.onclick=function()
{
	microphone.classList.add("record");
	var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
	
    recognition.lang = 'en-US';
	recognition.start();
	
    operations = {"plus":"+",
				 "minus":"-",
				 "multiply":"*",
				 "multiplied":"*",
				 "divide":"/",
				 "divided":"/",
				 "reminder":"%"}
	
	recognition.onresult = function(event)
    {
		var input = event.results[0][0].transcript;
	
        for(property in operations)
        {
			input= input.replace(property, operations[property]);
		}
		
        document.getElementById("output-value").innerText = input;
		
        setTimeout(function()
        {
			evaluate(input);
		},2000);
		
        microphone.classList.remove("record");
	}
}

function evaluate(input){
	try{
		var result = eval(input);
		document.getElementById("output-value").innerText = result;
	}
	catch(e){
		console.log(e);
		document.getElementById("output-value").innerText = "";
	}
}





