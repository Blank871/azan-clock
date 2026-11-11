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
