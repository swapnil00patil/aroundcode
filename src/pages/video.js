import React from "react"

export default function Home() {
  const urlParams = new URLSearchParams(window.location.search);
  const file = urlParams.get('file');
  return (
    <video controls style={{width: '100%', height: 'auto'}}>
      <source src={`/${file}`} type="video/mp4" />
    </video>
  );
}