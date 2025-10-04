const { useState, useEffect } = React;

// Sword Component
const Sword = () => {
    return (
        <div className="sword">
            <div className="sword-blade"></div>
            <div className="sword-hilt"></div>
            <div className="sword-pommel"></div>
        </div>
    );
};

// Stone Component
const Stone = () => {
    return (
        <div className="stone"></div>
    );
};

// Title Component
const Title = () => {
    return (
        <div className="title">
            <h1>hi this is the website your looking for</h1>
        </div>
    );
};

// Main App Component
const App = () => {
    return (
        <div>
            <Title />
            <div className="sword-container">
                <Stone />
                <Sword />
            </div>
        </div>
    );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
