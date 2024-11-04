import { StudentTable } from "./components/studentsTable";
import { students } from "./data/students";

function page() {
  return (
    <div className="container mx-auto">
      <StudentTable students={students} />
    </div>
  );
}

export default page;
