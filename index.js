import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://wearethechampion-ac5ad-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const db = getDatabase(app);
const chatListInDB = ref(db, "chatList");
push(ref(db, "test for string"), "første variable pushet selv.");

const inputFieldEl = document.querySelector("textarea");
focustextarea();
const submitted = document.querySelector("button");
const uls = document.getElementById("chat");
const to = document.getElementById("to");
const from = document.getElementById("from");
let chatboble = {};
// .topersonname
// .frompersonname
// .messageToSubmit
// .likebuttonInnerText

submitted.addEventListener("click", function () {
  let chatboble = {};
  chatboble.messageToSubmit = inputFieldEl.value;
  chatboble.topersonname = to.value;
  chatboble.frompersonname = from.value;
  console.log(chatboble.topersonname);
  console.log(chatboble.frompersonname);
  if (chatboble.frompersonname === "") {
    alert("You must enter your name to chat!");
    return;
  } else if (chatboble.messageToSubmit === "") {
    alert("You must enter a message to chat!");
    return;
  }
  chatboble.likebuttonInnerText = [""];

  push(chatListInDB, chatboble);

  // creating message

  // <!--Dette er et eksempel på en chat som er publisert-->
  //   <li class="classli">
  //   <ul class="classlu lito">
  //   <li class="tofromli nameli">To: Tord</li>
  //        </ul>
  //      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos vero
  //    fuga, mollitia sint commodi distinctio nihil tempore nemo architecto
  //  necessitatibus?
  //        <ul class="classlu lifrom">
  //        <li class="tofromli nameli">From: Vincent</li>
  //      <li class="tofromli reaksjonli">
  //      <button class="likes">♥ 1</button>
  //  </li>
  //        </ul>
  //    </li>
  //  <!--Dette er et eksempel på en chat som er publisert-->

  clearinputfield();
});

function displayendorsement(chatboble) {
  let topersonli = document.createElement("li");
  if (chatboble.topersonname === "") {
    topersonli.innerText = "To: Everyone";
  } else {
    topersonli.innerText = "To: " + chatboble.topersonname;
  }
  topersonli.classList.add("tofromli", "nameli");
  let topersonul = document.createElement("ul");
  topersonul.appendChild(topersonli);
  topersonul.classList.add("classlu", "lito");

  let likebutton = document.createElement("button");
  console.log(chatboble.likebuttonInnerText);

  if (chatboble.likebuttonInnerText.length - 1) {
    likebutton.innerText = "♥ " + chatboble.likebuttonInnerText.length - 1;
  } else {
    likebutton.innerText = "♥ 0";
  }
  likebutton.classList.add("likes");

  let likebuttonli = document.createElement("li");
  likebuttonli.appendChild(likebutton);
  likebuttonli.classList.add("tofromli", "reaksjonli");

  let frompersonli = document.createElement("li");
  frompersonli.innerText = "From: " + chatboble.frompersonname;
  frompersonli.classList.add("tofromli", "nameli");
  let frompersonul = document.createElement("ul");
  frompersonul.appendChild(frompersonli);
  frompersonul.appendChild(likebuttonli);
  frompersonul.classList.add("classlu", "lifrom");

  let nyli = document.createElement("li");
  nyli.appendChild(topersonul);
  nyli.append(chatboble.messageToSubmit);
  nyli.appendChild(frompersonul);
  nyli.classList.add("classli");
  uls.appendChild(nyli);
  // created message

  console.log(chatboble);
}

[to, from, inputFieldEl].forEach(function (element) {
  element.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitted.click();
      focustextarea();
    }
  });
});

//onvalue:
onValue(chatListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    clearchat();
    console.log(itemsArray);
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let chatbobleID = currentItem[0];
      let chatboblevalue = currentItem[1];
      if (
        chatboblevalue.frompersonname === to.value ||
        chatboblevalue.frompersonname === from.value ||
        chatboblevalue.topersonname === "Everyone"
      ) {
        console.log(chatboblevalue.frompersonname);
        displayendorsement(chatboblevalue);
      }
    }
  } else {
    uls.innerHTML = "No chats yet.";
  }
});

function slettchat() {
  console.log("slett");
}

function focustextarea() {
  inputFieldEl.focus();
}

function clearinputfield() {
  inputFieldEl.value = "";
}

function clearchat() {
  uls.innerHTML = "";
}
