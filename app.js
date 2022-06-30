const displayFileName = () => {
  const uploadBox = document.querySelector(".upload-box");
  let fileName = fileUpload.files[0].name;
  fileNameText = document.createElement("div");
  fileNameText.classList.add("filename-text");
  imageIcon = document.createElement("img");
  imageIcon.src = "image-icon.svg";
  fileNameInnerText = document.createElement("div");
  fileNameInnerText.innerText = fileName;
  fileNameText.appendChild(imageIcon);
  fileNameText.appendChild(fileNameInnerText);
  uploadBox.appendChild(fileNameText);
};

const showLoader = () => {
  const loader = document.querySelector("#loader");
  loader.classList.add("display");
};

const hideLoader = () => {
  const loader = document.querySelector("#loader");
  loader.classList.remove("display");
};

const showSidText = () => {
  const sidText = document.querySelector("#sid-text");
  sidText.classList.add("display");
};

const uploadScreenshot = (event) => {
  const pre = document.getElementById("pre");
  const container = document.querySelector(".container");

  event.preventDefault();
  showLoader();
  const fileField = document.querySelector('input[type="file"]');

  const startTime = new Date().getTime();

  fetch("https://api.sidfinder.com/", {
    method: "POST",
    body: fileField.files[0],
  })
    .then((response) => response.json())
    .then((result) => {
      const endTime = new Date().getTime();
      let totalTime = endTime - startTime;
      totalTime /= 1000;
      totalTime = totalTime.toFixed(1);

      console.log(`It took ${totalTime} seconds to get the request`);
      hideLoader();
      showSidText();

      for (let i = 0; i < result.sids.length; i++) {
        let code = document.createElement("code");
        code.innerHTML = result.sids[i];
        pre.appendChild(code);
      }

      responseTimeDiv = document.createElement("div");
      responseTimeDiv.classList.add("response-time");
      responseTimeDiv.innerText = `API Response Time: ${totalTime}s`;
      container.appendChild(responseTimeDiv);
    })
    .catch((error) => {
      hideLoader();
      let code = document.createElement("code");
      code.innerText = ` ${error}`;
      pre.appendChild(code);
      console.log(error);
    });
};

const submitButton = document.getElementById("submitButton");
const fileUpload = document.getElementById("file-upload");

submitButton.addEventListener("click", uploadScreenshot);
fileUpload.addEventListener("change", displayFileName);
