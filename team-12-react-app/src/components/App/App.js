
import NavBar from "../Navbar";
import WeekBar from "../WeekBar";
import MainCard from "../MainCard";
import React, { useEffect, useState } from "react";

const url = process.env.REACT_APP_DATABASE_URL;

function App() {
  const [tasks, setTasks] = useState([]);

  //sole function that updates state from data recieved from backend
  async function fetchAPI() {
    const response = await fetch(`${url}/user_table`,{
      method: 'GET'
    });
    const data = await response.json();
    console.log(data.payload.command);
    setTasks(data.payload.rows)
  }

  //calls fetchAPI function and updates state with JSON object upon initial render of page
  useEffect(() => {
    fetchAPI();
  }, []);
  

  return (
    <div className="App">
      <NavBar />
      <WeekBar />
      {/*topic prop is hardcoded to allow separation of cards at component level while there are not many topics to have cards for*/}
      <MainCard tasks={tasks} topic="HTML" fetchAPI={fetchAPI} linkToResource={"https://www.freecodecamp.org/news/html-full-course-for-beginners/"}/>
      <MainCard tasks={tasks} topic="Javascript" fetchAPI={fetchAPI} linkToResource={"https://developer.mozilla.org/en-US/docs/Web/JavaScript"}/>
      <MainCard tasks={tasks} topic="CSS" fetchAPI={fetchAPI} linkToResource={"https://www.youtube.com/watch?v=ouncVBiye_M&ab_channel=Fireship"}/>

    </div>
  );
}

export default App;
