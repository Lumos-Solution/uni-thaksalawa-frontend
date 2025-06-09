import {Card} from "../components/Card.jsx";
import maths from "../assets/Card/maths.jpg";
import {useState} from "react";
import searchIcon from "../assets/search.png";
import {addClass} from "../service/MyClassService.js";



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
        classImage: null,
    });


    const [classes, setClasses] = useState([]);            //This creates a state called classes, which starts as an empty list. It's used to store classes user has created by setClasses().
    return (
        <div className="my-classes-page mt-24">

            {/* Header row: My Classes title + Add Class button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-center w-full">My Classes</h2>
                <div className="absolute right-6">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Class
                    </button>
                </div>
            </div>

            <div className="flex justify-center mb-6">
                <div className="relative">
                    <img
                        src={searchIcon}
                        alt="search"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50"
                    />
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="p-2 pl-10 border border-gray-300 rounded w-[300px]"
                    />
                </div>
            </div>


            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-28">
                    <div className="bg-white p-6 rounded shadow-lg w-[550px]">
                        <h3 className="text-lg font-bold mb-4">Add New Class</h3>

                        <form
                            // onSubmit={(e) => {                                                                                                      //when u click submit button, run this function
                            //   e.preventDefault();    //stop page from refreshing when submitting
                            //   setClasses((prevClasses) => [...prevClasses, formData]); //Add the current formData to the 'classes' state

                            //   console.log("Submitted class:", formData);   //whhy eeeeeeee
                            //   setShowModal(false);   // Close the modal after submitting


                            //   setFormData({    //Reset form back to empty after submitting
                            //     classType: "physical",
                            //     title: "",
                            //     subject: "",
                            //     location: "",
                            //     date: "",
                            //     time: "",
                            //     fee: "",
                            //     image: null,
                            //   });
                            // }}

                            onSubmit={async (e) => {
                                e.preventDefault();

                                try {
                                    const username = localStorage.getItem("username");
                                    const addedClass = await addClass(formData, username);

                                    setClasses((prevClasses) => [...prevClasses, addedClass]);

                                    // Reset modal and form
                                    setShowModal(false);
                                    setFormData({
                                    classType: "physical",
                                    title: "",
                                    subject: "",
                                    location: "",
                                    date: "",
                                    time: "",
                                    fee: "",
                                    image: null,
                                    });
                                } catch (error) {
                                    alert("Failed to add class. Check the console for details.");
                                    console.error("Error submitting class:", error);
                                }
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
                                        onChange={(e) => setFormData({...formData, classType: e.target.value})}
                                    /> Physical
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="classType"
                                        value="online"
                                        checked={formData.classType === "online"}
                                        onChange={(e) => setFormData({...formData, classType: e.target.value})}
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
                                onChange={(e) => setFormData({
                                    ...formData,
                                    title: e.target.value
                                })} //form data is a spread operator, which copies all the properties of formData
                                // and then updates formData changing title which is taken by e.target.value(user typed value)
                            />

                            <label className="block font-semibold">Subject:</label>
                            <input
                                type="text"
                                placeholder="Enter Subject"
                                className="p-2 border rounded w-full"
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                            />

                            <label className="block font-semibold">Location:</label>
                            <select
                                className="p-2 border rounded w-full"
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}>
                                {["Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Monaragala", "Ratnapura", "Kegalle"].map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>

                            <label className="block font-semibold">Date:</label>
                            <input
                                type="date"
                                className="p-2 border rounded w-full"
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                            />

                            <label className="block font-semibold">Time:</label>
                            <input
                                type="time"
                                className="p-2 border rounded w-full"
                                value={formData.time}
                                onChange={(e) => setFormData({...formData, time: e.target.value})}
                            />

                            <label className="block font-semibold">Fee:</label>
                            <input
                                type="number"
                                placeholder="Fee in Rs."
                                className="p-2 border rounded w-full"
                                value={formData.fee}
                                onChange={(e) => setFormData({...formData, fee: e.target.value})}
                            />

                            <label className="block font-semibold">Class Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="p-2 border rounded w-full"
                                onChange={(e) => setFormData({...formData, classImage: e.target.files[0]})}
                            />

                            <div className="flex mt-4 w-full gap-8">
                                <button type="button" onClick={() => setShowModal(false)}
                                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 flex-1">Cancel
                                </button>
                                <button type="submit"
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex-1">Submit
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

            <div className="class-container mt-6">
                {classes.map((classItem, index) => (
                    <Card
                        key={index}
                        image={classItem.classImage ? URL.createObjectURL(classItem.classImage) : maths} // use uploaded image or default
                        title={classItem.title}
                        subject={classItem.subject}
                        classType={classItem.classType}
                        location={classItem.location}
                        date={classItem.date}
                        time={classItem.time}
                        fee={classItem.fee}
                        link="#"
                    />
                ))}
            </div>


            {/* <div className="class-container">

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

      </div> */}
        </div>
    );
}

export default MyClassesPage;
//modal,form, form label, add class btn, submit btn