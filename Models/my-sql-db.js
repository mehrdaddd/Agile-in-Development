const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'my03.winhost.com',
    user: 'oiuuser',
    password: 'AgileTeam',
    database: 'mysql_98398_oiu'
});

var connect = function() {
    connection.connect((err) => {
        if (err) {
            if(err.code != "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {//only show error if error is other then "already connected"
                console.log(err);
                console.log('Failed to connect!');
            }
        }
        else {
            console.log('DB Connected successfully!');
        }

    });
};

var disconnect = function () {
       connection.end((err) => {
        if (err){
            console.log(err);
            console.log('Database not closed!');
        }
        else {
            console.log('Database closed!');
        }
    });
};

var GetEvents = function () {
    connection.query('SELECT * FROM Events', (err, rows) => {
        if(err) throw err;
        else {
            console.log('Data received from Db:\n');
            console.log(rows);
            return rows;
        }
    })
};

exports.openDB = connect;
exports.closeDB = disconnect;
exports.getEvents = GetEvents;
exports.connection= connection;