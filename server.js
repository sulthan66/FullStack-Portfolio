import { createServer } from "http";
import { extname, join, dirname } from "path";
import { readFile } from "fs";
import { fileURLToPath } from "url";

const PORT = 4000;
const HOST = "localhost";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = createServer((req, res) => {
  readFile(join(__dirname, "public", getFileFromURL(req.url)), (error, file) => {
    if (error) {
      res.writeHead(301, {
        Location: "/404.html",
        "content-type": "text/html",
      });
      return res.end();
    }

    res.writeHead(200, { "content-type": getContentType(extname(req.url)) });
    res.end(file);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

function getFileFromURL(url) {
  switch (url) {
    case "/":
    case "/home":
      return "index.html";
    default:
      return url;
  }
}

function getContentType(_extname) {
  switch (_extname) {
    case ".png":
    case ".jpg":
    case ".jpeg":
    case ".ico":
      return `image/${_extname.substring(1)}`;
    case "":
    case "/":
    case ".html":
      return "text/html";
    case ".css":
      return `text/css`;
    case ".map":
      return `text/map`;
    default:
      return "text/html";
  }
}
