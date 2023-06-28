// Class selector
// To find the element with a given CSS class, you use the class selector syntax:
let currentInput = document.querySelector('.currentInput');
let answerScreen = document.querySelector('.answerScreen');
let number_button = document.querySelectorAll('.number_button');
let operation_button = document.querySelectorAll('.operation_button');
let decimalbtn = document.querySelector('.decimal_button'); 
let percentbtn = document.querySelector('.percentages_button'); 



// Type selector
// To select elements by node name, you use the type selector e.g., a selects all <button> elements
// let numbtn = document.querySelectorAll('button');


// ID Selector
// To select an element based on the value of its id, you use the id selector syntax
let deletebtn = document.querySelector('#delete');
let clearbtn = document.querySelector('#all-clear');
let evaluatebtn = document.querySelector('#evaluate');



// ***********************************
// ***      MODEL (Database)       ***
// ***********************************
let realTimeDisplay = [];
let answer = 0;
let chartype = "empty";

function clear_data()
{
    // Clear all Real Time Display
    // Remove all answer

    realTimeDisplay = [];
    answer = 0;
    chartype = "empty"
}


function remove_data()
{
    // if got item, remove it
    // else, no reaction

    let index = realTimeDisplay.length - 1;

    if (!(realTimeDisplay == false))
    {
        if (realTimeDisplay[index].length <= 1)
        {
            realTimeDisplay.pop();
            update_equation();
        }
        else
        {
            realTimeDisplay[index] = realTimeDisplay[index].slice(0, -1);
        }
    }
    else;
}      


function calculation(first_value, operator, second_value)
{
    // If got enuf number and operator, calculate
    // if only first number + operator, duplicate the first number to second number
    // if only first number or no number, no reaction

    if (String(first_value).includes('%'))
    {
        first_value = parseFloat(first_value.slice(0, -1));
        first_value = first_value / 100;
    }

    if (String(second_value).includes('%'))
    {
        second_value = parseFloat(second_value.slice(0, -1));
        second_value = second_value / 100;
    }

    first_value = parseFloat(first_value);
    second_value = parseFloat(second_value);


    if (operator == "+")
    {
        answer = first_value + second_value;
    }
    else if (operator == "-")
    {
        answer = first_value - second_value;
    }
    else if (operator == "*")
    {
        answer = first_value * second_value;
    }
    else if (operator == "/")
    {
        answer = first_value / second_value;
    }
    else;

    answer = answer.toFixed(2);
    answer = String(answer);
    chartype = "answer";
}


// function add_decimal(char_type)
// {
//     // if no decimal
//         // if previous is operator, straight 0.
//         // else if previous is number, add a decimal
//     // else
//         // do nothing

//     if (char_type == 'operator')
//     {
//         realTimeDisplay[realTimeDisplay.length] = 0
//     }
    
//     realTimeDisplay[realTimeDisplay.length-1]

// }


function add_number(num)
{
    // if its 0. replace it
    // if its number, append it
    // if its operator, create new number

    let index = realTimeDisplay.length - 1;

    if ((chartype == "empty") || (chartype == "answer"))
    {
        realTimeDisplay = [];
        realTimeDisplay.push(String(num));
        chartype = "number";
    }
    else if (chartype == "number")
    {
        realTimeDisplay[index] = 
        String(realTimeDisplay[index]) + String(num)
        chartype = "number";
    }
    else if (chartype == "operator")
    {
        realTimeDisplay.push(String(num));
        chartype = "number";
    }
    else;
}


function add_operator(ops)
{
    // if its number, append it
    // if its operator, replace it
    // if its second operator, compute it then only append it

    let index = realTimeDisplay.length - 1;

    if (chartype == "empty")
    {
        realTimeDisplay = [];
        realTimeDisplay.push("0");
        realTimeDisplay.push(ops);
        chartype = "operator";
    }
    else if ((chartype == "number") && (realTimeDisplay.length < 3))
    {
        realTimeDisplay[realTimeDisplay.length] = ops;
        chartype = "operator";
    }
    else if (chartype == "operator")
    {
        realTimeDisplay[index] = ops;
        chartype = "operator";
    }
    else if ((chartype == "number") && (realTimeDisplay.length >= 3))
    {
        let num1 = realTimeDisplay[0];
        let op = realTimeDisplay[1];
        let num2 = realTimeDisplay[2];

        calculation(num1, op, num2);

        realTimeDisplay = [];
        realTimeDisplay.push(String(answer));
        realTimeDisplay.push(ops);
        chartype = "operator";
    }
    else;

    // if (realTimeDisplay.length >= 3)
    // {
    //     let num1 = realTimeDisplay[0];
    //     let op = realTimeDisplay[1];
    //     let num2 = realTimeDisplay[2];

    //     calculation(num1, op, num2);
    //     chartype = "answer";
    // }
}


