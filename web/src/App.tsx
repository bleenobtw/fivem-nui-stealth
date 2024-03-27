import { useState } from 'react'

function App() {
  const [payload, setPayload] = useState("");

  function handlePayloadSubmit(e: any) {
      e.preventDefault();
      (window as any).sendPayload(payload);
      setPayload("");
  }

  return (
    <div>
        <span>{JSON.stringify(payload)}</span>
        <div>
            <input placeholder="Payload Id" value={payload} onChange={(e) => setPayload(e.target.value)} />
            <button onClick={handlePayloadSubmit}>Send Payload</button>
        </div>
    </div>
  )
}

export default App
