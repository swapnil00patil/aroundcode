import React from "react"
import DogVideo from "../../static/bst.mp4"

export default function Home() {
  return (
    <video controls style={{width: '100%', height: 'auto'}}>
      <source src={DogVideo} type="video/mp4" />
    </video>
  );
}