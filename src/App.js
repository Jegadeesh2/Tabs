import React, { useEffect, useState } from "react";
import "./App.css";
import { FaArrowRight } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const url = "https://course-api.com/react-tabs-project";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const [value, setValue] = useState(0);

  const fetchPeople = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPeople(data);
    setIsLoading(false);
  };
  
  useEffect(() => {
    fetchPeople();
  }, []);
  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  const { company, dates, duties, title } = people[value];
  return (
    <div className="App">
      <h1 className="title">Experience</h1>
      <div className="underline"></div>
      <section className="btn-container">
        {people.map((person, index) => {
          return (
            <button
              type="button"
              key={uuidv4()}
              className={`btn ${index === value && "active-btn"}`}
              onClick={() => {
                setValue(index);
              }}
            >
              {person.company}
            </button>
          );
        })}
      </section>
      <article className="container">
        <h3>{company}</h3>
        <p className="job-title">{title}</p>
        <p className="date">{dates}</p>
        {duties.map((duty) => {
          return (
            <div className="desc-container" key={uuidv4()}>
              <FaArrowRight className="icon" />
              <p className="description">{duty}</p>
            </div>
          );
        })}
      </article>
    </div>
  );
};
export default App;
