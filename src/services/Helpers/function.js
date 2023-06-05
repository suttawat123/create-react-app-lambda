export const validateFileType = (filename, filetype) => {
  try {
    let extall = filetype.toLowerCase();
    let ext = filename.split(".").pop().toLowerCase();
    if (ext === "heic") {
      return true;
    } else if (parseInt(extall.indexOf(ext)) < 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const NumberFormatToFixed = (number) => {
  if (number) {
    if (parseFloat(number.toString()) === 0) {
      return "0.00";
    }

    return parseFloat(number.toString())
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return "0.00";
};
