//requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const pool = require( './modules/pool' );
const { query } = require('express');

//uses
app.use( express.static('server/public'));

//static server file
app.use(bodyParser.urlencoded({ extended: true }));

//globals
const port = 5000;

//spin up server
app.listen( port, ()=>{
    console.log('server up on:', port);
})

//routes

app.get( '/toDoList', ( req, res )=>{
    console.log( '/toDoList GET OK' );
    // get all messages from db
    const queryString = `SELECT * FROM todolist`;
    pool.query( queryString ).then( ( results )=>{
        res.send( results.rows );
        
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})

app.post('/toDoList', (req, res)=>{
    console.log('/toDoList POST ok:',  req.body);
    let queryString= `INSERT INTO "todolist" (task, completed) VALUES ($1, $2);`
    let values = [req.body.task, req.body.completed];
    pool.query( queryString, values).then( (results)=>{
        res.sendStatus(201); 
    }).catch( (err)=>{
        console.log(error);
        res.sendStatus(500);
    })
})

app.delete( '/toDoList', (req, res)=>{
    let queryString = `DELETE FROM "todolist" where id=${req.query.id};`
    pool.query( queryString).then( (results)=>{
        res.sendStatus( 200);
    }).catch( (err)=>{
        res.sendStatus(500);
    })
})

app.put( '/toDoList', (req, res)=>{
    console.log('/toDoList PUT:', req.query);
    let queryString = `UPDATE "todolist" SET completed=true WHERE id=${req.query.id};`
    pool.query( queryString).then( (results)=>{
        res.sendStatus(200);
    }).catch( (err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})