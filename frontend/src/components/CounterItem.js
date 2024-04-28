import React from "react";

const CounterItem = ({ count, label }) => (
  <div className="col-6 col-sm-6 col-lg-3">
    <div className="counter-item">
      <h3>
        <span className="odometer">{count}</span>
      </h3>
      <p>{label}</p>
    </div>
  </div>
);

const Counter = () => (
  <div className="counter-area three">
    <div className="counter-wrap">
      <div className="container">
        <div className="row">
          <CounterItem count="15" label="Years Experienced" />
          <CounterItem count="156" label="Happy Clients" />
          <CounterItem count="756" label="Project Completed" />
          <CounterItem count="22" label="Active Project" />
        </div>
      </div>
    </div>
  </div>
);

export default Counter;
