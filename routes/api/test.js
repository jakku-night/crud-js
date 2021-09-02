const express = require('express');
const abm = require('../../lib/amb');
const router = express.Router();

const link = '/api/test/';

// GET ALL:
router.get(link, async (req, res) => {
   res.json(await abm.get_all('test'));
});

// ADD:
router.post(link, async (req, res) => {
    var table;
    var new_data;
    if(req.body === undefined){
        console.error("[ERROR]; DATA IS IN BLANK!!!");
        table = '';
        new_data = {};
    }else{
        table = 'test';
        const { task, description } = req.body;
        new_data = {
            task,
            description
        };
    }
    res.json(await abm.add_row(table, new_data));
});

// UPDATE:
router.put(link, async (req, res) => {
    var table;
    var row_data;
    var id_;
    if(req.body === undefined){
        console.error("[ERROR]; DATA IS IN BLANK!!!");
        table = '';
        row_data = {};
        id_ = '';
    }else{
        table = 'test';
        const { task, description, id } = req.body;
        row_data = {
            task,
            description
        };
        id_ = id;
    }
    res.json(await abm.update_row(table, row_data, id));
});

// DELETE:
router.delete(link, async (req, res) => {
    var table;
    var id_;
    if(req.body === undefined){
        console.error("[ERROR]; DATA IS IN BLANK!!!");
        id_ = '';
        table = '';
    }else{
        const { id } = req.body;
        id_ = id;
        table = 'test';
    }
    res.json(await abm.delete_row(table, id_));
});

module.exports = router;