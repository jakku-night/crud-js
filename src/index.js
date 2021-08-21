import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Test from './components/Test';

const App = () => {
    return (
        <Fragment>
            <h3>Hello doumo!</h3>
            <Test />
        </Fragment>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));