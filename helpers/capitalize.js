const capitalize = (str) => {
  if (str) {
    const wordArray = str.split(' ');
    let capitalizedString = '';
    wordArray.forEach((word, index) => {
      capitalizedString += word.charAt(0).toUpperCase() + word.slice(1);
      if (index < wordArray.length - 1) {
        capitalizedString += ' ';
      }
    });
   return capitalizedString;
  }
}

export default capitalize;
