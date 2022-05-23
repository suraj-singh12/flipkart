let express = require('express');
let app = express();

let port = process.env.PORT || 4565;

// read this guide 
// https://www.positronx.io/how-to-serve-static-files-css-js-images-in-express-js/

app.use(express.static('./'));
app.use('/', express.static('./'));


app.listen(port, () => {
    console.log('Server connected at: ' + port);
    console.log('http://localhost:' + port);
});