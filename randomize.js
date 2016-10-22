var fs          = require('fs');

const FILE = '/tmp/randomize.db.json';

// crapy cheat to create empty file
var fd = fs.openSync(FILE, 'a');
fs.closeSync(fd);

var raw = fs.readFileSync(FILE, 'utf8');
var db = {};
if ((typeof raw == 'string') && (raw.length != 0)) 
    try { db = JSON.parse(raw); } catch (e) { console.error(e); process.exit(-1); }

var fillZero = (number) => {
    var countDigit = (remain, count) => {
        if (count == undefined) count = 1;
        remain = Math.floor(remain / 10);
        if (remain != 0) return countDigit(remain, ++count);
        else return count;
    };
    var count = countDigit(number);
    for (var i = 0; i < 4 - count; i++) 
        number = number + '0';
    return number;
};

var randomize = (key) => {
    var random = fillZero(Math.floor((Math.random() * 1000))) | 0;
    
    if (!(key in db)) db[key] = [];
    if (db[key].indexOf(random) != -1) return randomize(key);
    
    db[key].push(random);
    
    fs.writeFileSync(FILE, JSON.stringify(db));
    
    return key + '-' + random;
};

module.exports = randomize;