const express = require('express');
const db = require('../../db');
const router = express.Router();

var ERROR = {
    status: 'ERROR'
};
var OK = {
    status: 'OK'
};
ERROR = JSON.stringify(ERROR);
OK = JSON.stringify(OK);
const link = '/api/test/';

// GET ALL:
router.get(link, async (req, res) => {
    try {
        const rows = await db.query('SELECT * FROM test');
        if(rows.length === 0){
            console.error("[ERROR]: DATA NOT FOUND!!!");
            res.json(ERROR);
        }else{
            console.log("[SUCCESS]: QUERY OK");
            res.json(JSON.stringify(rows));
        }
    } catch (error) {
        console.error(error);
        res.json(ERROR);
    }
});

// ADD:
router.post(link, async (req, res) => {
    if(req.body === undefined){
        console.error("[ERROR]; DATA IS IN BLANK!!!");
        res.json(ERROR);
    }else{
        if(req.body.task === '' || req.body.description === ''){
            console.error("[ERROR]; DATA IS IN BLANK!!!");
            res.json(ERROR);
        }else{
            const { task, description } = req.body;
            const new_data = {
                task,
                description
            };
            try {
                const rows = await db.query('INSERT INTO test SET ?', [new_data]);
                if(rows.insertedId !== null){
                    console.log("[SUCCESS]: QUERY OK");
                    res.json(OK);
                }else{
                    console.error("[ERROR]: DATA NOT INSERTED!!!");
                    res.json(ERROR);
                }
            } catch (error) {
                console.error(error);
                res.json(ERROR);
            }
        }
    }
});

// UPDATE:
router.put(link, async (req, res) => {
    if(req.body === undefined){
        console.error("[ERROR]; DATA IS IN BLANK!!!");
        res.json(ERROR);
    }else{
        if(req.body.task === '' || req.body.description === '' || req.body.id === ''){
            console.error("[ERROR]; DATA IS IN BLANK!!!");
            res.json(ERROR);
        }else{
            const { task, description, id } = req.body;
            const new_data = {
                task,
                description
            };
            try {
                const rows = await db.query('UPDATE test SET ? WHERE id = ?', [new_data, id]);
                if(rows.affectedRows !== 0){
                    console.log("[SUCCESS]: QUERY OK");
                    res.json(OK);
                }else{
                    console.error("[ERROR]: DATA NOT UPDATED!!!");
                    res.json(ERROR);
                }
            } catch (error) {
                console.error(error);
                res.json(ERROR);
            }
        }
    }
});

// DELETE:
router.delete(link, async (req, res) => {
    if(req.body === undefined){
        console.error("[ERROR]; DATA IS IN BLANK!!!");
        res.json(ERROR);
    }else{
        if(req.body.id === ''){
            console.error("[ERROR]; DATA IS IN BLANK!!!");
            res.json(ERROR);
        }else{
            const { id } = req.body;
            try {
                const rows = await db.query('DELETE FROM test WHERE id = ?', [id]);
                if(rows.affectedRows !== 0){
                    console.log("[SUCCESS]: QUERY OK");
                    res.json(OK);
                }else{
                    console.error("[ERROR]: DATA NOT DELETED!!!");
                    res.json(ERROR);
                }
            } catch (error) {
                console.error(error);
                res.json(ERROR);
            }
        }
    }
});

module.exports = router;