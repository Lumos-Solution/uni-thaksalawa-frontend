import { Card } from "../components/Card.jsx";
import maths from "../assets/Card/maths.jpg";
import physics from "../assets/Card/physics.jpg";
import chemistry from "../assets/Card/chemistry.jpg"; 
import { useState } from "react";  


function MyClassesPage() {

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    classType: "physical",
    title: "",
    subject: "",
    location: "",
    date: "",
    time: "",
    fee: "",
    image: null,
  });

  return (
    <div className="my-classes-page">
      
      <h2 className="text-2xl font-bold mb-4 page title" >My Classes</h2>
      <p>These are classes that you added and are currently teaching</p>
      <p>Click on the button to view and add class resources</p>
      <br/>

      <button
        onClick={() => setShowModal(true)}                                                                                              //when button clicked, set showModal to true
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Class
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[550px]">
            <h3 className="text-lg font-bold mb-4">Add New Class</h3>

            <form
              onSubmit={(e) => {                                                                                                      //when u click submit button, run this function
                e.preventDefault();                                                                                                   //e.preventDefault() stops the page from refreshing
                console.log("Submitted class:", formData);   //whhy eeeeeeee
                setShowModal(false);
              }}
              className="grid grid-cols-[150px_1fr] gap-4 items-center">


  <label className="font-semibold">Class Type:</label>
  <div className="flex gap-4">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="classType"
                    value="physical"
                    checked={formData.classType === "physical"}
                    onChange={(e) => setFormData({ ...formData, classType: e.target.value })}
                  /> Physical
                </label>
                <label>
                  <input
                    type="radio"
                    name="classType"
                    value="online"
                    checked={formData.classType === "online"}
                    onChange={(e) => setFormData({ ...formData, classType: e.target.value })}
                  /> Online
                </label>
                </div>


              <label className="block font-semibold">Title:</label>
              <input
                type="text"
                placeholder="Enter title"
                className="p-2 border rounded w-full"
                value={formData.title}                             //value={formData.title} shows the previous value for title . next line (onChange) updates the title when we type. 
                                                                   // So when we type letter by letter, the previous letters are shown in the input box because of value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })} //form data is a spread operator, which copies all the properties of formData 
                                                                  // and then updates formData changing title which is taken by e.target.value(user typed value)
              />    



              <label className="block font-semibold">Subject:</label>                               
              <input
                type="text"
                placeholder="Enter Subject"
                className="p-2 border rounded w-full"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />


              <label className="block font-semibold">District (Location):</label>              
              <select
                className="p-2 border rounded w-full"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}>
                {["Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Monaragala", "Ratnapura", "Kegalle"].map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>


              <label className="block font-semibold">Date:</label>
              <input
                type="date"
                className="p-2 border rounded w-full"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />



              <label className="block font-semibold">Time:</label>
              <input
                type="time"
                className="p-2 border rounded w-full"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />


              <label className="block font-semibold">Fee (Rs.):</label>
              <input
                type="number"
                placeholder="Fee in Rs."
                className="p-2 border rounded w-full"
                value={formData.fee}
                onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
              />



              <label className="block font-semibold">Class Image:</label>
              <input
                type="file"
                accept="image/*"
                className="p-2 border rounded w-full"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              />
              
              <div className="flex mt-4 w-full gap-8">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 flex-1">Cancel</button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex-1">Submit</button>
                
              </div>

            </form>
          </div>
        </div>
      )}

      <div className="class-container">

        <Card
          image={maths}
          title="Math Class"
          text="Grade 11"
          link="https://example.com/math-class"
          time={<span><strong>Time:</strong> 10am - 11am</span>}
          date={<span><strong>Date:</strong> 2023-10-01</span>}
          teacher={<span><strong>Teacher:</strong> John Doe</span>}
        />

        <Card
          image={physics}
          title="Physics Class"
          text="Grade 12"
          link="https://example.com/physics-class"
          time={<span><strong>Time:</strong> 1pm - 2pm</span>}
          date={<span><strong>Date:</strong> 2023-10-02</span>}
          teacher={<span><strong>Teacher:</strong> Jane Smith</span>}
        />

        <Card
          image={chemistry}
          title="Chemistry Class"
          text="Grade 11"
          link="https://example.com/chemistry-class"
          time={<span><strong>Time:</strong> 3pm - 4pm</span>}
          date={<span><strong>Date:</strong> 2023-10-03</span>}
          teacher={<span><strong>Teacher:</strong> Michael Brown</span>}
        />

      </div>
    </div>
  );
}

export default MyClassesPage;
//modal,form, form label, add class btn, submit btn