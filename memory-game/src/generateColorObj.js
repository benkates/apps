function generateColorObj() {
  //define colors
  // let colorList = [
  //   "purple",
  //   "red",
  //   "green",
  //   "orange",
  //   "yellow",
  //   "darkslateblue",
  //   "lightblue",
  //   "darkblue",
  // ];

  let colorList = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
  ];

  //duplicate and shuffle list
  let fullColorList = [...colorList, ...colorList]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  //create an array of objects
  fullColorList.forEach((e, i) => {
    fullColorList[i] = { index: i, color: e, clicked: false, matched: false };
  });

  return fullColorList;
}

export default generateColorObj;
