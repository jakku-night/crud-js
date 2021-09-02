const db = require('../db');

const abm = {};
var ERROR = {
    status: 'ERROR'
};
var OK = {
    status: 'OK'
};
ERROR = JSON.stringify(ERROR);
OK = JSON.stringify(OK);

abm.get_all = async (table) => {
    if(table === ''){
        console.error('[ERROR]: TABLE NOT GIVEN!!!');
    }else{
        try {
            const rows = await db.query('SELECT * FROM ' + table);
            if(rows.length === 0){
                console.error("[ERROR]: DATA NOT FOUND!!!");
                return ERROR;
            }else{
                console.log("[SUCCESS]: QUERY OK");
                return JSON.stringify(rows);
            }
        } catch (error) {
            console.error(error);
            return ERROR;
        }
    }
};
abm.get_sort = async (table = '', key_sort = '', way = 'ASC') => {
    if(table === '' || key_sort === ''){
        console.error('[ERROR]: DATA NOT GIVEN!!!');
    }else{
        try {
            const rows = await db.query('SELECT * FROM ' + table + ' ORDER BY ' + key_sort + ' ' + way);
            if(rows.length === 0){
                console.error("[ERROR]: DATA NOT FOUND!!!");
                return ERROR;
            }else{
                console.log("[SUCCESS]: QUERY OK");
                return JSON.stringify(rows);
            }
        } catch (error) {
            console.error(error);
            return ERROR;
        }
    }
};
abm.search = async (table = '', key_search = [], value = [], match = []) => {
    if(table === '' || key_search === [] || value === []){
        console.error('[ERROR]: DATA NOT GIVEN!!!');
    }else{
        var conditions = '';
        if(key_search.length === value.length && match.length === value.length){
            for(var i = 0; i < match.length; i++){
                conditions += key_search[i] + ' ' + match[i] + ' ' + value[i];
                if(i !== match.length - 1){
                    conditions += ' AND ';
                }
            }
        }else{
            console.error('[ERROR]: KEYS PASSED DOES NOT MATCH WITH VALUES');
        }
        var query = 'SELECT * FROM ' + table + ' WHERE ' + conditions;
        try {
            const rows = await db.query(query);
            if(rows.length === 0){
                console.error("[ERROR]: DATA NOT FOUND!!!");
                return ERROR;
            }else{
                console.log("[SUCCESS]: QUERY OK");
                return JSON.stringify(rows);
            }
        } catch (error) {
            console.error(error);
            return ERROR;
        }
    }
};
abm.seacrh_sort = async (table = '', key_search = [], value = [], match = [], key_sort = '', way = 'ASC') => {
    if(table === '' || key_search === [] || value === []){
        console.error('[ERROR]: DATA NOT GIVEN!!!');
    }else{
        var conditions = '';
        if(key_search.length === value.length && match.length === value.length){
            for(var i = 0; i < match.length; i++){
                conditions += key_search[i] + ' ' + match[i] + ' ' + value[i];
                if(i !== match.length - 1){
                    conditions += ' AND ';
                }
            }
        }else{
            console.error('[ERROR]: KEYS PASSED DOES NOT MATCH WITH VALUES');
        }
        var query = 'SELECT * FROM ' + table + ' WHERE ' + conditions + ' ORDER BY ' + key_sort + ' ' + way;
        try {
            const rows = await db.query(query);
            if(rows.length === 0){
                console.error("[ERROR]: DATA NOT FOUND!!!");
                return ERROR;
            }else{
                console.log("[SUCCESS]: QUERY OK");
                return JSON.stringify(rows);
            }
        } catch (error) {
            console.error(error);
            return ERROR;
        }
    }
};
abm.add_row = async (table = '', new_row = {}) => {
    if(table === '' || new_row === {}){
        console.error("[ERROR]; DATA IS IN BLANK!!!");
        return ERROR;
    }else{
        try {
            const rows = await db.query('INSERT INTO ' + table + ' SET ?', [new_row]);
            if(rows.insertedId !== null){
                console.log("[SUCCESS]: QUERY OK");
                return OK;
            }else{
                console.error("[ERROR]: DATA NOT INSERTED!!!");
                return ERROR;
            }
        } catch (error) {
            console.error(error);
            return ERROR;
        }
    }
};
abm.update_row = async (table = '', row_data = {}, id = '') => {
    if(table === '' || row_data === {} || id === ''){
        console.error("[ERROR]; DATA IS IN BLANK!!!");
        return ERROR;
    }else{
        try {
            const rows = await db.query('UPDATE ' + table + ' SET ? WHERE id = ?', [row_data, id]);
            if(rows.affectedRows !== 0){
                console.log("[SUCCESS]: QUERY OK");
                return OK;
            }else{
                console.error("[ERROR]: DATA NOT UPDATED!!!");
                return ERROR;
            }
        } catch (error) {
            console.error(error);
            return ERROR;
        }
    }
};
abm.delete_row = async (table = '', id = '') => {
    if(table === '' || id === ''){
        console.error("[ERROR]; DATA IS IN BLANK!!!");
        return ERROR;
    }else{
        try {
            const rows = await db.query('DELETE FROM ' + table + ' WHERE id = ?', [id]);
            if(rows.affectedRows !== 0){
                console.log("[SUCCESS]: QUERY OK");
                return OK;
            }else{
                console.error("[ERROR]: DATA NOT DELETED!!!");
                return ERROR;
            }
        } catch (error) {
            console.error(error);
            return ERROR;
        }
    }
};

module.exports = abm;