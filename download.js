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

const counterEndpoint = document.querySelector('meta[name="download-counter"]').content;
if (counterEndpoint) {
  const trackedSources = new Set([
    ...sources.keys(), "dirfile", "download3k", "ilovefreesoftware", "launchpedia"
  ]);
  const trackedUrl = new URL("/download", counterEndpoint);
  trackedUrl.searchParams.set("source", trackedSources.has(source) ? source : "direct");
  document.getElementById("download").href = trackedUrl.href;
}
