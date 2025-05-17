// MyClassesPage.jsx
import { Card } from "../components/Card.jsx";

function MyClassesPage() {
  return (
    <div className="my-classes-page">
      <h2 className="page-title">My Classes</h2>
      <div className="cards-wrapper">
        <Card
          image="https://picsum.photos/200/200"
          title="Math Class"
          text="Grade 11"
          link="google.com"
          time="🕒 Time: 10am - 11am"
          date="🗓️ Date: 2023-10-01"
          teacher="👨‍🏫 Teacher: John Doe"
        />
        {/* Add more cards here if needed */}
      </div>
    </div>
  );
}

export default MyClassesPage;
