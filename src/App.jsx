import React, { useEffect, useState } from "react";
import UserData from "./components/UserData";

const App = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json"
      );
      const data = await response.json();
      // Update component state or use the data here
      // console.log(data);
      setUserData(data);
    };

    fetchData();
  }, []);

  // console.log(userData);
  return (
    <div className="flex flex-col items-center gap-7 m-5 bg-gray-100">
      <section className="m-2">
        <p className="font-bold">Sort By</p>
        <div className="grid grid-cols-12 gap-3 ">
          <button className="col-span-3 border border-black rounded-md  p-1">
            Twubric Score
          </button>
          <button className="col-span-3 border border-black rounded-md p-1">
            Friends
          </button>
          <button className="col-span-3 border border-black rounded-md p-1">
            Influence
          </button>
          <button className="col-span-3 border border-black rounded-md p-1">
            Chirpiness
          </button>
        </div>
      </section>
      <section className="m-2">
        <p className="font-bold">Joined Twitter between</p>
        <div className="grid grid-cols-12 gap-3 ">
          <div className="col-span-6 border border-black   p-1">Start Date</div>
          <div className="col-span-6 border border-black   p-1">End Date</div>
          <input
            type="date"
            className="col-span-6 border border-black rounded-md  p-1"
          />
          <input
            type="date"
            className="col-span-6 border border-black rounded-md  p-1"
          />
        </div>
      </section>
      <section className="flex flex-col w-1/3 gap-3">
        {userData &&
          userData.map((data) => <UserData data={data} key={data.uid} />)}
      </section>
    </div>
    // <UserData />
  );
};

export default App;
