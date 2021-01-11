const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var details = {
    address: "Null",
    name: "Null",
}
let array = [];
array.push(details);

let list = () => {
    console.log("1.Add Address");
    console.log("2.Delete Address");
    console.log("3.View Address");
    console.log("4.Exit");
    rl.question("Enter your choice: ", (choice) => {
        switch (parseInt(choice)) {
            case 1:
                add_address();
                break;
            case 2:
                Delete_address();
                break;
            case 3:
                view_address();
                break;
            case 4:
                Exit();
                break;
            default:
                console.log("invalid");
                list();
        }
    });
    
};
let add_address = () => {
    rl.question("enter the address: ", (add) => {
        rl.question("enter your name: ", (user) => {
            var details = {
                address: add,
                name: user,
            }
            array.push(details);
            let jsonstring=JSON.stringify(array);
            fs.writeFileSync("rithika.json",jsonstring);
            list();
        });
    });
}
let Delete_address=()=>{
    let file_data=fs.readFileSync("rithika.json");
    let file_info=JSON.parse(file_data);
    let array1=[];
    rl.question("enter the address which u want to remove?: ", (rem_add)=>{
        for(let x=0;x<file_info.length;x++){
            if(file_info[x].address !==rem_add){
                array1.push(file_info[x]);
            }
        }
        let jsonstring=JSON.stringify(array1);
            fs.writeFileSync("rithika.json",jsonstring);
            console.log("deleted...");
        list();
    });
}
let view_address = () => {
    let data = fs.readFileSync("rithika.json");
    let info=JSON.parse(data);
    let arr = [];
    for(let i=1;i<info.length;i++){
        arr.push(info[i]);
    }
    console.table(arr);
    list();
}
let Exit=()=>{
    console.log("BYE");
}
list();