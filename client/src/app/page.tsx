import Navbar from "@/components/shared/Navbar";
import Landing from "@/pages/landing/Landing";
import JobSeekers from "./(jobseekers)/page";
export default function Home() {
  const login = false;
  return (
    <>
    {login ? <JobSeekers/> : <Landing />}
    </>
  );
}