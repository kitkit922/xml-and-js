let choose; // declare choose as a global variable

function choosePlaylist(button) {
  console.log("button.id"); 
  choose = "button.id";
  // renderGenres();
  return choose;
}

choosePlaylist(someButton); // call the function to set the value of choose

console.log(choose);