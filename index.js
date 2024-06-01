window.addEventListener("load", async function () {
  const users = [];
  const getAllArticle = document.querySelectorAll(".media-article");
  const getOverviews = document.querySelectorAll(".percentage-parent");
  const user1 = await getEachUser(" https://api.github.com/users/ndickers");
  const user2 = await getEachUser("https://api.github.com/users/PHIDELIST");
  const user3 = await getEachUser("https://api.github.com/users/bahdcoder");
  const user4 = await getEachUser("https://api.github.com/users/onaio");
  users.push(user1, user2, user3, user4);

  getAllArticle.forEach(async (article, index) => {
    updateArticles(article, index, users);
  });
  const overviewArr = [user1, user2, user3, user4, user2, user1, user3, user4];

  getOverviews.forEach((userOverview, index) => {
    let updatePercentage = userOverview.children[1].children[1].textContent;
    const value = userOverview.children[0].textContent;
    if (index < 5) {
      userOverview.children[0].textContent = overviewArr[index].days + 16;
      console.log(value);
    } else {
      userOverview.children[0].textContent = overviewArr[index].following + 12;
      updatePercentage = `${(value / 400) * 100}%`;
    }
  });
});

const toggleTheme = document.querySelector("button");

toggleTheme.addEventListener("click", changeTheme);

function changeTheme() {
  const getRootElem = document.querySelector(":root").classList;
  if (getRootElem.contains("dark")) {
    getRootElem.remove("dark");
    toggleTheme.classList.remove("btn-move-right");
    toggleTheme.parentElement.style.background = "var(--dark-grayish-blue)";
  } else {
    getRootElem.add("dark");
    toggleTheme.classList.add("btn-move-right");
    toggleTheme.parentElement.style.background = "var(--lime-green)";
  }
}
async function getEachUser(url) {
  const { followers, following, login, public_repos } = await fetchApiData(url);
  const user = { name: login, days: public_repos, followers, following };

  return user;
}

function fetchApiData(url) {
  return fetch(url).then((res, err) => {
    if (err) {
      return err;
    }
    return res.json().then((data) => data);
  });
}

function updateArticles(element, index, users) {
  if (index === 2) {
    element.children[1].children[1].textContent = users[index].name;
    element.children[2].textContent = users[index].followers;
  }
  element.children[0].children[1].textContent = users[index].name;
  element.children[1].textContent = users[index].followers;
  element.children[3].children[1].textContent = `${users[index].days} Today`;
}

// function createArticle(userName, followers, days) {
//   const article = document.createElement("article");
//   article.setAttribute("class", "media-article");
//   const innerContent = `<div class="flex-div">
//   <img src="./images/icon-facebook.svg" alt="" srcset="" />
//   <p>@${userName}}</p>
//     </div>
//       <p class="followers-count">${followers}</p>
//       <p class="followers-text">Followers</p>
//     <div class="flex-div count-like">
//       <img src="./images/icon-up.svg" alt="" srcset="" />
//     <p class="day-likes">${days} Today</p>
//   </div>
// `;
//   article.appendChild(innerContent);
// }
