import { useState } from "react"
import "./mailList.css"
import axios from "axios"

const MailList = () => {
  const [feedback, setFeedback] = useState("")

  const handleFeedback = () => {
    if (!feedback || !feedback.trim()) return;

    axios.post("/send-feedback", { feedback }).then(({ data }) => {
      setFeedback("");
      console.log(data);
      alert("Feedback sent successfully!");
    }).catch(console.log)
  }

  return (
    <div className="mail">
      <h1 className="mailTitle">We value your feedback!</h1>
      <span className="mailDesc">Send us an email or any complaints!</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
        <button onClick={handleFeedback}>Send</button>
      </div>
    </div>
  )
}

export default MailList