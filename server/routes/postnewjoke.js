var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/ComedyApp';
var express = require('express');
var router = express.Router();

var client = new pg.Client(connectionString);

router.post('/', function(request, response){
    var title = request.body.title;
    var userId = request.user.id;
    var setup = request.body.setup;
    var punchline = request.body.punchline;
    var theme = request.body.theme;
    var subject = request.body.subject;

    client.connect(function(err){
        if (err){
            console.log('connection error', err);
        }
        client.query('INSERT INTO titles (title, user_id) VALUES ($1, $2) RETURNING id', [title, userId], function(err, result){
            if (err){
                console.log(err);
            } else {
                var returnedId = result.rows[0].id;
                insertSetup(returnedId);
                insertPunchline(returnedId);
                insertTheme(returnedId);
                insertSubject(returnedId);
                response.sendStatus(200);
            }
        });
    });
    function insertSetup(id){
        client.query('INSERT INTO setups (setup, title_id) VALUES ($1, $2)', [setup, id], function(err, result){
            if(err){
                console.log('err', err);
            } else {

                console.log('Inserted setup successfully');
            }
        });
    }
    function insertPunchline(id){
        client.query('INSERT INTO punchlines (punchline, title_id) VALUES ($1, $2)', [punchline, id], function(err, result){
            if(err){
                console.log('err', err);
            } else {

                console.log('Inserted punchline successfully');
            }
        });
    }function insertTheme(id){
        client.query('INSERT INTO themes (theme, title_id) VALUES ($1, $2)', [theme, id], function(err, result){
            if(err){
                console.log('err', err);
            } else {

                console.log('Inserted theme successfully');
            }
        });
    }function insertSubject(id){
        client.query('INSERT INTO subject_matter (subject_matter, title_id) VALUES ($1, $2)', [subject, id], function(err, result){
            if(err){
                console.log('err', err);
            } else {

                console.log('Inserted subject-matter successfully');
            }
        });
    }
});




module.exports = router;