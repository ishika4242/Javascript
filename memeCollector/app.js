const memeBtn = document.getElementById("memeBtn");
const memeOnScreen = document.getElementById("memeOnScreen");

var after = "";

const bg = ["#ed482b", "#f7ae1b", "#73e813", "#13e8c8", "#13e8c8"];
const fg = ["#f7f5f5", "#141414", "#615e60", "#80757d", "#e8dfe6"];

function colorChange() {
  let limit = bg.length;
  let index = Math.floor(Math.random() * limit);
  memeBtn.style.background = bg[index];
  memeBtn.style.color = fg[index];
}

memeBtn.addEventListener("click", function () {
  colorChange();

  if (document.getElementById("memes")) {
    document.getElementById("memes").remove();
  }

  let parentdiv = document.createElement("div");
  parentdiv.id = "memes";
  fetch(`https://www.reddit.com/r/memes.json?after=${after}`)
    .then((response) => response.json())
    .then((body) => {
      after = body.data.after;
      for (let index = 0; index < body.data.children.length; index++) {
        if (body.data.children[index].data.post_hint === "image") {
          let div = document.createElement("div");
          let h4 = document.createElement("h4");
          let image = document.createElement("img");
          image.src = body.data.children[index].data.url_overridden_by_dest;
          h4.textContent = body.data.children[index].data.title;
          div.appendChild(h4);
          div.appendChild(image);
          parentdiv.appendChild(div);
        }
      }
      document.body.appendChild(parentdiv);
    });
});

/*
  const memeCollector = async function () {
    const res = await fetch(
      `https://www.reddit.com/r/memes.json?after=${after}`
    );
    const data = await res.json();
    // const data = res.json();
    // if (!res) return;
    console.log(res, data);

    markup = `<h1>hi</h1>`;
    memeOnScreen.insertAdjacentHTML("beforeend", markup);
  };

  memeCollector();*/
