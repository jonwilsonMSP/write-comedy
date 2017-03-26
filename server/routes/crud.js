var pg = require('pg');
var express = require('express');
var router = express.Router();
var parseDbUrl = require("parse-database-url");
require('dotenv').config();

var config = parseDbUrl(process.env.DATABASE_URL);

var pool = new pg.Pool(config);

router.delete('/deleteitem/:id', function(request, response) {
    var id = request.params.id;
    pool.connect(function (err, client) {
        if (err) {
            console.log('connection error', err);
        }

        client.query('DELETE FROM titles WHERE id=$1;', [id], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                response.sendStatus(200);
            }
        });
    });
});

router.put('/replacesetup/', function(request, response) {
    var id = request.body.id;
    var text = request.body.text;

    pool.connect(function (err, client) {
        if (err) {
            console.log('connection error', err);
        }

        client.query('UPDATE titles SET setup_punch=$1 WHERE id=$2;', [text, id], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                response.sendStatus(200);
            }
        });
    });
});

router.put('/addtosetup/', function(request, response) {
    console.log('request.body:', request.body);
    var id = request.body.id;
    var text = request.body.text;

    pool.connect(function (err, client) {
        if (err) {
            console.log('connection error', err);
        }

        client.query('UPDATE titles SET setup_punch =$1 WHERE id=$2;', [text, id], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                    response.sendStatus(200);
                }
            });
        });
    });


router.put('/addtoSM/', function(request, response) {
    console.log('request.body:', request.body);
    var id = request.body.id;
    var text = request.body.text;

    pool.connect(function (err, client) {
        if (err) {
            console.log('connection error', err);
        }
        client.query('UPDATE titles SET subject_matter = $1 WHERE id=$2;', [text, id], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                response.sendStatus(200);
            }
        });
    });
});

router.put('/addtotopic/', function(request, response) {
    console.log('request.body:', request.body);
    var id = request.body.id;
    var text = request.body.text;

    pool.connect(function (err, client) {
        if (err) {
            console.log('connection error', err);
        }

        client.query('UPDATE titles SET topics = $1 WHERE id=$2;', [text, id], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                    response.sendStatus(200);
                }
        });
    });
});

router.put('/addtotheme/', function(request, response) {
    console.log('request.body:', request.body);
    var id = request.body.id;
    var text = request.body.text;
    console.log("request.body.text", request.body.text);

    pool.connect(function (err, client) {
        if (err) {
            console.log('connection error', err);
        }

        client.query('UPDATE titles SET themes = $1 WHERE id=$2;', [text, id], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                    response.sendStatus(200);
            }
        });
    });
});

router.put('/addstatement/', function(request, response) {
    console.log('request.body:', request.body);
    var id = request.body.id;
    var text = request.body.text;

    pool.connect(function (err, client) {
        if (err) {
            console.log('connection error', err);
        }

        client.query('UPDATE titles SET statements = $1 WHERE id=$2;', [text, id], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                    response.sendStatus(200);
            }
        });
    });
});

router.put('/addaltsetup/', function(request, response) {
    console.log('request.body:', request.body);
    var id = request.body.id;
    var text = request.body.text;

    pool.connect(function (err, client) {
        if (err) {
            console.log('connection error', err);
        }

        client.query('UPDATE titles SET alt_setup_punch = $1 WHERE id=$2;', [text, id], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                response.sendStatus(200);
            }
        });
    });
});

router.put('/addaltsm/', function(request, response) {
    console.log('request.body:', request.body);
    var id = request.body.id;
    var text = request.body.text;

    pool.connect(function (err, client) {
        if (err) {
            console.log('connection error', err);
        }

        client.query('UPDATE titles SET alt_subject_matter = $1 WHERE id=$2;', [text, id], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                    response.sendStatus(200);
            }
        });
    });
});

router.put('/addalttopic/', function(request, response) {
    //console.log('request.body:', request.body);
    var id = request.body.id;
    var text = request.body.text;

    pool.connect(function (err, client) {
        if (err) {
            console.log('connection error', err);
        }

        client.query('UPDATE titles SET alt_topics = $1 WHERE id=$2;', [text, id], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                    response.sendStatus(200);
            }
        });
    });
});

router.put('/addalttheme/', function(request, response) {
    console.log('request.body:', request.body);
    var id = request.body.id;
    var text = request.body.text;

    pool.connect(function (err, client) {
        if (err) {
            console.log('connection error', err);
        }

        client.query('UPDATE titles SET alt_themes = $1 WHERE id=$2;', [text, id], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                    response.sendStatus(200);
            }
        });
    });
});

router.get('/alternatematerial/:id', function(request, response){
    var id = request.params.id;

    pool.connect(function(err, client, done){
        if (err){
            console.log('connection error', err);
            done();
        }
        client.query('select titles.title, titles.id, titles.setup_punch, titles.topics, titles.subject_matter, titles.statements, titles.themes, titles.alt_subject_matter, titles.alt_themes, titles.alt_topics from titles WHERE id=$1;', [id], function(err, result){
                if (err){
                    console.log(err);
                } else {
                    console.log("result.rows", result.rows);
                    response.send(result.rows);
                }
            });

    });
});

module.exports = router;