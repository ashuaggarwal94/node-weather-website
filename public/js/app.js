const weather = (location, callback) => {
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      callback(data);
    });
  });
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  let contentPara1 = document.getElementById("content1");
  let contentPara2 = document.getElementById("content2");
  let errorPara = document.getElementById("error");
  errorPara.textContent = "";
  contentPara1.textContent = "Loading.....";
  contentPara2.textContent = "";
  weather(location, (data) => {
    if (data.error) {
      contentPara1.textContent = contentPara2.textContent = "";
      errorPara.textContent = data.error;
    } else {
      contentPara1.textContent = "location: " + data.place;
      contentPara2.textContent = "Weather: " + data.weather;
    }
  });
});
