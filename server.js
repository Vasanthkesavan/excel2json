const express = require('express');
const app = express();
const XLSX = require('xlsx');
const bodyParser = require('body-parser');
const formidable = require('formidable');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.listen(3000, () => console.log('Server is listening on 3000!'));

app.post('/readExcel', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, field, files) {
        let f = files[Object.keys(files)[0]];
        let wb = XLSX.readFile(f.path);
        let ws = wb.Sheets["Form Responses 1"]; // Sheet name goes here

        res.send(XLSX.utils.sheet_to_json(ws, {header: 'A'}));
    })
})