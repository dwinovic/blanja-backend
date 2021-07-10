module.exports = convertionAllPage = async() => {
  // oldPage = 10.333333
  const fixed = await oldPage.toFixed(0); // 10;
  const fixed2 = await oldPage.toFixed(1); // 10.3
  let newPage;
  if (parseInt(fixed) < parseInt(fixed2)) {
    newPage = parseInt(fixed) + 1;
    console.log('no');
  } else {
    newPage = parseInt(fixed);
    console.log('yes');
  }
  console.log(oldPage);
  console.log(fixed);
  console.log(fixed2);
  return;
};