import React, { useEffect, useState } from "react";
import UserData from "./components/UserData";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [sortData, setSortData] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortInfo, setSortInfo] = useState("");
  const [DeleteID, setDeleteID] = useState();

  const handelSort = (e) => {
    // console.log(e.target.value);
    let sort = e.target.value;
    const sortedData = [...userData].sort((a, b) => {
      let sortDiff;
      if (e.target.value == "total") {
        sortDiff = a.twubric.total - b.twubric.total;
      } else if (e.target.value == "friends") {
        sortDiff = a.twubric.friends - b.twubric.friends;
      } else if (e.target.value == "influence") {
        sortDiff = a.twubric.influence - b.twubric.influence;
      } else if (e.target.value == "chirpiness") {
        sortDiff = a.twubric.chirpiness - b.twubric.chirpiness;
      }
      return sortOrder === "asc" ? sortDiff : -sortDiff;
    });
    setSortData(sortedData);
    setSortInfo({ type: e.target.textContent, order: sortOrder });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

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
  useEffect(() => {
    setUserData(userData.filter((item) => item.uid !== DeleteID));
  }, [DeleteID]);

  // console.log(userData);
  // console.log(DeleteID);
  return (
    <div className="flex flex-col items-center gap-7 m-5 bg-gray-100">
      <section className="m-2">
        <p className="font-bold">Sort By</p>
        <div className="grid grid-cols-12 gap-3 ">
          <button
            className="col-span-3 border border-black rounded-md  p-1"
            value="total"
            onClick={handelSort}
          >
            Twubric Score
          </button>
          <button
            className="col-span-3 border border-black rounded-md p-1"
            value="friends"
            onClick={handelSort}
          >
            Friends
          </button>
          <button
            className="col-span-3 border border-black rounded-md p-1"
            value="influence"
            onClick={handelSort}
          >
            Influence
          </button>
          <button
            className="col-span-3 border border-black rounded-md p-1"
            value="chirpiness"
            onClick={handelSort}
          >
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
        {sortInfo && (
          <p>
            sort by {sortInfo.type} in {sortInfo.order} Order
          </p>
        )}
        {!sortData &&
          userData.map((data) => (
            <UserData data={data} setDeleteID={setDeleteID} key={data.uid} />
          ))}
        {sortData &&
          sortData.map((data) => (
            <UserData data={data} setDeleteID={setDeleteID} key={data.uid} />
          ))}
      </section>
    </div>
    // <UserData />
  );
};

export default App;
