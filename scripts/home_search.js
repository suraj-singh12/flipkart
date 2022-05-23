let fs = require('fs');

let searchItem = (e) => {
    let value = e.getAttribute('value');
    console.log(value);
    alert(value);
    
    // read files
    // path = './Flipkart-Data/' + value;
    // let files = fs.readdirSync(path);
    // console.log(files);
    // alert('done');
}
console.log('done');