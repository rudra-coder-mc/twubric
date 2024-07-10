import React, { useEffect, useState } from "react";
import UserData from "./components/UserData";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]); // Combined state for displaying data
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortInfo, setSortInfo] = useState("");
  const [DeleteID, setDeleteID] = useState();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value).getTime() / 1000); // Convert to seconds since epoch
    // console.log(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(new Date(event.target.value).getTime() / 1000);
    // console.log(event.target.value);
  };

  const handelSort = (e) => {
    let sort = e.target.value;
    const sortedData = [...userData].sort((a, b) => {
      let sortDiff;
      if (e.target.value == "total") {
        sortDiff = a.twubric.total - b.twubric.total;
      } else if (e.target.value == "friends") {
        sortDiff = a.twubric.friends - b.twubric.friends;
      } else if (e.target.value == "influence") {
        sortDiff = a.twubric.influence - b.twubric.influence;
        // console.log(sortDiff);
      } else if (e.target.value == "chirpiness") {
        sortDiff = a.twubric.chirpiness - b.twubric.chirpiness;
      }
      return sortOrder === "asc" ? sortDiff : -sortDiff;
    });
    setDisplayedData(sortedData);
    setSortInfo({ type: e.target.textContent, order: sortOrder });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json"
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here, like displaying an error message to the user (e.g., using a state variable and conditional rendering)
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleFiltering = () => {
      let filteredData = [...userData]; // Start with original data

      // Apply sorting if displayedData exists (using combined state)
      if (displayedData.length) {
        filteredData = displayedData;
      }

      // Apply date filtering if both dates are selected
      if (startDate && endDate) {
        filteredData = filteredData.filter((item) => {
          const joinDate = item.join_date;
          return joinDate >= startDate && joinDate <= endDate;
        });
      }

      setDisplayedData(filteredData);
    };

    // Call handleFiltering on relevant state changes
    handleFiltering();
  }, [userData, sortOrder, startDate, endDate]);

  useEffect(() => {
    setDisplayedData(userData.filter((item) => item.uid !== DeleteID));
  }, [DeleteID, userData]);
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
            chirpiness
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
            onChange={handleStartDateChange}
          />
          <input
            type="date"
            className="col-span-6 border border-black rounded-md  p-1"
            onChange={handleEndDateChange}
          />
        </div>
      </section>

      <section className="flex flex-col w-1/3 gap-3">
        {sortInfo && (
          <p>
            sort by {sortInfo.type} in {sortInfo.order} Order
          </p>
        )}
        {/* {!displayedData.length &&
          userData.map((data) => (
            <UserData data={data} setDeleteID={setDeleteID} key={data.uid} />
          ))} */}
        {displayedData.map((data) => (
          <UserData data={data} setDeleteID={setDeleteID} key={data.uid} />
        ))}
      </section>
    </div>
  );
};

export default App;
