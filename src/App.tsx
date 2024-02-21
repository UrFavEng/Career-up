import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import {
  AccountSecurity,
  CourseLandingPage,
  CoursesByCat,
  CoursesInstructor,
  Curriculum,
  EditCourse,
  Footer,
  GetMe,
  Home,
  Instructor,
  Login,
  MainPage,
  Navbar,
  Signup,
} from "./components";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/instructor");
  return (
    <div className="App  min-h-[100vh]">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<MainPage />} />
          <Route path="courses/:catid/:catname" element={<CoursesByCat />} />
        </Route>
        <Route path="/myprofile/:id" element={<GetMe />} />
        <Route
          path="/myprofile/:id/account-security"
          element={<AccountSecurity />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/instructor" element={<Instructor />}>
          <Route index element={<CoursesInstructor />} />
          <Route path="edit-course/:id" element={<EditCourse />}>
            <Route index element={<CourseLandingPage />} />
            <Route path="Curriculum" element={<Curriculum />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
