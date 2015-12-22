var express = require('express'),
    app = express();
    mongojs = require('mongojs');
    db = mongojs('contactlist', ['contactlist']),
    bodyParser = require('body-parser');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.route('/contactlist').get(function(req, res) {
    db.contactlist.find(function(err, docs) {
        res.json(docs);
    });
}).post(function(req, res) {
    db.contactlist.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

app.delete('/contactlist/:id', function(req, res) {
    db.contactlist.remove({id: req.params.id}, function(err, doc) {
        if (!err)
            res.send("success");
        else
            res.status(500).send("error");
    });
});

app.put('/contactlist/:id', function(req, res) {
    db.contactlist.update({_id: mongojs.ObjectId(req.params.id)}, {name: req.body.name,
        email: req.body.email, phone: req.body.phone}, function(err, doc) {
            if (!err) {
                console.log("done");
                res.send("success")
            }
            else{
                res.status(500).send("error");
            }
        });
});

app.listen(3000);