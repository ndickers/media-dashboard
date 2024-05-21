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
  console.log(document.querySelector(":root").classList);
}
