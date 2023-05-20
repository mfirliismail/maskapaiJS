let airport_data = [
  {
    Code: "CGK",
    Name: "Soekarno Hatta International Airport",
    City: "Jakarta",
  },
  {
    Code: "YIA",
    Name: "Yogyakarta International Airport",
    City: "Yogyakarta",
  },
  {
    Code: "DPS",
    Name: "Ngurah Rai International Airport",
    City: "Denpasar",
  },

  {
    Code: "SIN",
    Name: "Changi International Airport",
    City: "Singapore",
  },
];
let airlines_data = [
  {
    Code: "GA",
    Name: "Garuda Indonesia",
  },
  {
    Code: "SQ",
    Name: "Singapore Airlines",
  },
  {
    Code: "QZ",
    Name: "Air Asia Indonesia",
  },
];
let jadwal_data = [
  {
    airlines: "GA",
    departure_airport: "CGK",
    departure_time: "2021-08-17T08:20",
    arival_airport: "SIN",
    arival_time: "2021-08-17T10:50",
  },
  {
    airlines: "SQ",
    departure_airport: "CGK",
    departure_time: "2021-08-17T17:00",
    arival_airport: "SIN",
    arival_time: "2021-08-17T19:30",
  },
  {
    airlines: "QZ",
    departure_airport: "CGK",
    departure_time: "2021-08-17T10:05",
    arival_airport: "DPS",
    arival_time: "2021-08-17T12:20",
  },
  {
    airlines: "GA",
    departure_airport: "CGK",
    departure_time: "2021-08-17T13:10",
    arival_airport: "YIA",
    arival_time: "2021-08-17T14:20",
  },
];

function findAirlineByKode(code) {
  return airlines_data.find((e) => e.Code === code)?.Name;
}

function findAirportCity(code) {
  return airport_data.find((e) => e.Code === code)?.City;
}

const filterFlightTime = (airlines, from, to) => {
  console.log(from, to);
  if (from == 0 && to == 0 && airlines == "all") {
    return jadwal_data;
  }
  let filteredData = jadwal_data.filter((flight) => {
    const departureTime = new Date(flight.departure_time).getHours();
    const arrivalTime = new Date(flight.arival_time).getHours();
    console.log(departureTime);
    console.log(arrivalTime);

    return departureTime >= from && arrivalTime <= to;
  });

  if (airlines !== "all") {
    filteredData = filteredData.filter(
      (flight) => flight.airlines === airlines
    );
  }

  return filteredData;
};

function sortingJadwal(data, field, type) {
  let sortData = data.sort(function (a, b) {
    let timeA;
    let timeB;
    if (field === "airlines") {
      timeA = a.airlines;
      timeB = b.airlines;
      if (type === "asc") {
        return timeA.localeCompare(timeB);
      } else {
        return timeB.localeCompare(timeA);
        // return timeB - timeA;
      }
    } else {
      timeA = new Date(a.departure_time);
      timeB = new Date(b.departure_time);
      if (type === "asc") {
        return timeA - timeB;
      } else {
        return timeB - timeA;
      }
    }
  });

  console.log(sortData);
  return sortData;
}
let onClickSort = () => {};

window.addEventListener("DOMContentLoaded", (event) => {
  const filterBtn = document.getElementById("filter-btn");
  const maskapaiSelect = document.getElementById("maskapai");
  const from = document.getElementById("from");
  const to = document.getElementById("to");

  filterBtn.addEventListener("click", () => {
    const selectedMaskapai = maskapaiSelect.value;
    const selectedFrom = parseInt(from.value);
    const selectedTo = parseInt(to.value);
    let result;
    result = filterFlightTime(selectedMaskapai, selectedFrom, selectedTo);

    renderTable(result);
  });

  const formatDate = (date) => {
    var time = date.split("T")[1];
    var hours = time.split(":")[0];
    var minutes = time.split(":")[1];
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };
  const formatDateMonth = (date) => {
    var stringDate = date.split("T")[0];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dateParts = stringDate.split("-");
    const day = dateParts[2];
    const monthIndex = parseInt(dateParts[1]) - 1;

    return day + " " + months[monthIndex];
  };
  const renderTable = (jadwal_data) => {
    let results = "";
    for (var i = 0; i <= jadwal_data.length; i++) {
      if (jadwal_data[i]) {
        let airlines = findAirlineByKode(jadwal_data[i].airlines);
        let departure_airport = findAirportCity(
          jadwal_data[i].departure_airport
        );
        let arival_airport = findAirportCity(jadwal_data[i].arival_airport);
        let arrival_time = formatDate(jadwal_data[i].arival_time);
        let arrival_date = formatDateMonth(jadwal_data[i].arival_time);
        let departure_time = formatDate(jadwal_data[i].departure_time);
        let departure_date = formatDateMonth(jadwal_data[i].departure_time);

        results += ` <li class="list-group-item m-2 border rounded-lg shadow">
       <div class="d-flex p-4 justify-content-between align-items-center">
       <span class="flight-number h4">${airlines}</span>
        <div class="d-flex flex-row align-items-center">
          <div class="d-flex justify-center align-items-center flex-column mr-4"> 
            <span>${departure_airport}</span>
            <p class="h3">${departure_time}</p>
            <span>${departure_date}</span>
        
          </div>

          <img width="30" height="30" src="./plane.png" class="mr-4 ml-4" />

        <div class="d-flex justify-center align-items-center flex-column mr-4 ml-4"> 
          <span>${arival_airport}</span>
          <p class="h3">${arrival_time}</p>
          <span>${arrival_date}</span> 
        </div>


       </div>

       </div>
      </li>`;
        // results += `<tr>
        //     <td>${airlines}</td>
        //     <td><div>${departure_airport} - ${departure_time}</div></td>
        //     <td><div>${arival_airport} - ${arrival_time}</div></td>
        //   </tr>`;
      }
    }
    document.querySelector("#jadwal").innerHTML = results;
  };
  onClickSort = () => {
    console.log("clicked", event);
    const sortBy = document.getElementById("sort-by");
    const sortValue = document.getElementById("sort-value");

    const selectedSortBy = sortBy.value;
    const selectedSortValue = sortValue.value;

    console.log(sortBy.value, sortValue.value);
    let result = sortingJadwal(jadwal_data, selectedSortBy, selectedSortValue);
    renderTable(result);
  };
  // Render Table
  renderTable(jadwal_data);
});
