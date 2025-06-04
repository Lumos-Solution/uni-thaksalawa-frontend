import { Card } from "../components/Card.jsx";
import maths from "../assets/Card/maths.jpg";
import physics from "../assets/Card/physics.jpg";
import chemistry from "../assets/Card/chemistry.jpg"; 
import { useState } from "react";  


function MyClassesPage() {

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    grade: "",
    link: "",
    time: "",
    date: "",
    teacher: "",
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
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Add New Class</h3>

            <form
              onSubmit={(e) => {                                                                                                      //when u click submit button, run this function
                e.preventDefault();                                                                                                   //e.preventDefault() stops the page from refreshing
                console.log("Submitted class:", formData);   //whhy eeeeeeee
                setShowModal(false);
              }}>

              <input
                type="text"
                placeholder="Title"
                className="w-full mb-2 p-2 border"
                value={formData.title}                             //value={formData.title} shows the previous value for title . next line (onChange) updates the title when we type. 
                                                                   // So when we type letter by letter, the previous letters are shown in the input box because of value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })} //form data is a spread operator, which copies all the properties of formData 
                                                                  // and then updates formData changing title which is taken by e.target.value(user typed value)
              />                                   
              <input
                type="text"
                placeholder="Grade"
                className="w-full mb-2 p-2 border"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              />

              <input
                type="file"
                accept="image/*"
                className="w-full mb-2 p-2 border"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              />
              
              <input
                type="text"
                placeholder="Link"
                className="w-full mb-2 p-2 border"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              />
              <input
                type="text"
                placeholder="Time"
                className="w-full mb-2 p-2 border"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
              <input
                type="date"
                className="w-full mb-2 p-2 border"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              <input
                type="text"
                placeholder="Teacher"
                className="w-full mb-2 p-2 border"
                value={formData.teacher}
                onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
              />

              <div className="flex justify-between mt-4">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Submit</button>
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
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