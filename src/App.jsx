import React from "react"
import Papa from "papaparse";

function App() {
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRPPjTAmzmSznT6bBux6bL2_febW7uAvUiPjNbiuO7v34kqrotHx1mO95H72VrQXmbrL2TO6GJj2Y5K/pub?gid=379483611&single=true&output=csv'

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const response = fetch(sheetUrl)
      .then((response) => response.text())
      .then((data) => setData(Papa.parse(data, { header: true }).data))
      .catch((err) => console.log(err));  
  }, []);

  return (
    <>
      <div className="px-4 py-5 space-y-3">
        <h1 className="text-3xl font-bold">Louvor IPR São José</h1>
        <p>Este repertório contém músicas utilizadas pelo Ministério de Louvor da IPR São José</p>
      </div>
      <ul className="px-4 py-5 grid gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((music, index) => (
          <li key={index} className="px-4 py-5 border rounded-lg">
            <span className="space-y-3">
              <div className="flex items-center gap-x-3">
                <div>
                  <span className="block text-sm text-indigo-600 font-medium">{music.interpreter}</span>
                  <h3 className="text-base text-gray-800 font-semibold mt-1">{music.title}</h3>
                </div>
              </div>
              <div className="text-sm text-gray-600 flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2">
                    <span className="font-bold">Tom:</span> {music.tone}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-bold">BPM:</span> {music.bpm}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <a href={music.cypher} className="px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200">
                    Cifra
                  </a>
                  <a href={music.audio} className="px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200">
                    Audio
                  </a>
                </div>
              </div>
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
