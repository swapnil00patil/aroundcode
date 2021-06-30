import React, { useEffect, useState } from "react"

export default function Home() {
  const [file, setFile] = useState(null)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setFile(urlParams.get('file'))
  }, [])
  return (
    file && <video controls style={{width: '100%', height: 'auto'}}>
      <source src={`/${file}`} type="video/mp4" />
    </video>
  );
}