function add_decimal()
{
    // if its number
    //      if got decimal
    //          ignore
    //      else if no decimal
    //          add decimal
    //
    // if its operator
    //      add a 0, then add decimal

    let index = realTimeDisplay.length - 1;

    if ((chartype == "empty") || (chartype == "answer"))
    {
        realTimeDisplay = [];
        realTimeDisplay.push("0.");
        chartype = "number";
    }
    else if (chartype == "number")
    {
        if (!(realTimeDisplay[index].includes(".")))
        {
            realTimeDisplay[index] = realTimeDisplay[index] + "."; 
            chartype = "number";
        }
        else;
    }
    else if (chartype == "operator")
    {
        realTimeDisplay.push("0.");
        chartype = "number";
    }
    else;
}


function add_percent()
{
    let index = realTimeDisplay.length - 1;

    if (chartype == "answer")
    {
        realTimeDisplay[index] = realTimeDisplay[index] + "%";
    }
    else if (chartype == "number")
    {
        if (!(realTimeDisplay[index].includes("%")))
        {
            realTimeDisplay[index] = realTimeDisplay[index] + "%"; 
            chartype = "number";
        }
        else;
    }
    else;
}


function evaluate()
{
    if (!(realTimeDisplay == false))
    {
        let len = realTimeDisplay.length;

        if (len == 1)
        {
            answer = realTimeDisplay[0];
        }
        else if (len == 2)
        {
            let num1 = realTimeDisplay[0];
            let op = realTimeDisplay[1];
            let num2 = num1;
            
            calculation(num1, op, num2);
        }
        else if (len == 3)
        {
            let num1 = realTimeDisplay[0];
            let op = realTimeDisplay[1];
            let num2 = realTimeDisplay[2];
            
            calculation(num1, op, num2);
        }

        chartype = "answer";
    }
}


function update_equation()
{
    // Check the last element type
    if (realTimeDisplay == false)
    {
        chartype = "empty";
    }
    else
    {
        let index = realTimeDisplay.length - 1;
        let last_element = realTimeDisplay[index];

        let operators_pattern = /\b[+\-*/]\b/g;
        let number_pattern = /\d+(\.\d+)?%?/g;

        if (last_element.match(operators_pattern) == true)
        {
            chartype = "operator";
        }
        else if (last_element.match(number_pattern) == true)
        {
            chartype = "number";
        }
        else;
    }
}


// ************************************
// ***      CONTROL (from HMI)      ***
// ************************************
clearbtn.addEventListener("click", () => 
{
    clear_data();
    render();
});

deletebtn.addEventListener("click", () => 
{
    remove_data();               
    render();
});

evaluatebtn.addEventListener("click", () => 
{
    // currInput = currentInput.innerText

    // let pattern = /([-+]?\d+(\.\d+)?%?|[+\-*/])/g;
    // let input_array = currInput.match(pattern);
    // console.log(input_array);

    // if (input_array.length == 2)
    // {
    //     let update_pattern = /[+-]|\d+(\.\d+)?%?/g;
    //     let temp_array = input_array[1].match(update_pattern);

    //     input_array.pop();
    //     input_array = input_array.concat(temp_array);
    //     console.log(input_array);
    // }

    // let num1 = praseFloat(input_array[0]);
    // let opt = input_array[1];
    // let num2 = praseFloat(input_array[2]);

    // compute(num1, opt, num2);
    // render();

    evaluate();
    render();
});


decimalbtn.addEventListener("click", () => 
{
    add_decimal();
    render();
});


number_button.forEach ((num_btn) =>
{
    num_btn.addEventListener("click", () => 
    {
        let number = num_btn.value;
        add_number (number);
        render();
    });
});


operation_button.forEach ((ops_btn) =>
{
    ops_btn.addEventListener("click", () => 
    {
        let operater = ops_btn.value;
        add_operator (operater);
        render();
    });
});


percentbtn.addEventListener("click", () => 
{
    add_percent();
    render();
});


// ************************
// ***      VIEW        ***
// ************************
function render()
{
    let input = "";
    for (let i = 0; i < realTimeDisplay.length; i++)
    {
        input = input + String(realTimeDisplay[i]);
    }
    currentInput.innerHTML = input;
    answerScreen.innerHTML = answer;
}