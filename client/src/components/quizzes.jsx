import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/quiz/allquizzes");
        console.log(res.data);
        setQuizzes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedData();
  }, []);

  return (
    <div>
      {quizzes.map((e) => {
        return (
          <article key={e.id} class="border round">
            <div class="row">
              {/* <img class="circle large" src="/beer-and-woman.svg" /> */}
              <div class="max">
                <h5>{e.quizName}</h5>
              </div>
            </div>
            <nav>
              <button>Open</button>
            </nav>
          </article>
        );
      })}
    </div>
  );

}
