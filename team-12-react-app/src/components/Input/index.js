import React from "react";
import { useState } from "react";


//tied input field and addToList button/function together due their linked functionality
function Input({fetchAPI, topic}) {
  const [text, setText] = useState("");

  function captureUserInput(e) {
    setText(e.target.value);
  }

   function addToList() {
    
    async function postAPI() {
      const response = await fetch("http://localhost:3005/user_table",
      {method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({task: text, topic : topic})
    })
    const data = await response.json()
    console.log(data.payload.command)
    }

    //fetchAPI called around postAPI to counter postAPI function only updating database and not updating state when called
    fetchAPI();
    postAPI();
    fetchAPI();
  }

  return (
    <div className="input--container">
      <input
        type="text"
        onChange={captureUserInput}
        placeholder="Add tasks here..."
        className="input--field"
      ></input>
      <div className="button--container">
        <button onClick={addToList} className="add-button">
          +
        </button>
      </div>
    </div>
  );
}

export default Input;
