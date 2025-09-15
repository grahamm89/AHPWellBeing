
async function loadDefault(){
  const res = await fetch("data.json",{cache:"no-store"});
  const json = await res.json();
  document.getElementById("editor").value = JSON.stringify(json, null, 2);
}
document.getElementById("load-default").addEventListener("click", loadDefault);
document.getElementById("download-json").addEventListener("click", ()=>{
  const txt = document.getElementById("editor").value;
  try{
    const parsed = JSON.parse(txt);
    localStorage.setItem("wb_data_override", JSON.stringify(parsed));
    const blob = new Blob([JSON.stringify(parsed,null,2)], {type:"application/json"});
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "data.json"; a.click();
  }catch(e){ alert("Invalid JSON: " + e.message); }
});
document.getElementById("clear-local").addEventListener("click", ()=>{
  localStorage.removeItem("wb_data_override"); alert("Local override cleared.");
});
document.getElementById("file-input").addEventListener("change", async (e)=>{
  const f = e.target.files?.[0]; if(!f) return;
  try{ const txt = await f.text(); document.getElementById("editor").value = JSON.stringify(JSON.parse(txt), null, 2); }
  catch{ alert("Not valid JSON."); }
});
loadDefault();
