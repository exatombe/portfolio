const fs = require("fs");
const matter = require("frontmatter");

function readDirAndDisplay(dir) {
    const files = fs.readdirSync(dir);
    return files.map(file => {
      const filePath = `${dir}/${file}`;
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        return readDirAndDisplay(filePath);
      } else {
        return filePath;
      }
    });
  }

    const files = readDirAndDisplay("./posts");

    function getFileContent(file) {
        return fs.readFileSync(file, "utf-8");
    }

console.log(matter(getFileContent(files[0])));