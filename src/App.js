import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./App.css";

const App = () => {
  const ref = useRef();
  const ref1 = useRef();
  const [data, setdata] = useState({
    name: "",
    email: "",
  });
  const [mydata, setmydata] = useState([]);

  const [formError, setformError] = useState({});

  const [isvalidate, setisvalidate] = useState(false);

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isvalidate) {
      console.log("submitted");
    }
  }, [formError]);

  const validate = (e) => {
    const errors = {};
    if (!e.name) {
      errors.name = "Name is required";
    }
    if (!e.email) {
      errors.email = "Email is required";
    }
    return errors;
  };
  const changeHandler = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    ref.current.style.color = "red";
    if (data.name === "") {
      setformError({ name: "Name is required" });
      ref1.current.style.border = "2px solid red";
      return;
    }
    if (data.email === "") {
      setformError({ email: "Email is required" });
      ref.current.style.border = "2px solid red";
      return;
    }
    setmydata([...mydata, data]);
    setformError(validate(data));
    setisvalidate(true);
  };

  const deleteHandler = (e) => {
    mydata.splice(e, 1);
    setmydata([...mydata]);
  };

  return (
    <>
      <h1>Contact Manager</h1>
      <form onSubmit={submitHandler}>
        <input
          ref={ref1}
          type="text"
          onChange={changeHandler}
          name="name"
          value={data.name}
          placeholder="name"
        />
        {<p>{formError.name}</p>}
        <input
          type="text"
          ref={ref}
          onChange={changeHandler}
          name="email"
          value={data.email}
          placeholder="email"
        />
        {<p >{formError.email}</p>}
        <button>add</button>
      </form>
      <hr />
      <div className="contacts">
        {mydata?.map((e, i) => (
          <div key={i} className="singleContact">
            <div className="singleContactLeft">
              <h3>{e.name}</h3>
              <p>{e.email}</p>
            </div>
            <div className="singleContactRight">
              <button onClick={() => deleteHandler(i)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  class="bi bi-trash3-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
