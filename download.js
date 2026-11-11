const source = new URLSearchParams(location.search).get("source");
const sources = new Map([
  ["launch-post", "AzanClock-launch-post.exe"],
  ["freeware-directory", "AzanClock-directory.exe"]
]);
const file = sources.get(source);
if (file) {
  document.getElementById("download").href =
    "https://github.com/Blank871/azan-clock/releases/download/v1.0.0/" + file;
}
