import { Card } from "../components/Card.jsx";
import maths from "../assets/Card/maths.jpg";
import physics from "../assets/Card/physics.jpg";
import chemistry from "../assets/Card/chemistry.jpg"; 
export default function MyEnrollmentsPage() {
    return (

        <div className="my-classes-page">
      
            <h2 className="text-2xl font-bold mb-4 page title" >My Enrolled Classes</h2>
            <p>These are classes that you enrolled in and are currently studying</p>
            <p>Click on the button to view and see class resources</p>
            <br/>

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






    )
}