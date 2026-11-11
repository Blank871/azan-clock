const counterIds = new Map([
  ["AzanClock.exe", "direct"],
  ["AzanClock-launch-post.exe", "launch"],
  ["AzanClock-directory.exe", "directory"]
]);
const status = document.getElementById("status");
const format = new Intl.NumberFormat();
async function loadDownloads() {
  const response = await fetch("https://api.github.com/repos/Blank871/azan-clock/releases/tags/v1.0.0");
  if (!response.ok) throw new Error("Release counts unavailable");
  const {assets} = await response.json();
  let total = 0;
  for (const [name, id] of counterIds) {
    const asset = assets.find(item => item.name === name);
    if (!Number.isInteger(asset?.download_count)) throw new Error("Missing download count");
    total += asset.download_count;
    document.getElementById(id).textContent = format.format(asset.download_count);
  }
  document.getElementById("total").textContent = format.format(total);
  document.getElementById("stats").hidden = false;
  status.textContent = "Version 1.0 · Latest counts reported by GitHub";
}
loadDownloads().catch(() => {
  status.textContent = "GitHub could not load the counts. Refresh this page to try again.";
});

const counterEndpoint = document.querySelector('meta[name="download-counter"]').content;
const countryStatus = document.getElementById("country-status");
const countries = new Intl.DisplayNames([document.documentElement.lang], { type: "region" });
const sourceNames = new Map([
  ["direct", "Official download page"],
  ["launch-post", "Launch post"],
  ["freeware-directory", "Freeware directory"],
  ["dirfile", "DirFile"],
  ["download3k", "Download3K"],
  ["ilovefreesoftware", "I Love Free Software"],
  ["launchpedia", "Launchpedia"]
]);

async function loadCountries() {
  const response = await fetch(new URL("/stats", counterEndpoint));
  if (!response.ok) throw new Error("Country counts unavailable");
  const { results } = await response.json();
  let total = 0;
  const table = document.getElementById("country-table");
  for (const { country, source, starts } of results) {
    total += starts;
    const row = table.tBodies[0].insertRow();
    row.insertCell().textContent = country === "ZZ" ? "Unknown" : countries.of(country);
    row.insertCell().textContent = sourceNames.get(source) || source;
    row.insertCell().textContent = format.format(starts);
  }
  if (!results.length) {
    countryStatus.textContent = "No download starts have been recorded yet.";
    return;
  }

  countryStatus.textContent = format.format(total) + " download starts since tracking began.";
  table.hidden = false;
}

if (counterEndpoint) {
  countryStatus.textContent = "Loading country counts…";
  loadCountries().catch(() => {
    countryStatus.textContent = "Country counts are temporarily unavailable. Refresh to try again.";
  });
}
