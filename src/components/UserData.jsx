import React from "react";

const UserData = (data) => {
  const {
    uid,
    fullname,
    total = data.data.twubric.total,
    friends = data.data.twubric.friends,
    influence = data.data.twubric.influence,
    chirpiness = data.data.twubric.chirpiness,
    join_date,
  } = data.data;
  // console.log(data.data);
  const date = new Date(join_date * 1000);

  // Format the date in "dd/mm/yyyy" using a different order
  // const formattedDate = date.getDate().toString().padStart(2, '0') + '/' +
  //                      (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
  //                      date.getFullYear();

  const formattedDate = date.toLocaleString().slice(0, 10);
  // console.log(formattedDate);

  const removeUser = (Id) => {
    console.log(Id);
  };

  return (
    <div className="grid grid-rows-3 border border-black ">
      <div className="row-span-1 grid grid-cols-12 border border-black p-1">
        <div className="col-span-10 font-bold p-1  border-r-2 border-r-black">
          {fullname}
        </div>
        <div className="col-span-2 text-center  p-1">{total}</div>
      </div>
      <div className="row-span-1 grid grid-cols-12 border border-black p-1">
        <div className="col-span-4 text-center p-1  border-r-2 border-r-black">
          {friends} Friends
        </div>
        <div className="col-span-4 text-center p-1  border-r-2 border-r-black">
          {influence} Influence
        </div>
        <div className="col-span-4 text-center p-1 ">
          {chirpiness} Chirpiness
        </div>
      </div>
      <div className="row-span-1 grid grid-cols-12 border border-black p-1">
        <div className="col-span-4 text-center  p-1  border-r-2 border-r-black">
          {formattedDate}
        </div>
        <div className="col-span-8 font-bold text-right  p-1">
          <button onClick={() => removeUser(uid)}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default UserData;
