import Navbar from "@/components/shared/Navbar";
import Landing from "@/pages/landing/Landing";
import JobPortal from "./(jobseekers)/page";
export default function Home() {
  const login = true;
  return (
    <>
    {login ? <JobPortal /> : <Landing />}
    </>
  );
}