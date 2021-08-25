import React, { Fragment, useState, useEffect } from 'react';

const initial_state = {
    task: '',
    description: ''
};

const Test = () => {

    const [data, set_data] = useState([initial_state]);
    const [state, set_state] = useState('POST');
    const [current_id, set_current_id] = useState('0');

    const link = 'http://localhost:3000/api/test/';
    const headers = {
        'Access-Control-Allow-Origin': '*'
    };
    const mode = 'cors';

    const get_data = async () => {
        try {
            const res = await fetch(link, {
                method: 'GET',
                mode,
                headers
            });
            const aux = JSON.parse(await res.json());
            if(aux.status === 'ERROR'){
                console.error("[ERROR]: ERROR!!!");
                set_data([]);
            }else{
                set_data(aux);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const send_req = async (event) => {
        event.preventDefault();
        const form_data = new FormData(document.getElementById('form'));
        form_data.append('id', current_id);
        const body = form_data;
        if(state === 'DELETE'){
            const check = confirm('Are you sure to delete this item?');
            if(check){
                try {
                    const res = await fetch(link, {
                        method: state,
                        mode,
                        headers,
                        body
                    });
                    const aux = JSON.parse(await res.json());
                    if(aux.status === 'ERROR'){
                        alert('ERROR');
                    }else{
                        alert('OK');
                        get_data();
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }else{
            try {
                const res = await fetch(link, {
                    method: state,
                    mode,
                    headers,
                    body
                });
                const aux = JSON.parse(await res.json());
                if(aux.status === 'ERROR'){
                    alert('ERROR');
                }else{
                    alert('OK');
                    get_data();
                }
            } catch (error) {
                console.error(error);
            }
        }
        
    };

    useEffect(() => {
        get_data();
    }, []);

    return (
        <Fragment>
            <table id="table" border="1px" border-color="#FFFFFF" >
                <thead>
                    <tr>
                        <td>Task</td>
                        <td>Description</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, key) => {
                            return (
                                <tr key={key} id={item.id}>
                                    <td>{item.task}</td>
                                    <td>{item.description}</td>
                                    <td><button onClick={() => {set_current_id(item.id), set_state('PUT')}} >Edit</button></td>
                                    <td><button onClick={() => {set_current_id(item.id), set_state('DELETE')}} >Erase</button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <button onClick={() => {set_state('POST')}} >Add Task</button>
            <form id="form" onSubmit={send_req} >
                <input type="text" name="task" id="task" placeholder="Task" />
                <input type="text" name="description" id="description" placeholder="Description" />
                <button type="submit" >Submit</button>
            </form>
        </Fragment>
    );
};

export default Test;