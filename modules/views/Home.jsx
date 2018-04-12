import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <main className="main cms-page cms-page-home">
                <h1>{'Home'}</h1>
                <h3> Workshop React, Redux, Magento 2 API</h3>
                <p>Magento 2 API: <a href="http://devdocs.magento.com/guides/v2.2/rest/list.html" target="_blank" rel="noopener noreferrer">Magento 2 API</a></p>
                <p>React: <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React.js Docs</a></p>
                <p>Redux: <a href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">Redux.js Docs</a></p>
            </main>
        );
    }
}

export default Home;
