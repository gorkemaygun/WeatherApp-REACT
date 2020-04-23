import React from "react";
import Moment from "moment";
import "moment-timezone";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component {
  state = {};

  getTime = () => {
    setInterval(() => {
      let localtime = Moment()
        .utcOffset(this.state.timezone / 60)
        .format("dddd, MMMM Do YYYY, h:mm:ss a");
      this.setState({
        time: localtime,
      });
    }, 1000);
  };

  getWeather = () => {
    const zipCode = document.getElementById("zipInput").value;

    fetch(
      "http://api.openweathermap.org/data/2.5/weather?zip=" +
        zipCode +
        "&appid=d74695e179808f96917859dcea87adfb" +
        "&units=imperial"
    )
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then((data) => {
          console.log(data);
          this.setState({
            zip: zipCode,
            name: data.name,
            temp: Math.floor(data.main.temp) + " °F",
            timezone: data.timezone,
            description: data.weather[0].main,
          });
          this.getTime();
        });
      })
      .catch((err) => {
        console.log("Fetch Error :-S", err);
      });
  };

  render() {
    return (
      <>
        <body>
          <div className="bckg1">
            <h3>Welcome to Weather App</h3>
            <input
              id="zipInput"
              type="text"
              placeholder="Please Enter ZipCode"
            ></input>
            <button
              className=" btn btn-primary m-5"
              onClick={this.getWeather}
              id="search"
            >
              Search
            </button>
          </div>
          <div className="bckg">
            <p id="name">{this.state.name}</p>
            <p id="temp">{this.state.temp}</p>
            <p id="description">{this.state.description}</p>
            <p id="timezone">{this.state.time}</p>
          </div>
        </body>
      </>
    );
  }
}

export default App;
