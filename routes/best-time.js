var express = require('express');
var router = express.Router();
const con = require('../config').mysql_connection;

// POST Create table 
router.post('/create-table',(req,res,next)=>{
  const sql = "CREATE TABLE `best-time` (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, category VARCHAR(10), type VARCHAR(10), date DATE)";
  con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Best time table created!");
      res.send({
        message : 'Best time table created',
        result : result
      })
    });
  })

// GET best-time list 
router.get('/all', function(req, res, next) {
    const sql='SELECT * FROM `best-time`';
    con.query(sql, function (err, result) {
      if (err) throw res.send(err);
      res.send(result)
    });
  });

// GET best-time by best-time id
router.get('/by-id/:bestTimeId',(req,res,next)=>{
    const bestTimeId=req.params.bestTimeId;
    const table = 'best-time'
    const sql=`SELECT * FROM \`${table}\` WHERE id = ${bestTimeId}`
    con.query(sql, function (err, result) {
      if (err) throw res.send(err);
      res.send(result)
    });
  })
  
// GET best-time by user_id
router.get('/by-user-id/:userId',(req,res,next)=>{
    const userId=req.params.userId;
    const table = 'best-time'
    const sql=`SELECT * FROM \`${table}\` WHERE user_id = ${userId}`
    con.query(sql, function (err, result) {
      if (err) throw res.send(err);
      res.send(result)
    });
  })

// POST Create best-time
router.post('/create',(req,res,next)=>{
    const { user_id, category, type, wpm } = req.body;
    const table = 'best-time'
    var sql = `INSERT INTO \`${table}\` (user_id, category, type, date, wpm) VALUES(${user_id},'${category}','${type}', CURDATE(), ${wpm})`

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send({
        info : result,
        message : `best time data added`
      } )
    });
})

// POST Update best time by best-time id
router.post('/update/:bestTimeId',(req,res,next)=>{
    const table='best-time';
    const wpm = req.body.wpm;
    const id = req.params.bestTimeId;
    const sql= `UPDATE \`${table}\` SET wpm = '${wpm}', date = CURDATE() WHERE id = ${id}`
   
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record updated");
        res.send({
          info : result,
          message : `best time data with id ${id} updated`
        } )
      });
})

//GET Top best time
router.get('/top/:number', function(req, res, next) {
    const number= req.params.number;
    const table='best-time';
    const sql=`SELECT * FROM \`${table}\` ORDER BY wpm DESC LIMIT ${number}`;
    con.query(sql, function (err, result) {
      if (err) throw res.send(err);
      res.send(result)
    });
  });


module.exports = router;