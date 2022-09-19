const textParser = (str) => {
  if (str) {
    str = str.replace(/\[img align=right]/g, '<img class="thumbnail" src="');
    str = str.replace(/\[\/img]/g, '" /> ');
    str = str.replace(/\[img]/g, '<img class="thumbnail" src="');
    str = str.replace(/\[\i]/g, '<i>');
    str = str.replace(/\[\/i]/g, '</i>');
    str = str.replace(/\[b]/g, '<b>');
    str = str.replace(/\[\/b]/g, '</b>');
    str = str.replace(/\[\u]/g, '<u>');
    str = str.replace(/\[\/u]/g, '</u>');
    str = str.replace(/\[center]/g, '');
    str = str.replace(/\[\/center]/g, '');
    str = str.replace(/\[size=[0-9]+\]/g, '');
    str = str.replace(/\[\/size]/g, '');
    str = str.replace(/\[\url=/g, '<a target="_blank" href="');
    str = str.replace(/\[\/url]/g, '/a>');
    str = str.replace(/\]/g, '">');
    // str = str.replace(/\[color/g, '<color');
    // str = str.replace(/\[\/color/g, '</color');
    return str;
  }
}

export default textParser;
