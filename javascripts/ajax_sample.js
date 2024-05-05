let videodata;
let number = 0;
const videoArea = document.getElementById("video");
const titleArea = document.getElementById("title");
const contentArea = document.getElementById("content");
const button = document.getElementById("btn");

function registerClickEvent() {
  // ボタンがクリックされた際の処理を記述
  button.addEventListener("click", changeVideo);
}

function changeVideo() {
  //console.log("changeVideoはじめました～♬");
  if (videodata) {
    titleArea.innerHTML = videodata[number].title;
    contentArea.innerHTML = videodata[number].content;
    videoArea.setAttribute("src", videodata[number].url);
    number == 2 ? (number = 0) : number++;
  } else {
    afterSendPromise()
      .then(changeVideo)
      .catch(function () {
        console.log("動画データ取得失敗");
      });
  }
}
window.onload = registerClickEvent();

function afterSendPromise() {
  return new Promise(function (resolve, reject) {
    // console.log("jsonデータ取得はじめました～♪");
    // ajax.jsonからデータを取得する処理を記述
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status == 200) {
          //console.log("レスポンス届きました～");
          videodata = request.response;
          // console.log(videodata);
          resolve();
        } else {
          reject();
        }
      }
    };
    request.open("GET", "ajax.json");
    request.responseType = "json";
    request.send(null);
  });
}
