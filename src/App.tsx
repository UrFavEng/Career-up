import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import {
  AccountSecurity,
  AllCarts,
  AllFavorites,
  CourseById,
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
  SearchCourse,
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
        <Route path="/allFavorites" element={<AllFavorites />} />
        <Route path="/allCarts" element={<AllCarts />} />
        <Route path="/searchCourse/:nameCourse" element={<SearchCourse />} />
        <Route path="/Course/:id" element={<CourseById />} />
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
