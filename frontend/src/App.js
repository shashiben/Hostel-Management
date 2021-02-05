import React from "react";
import HomeView from "../src/screens/homeView";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/header";
import Footer from "./components/footer";
import AddStudentView from "./screens/addStudentView";
import AnalysisView from "./screens/analysisView";
import LoginView from "./screens/Authentication Screens/LoginView";
import RegisterView from "./screens/Authentication Screens/RegisterView";
import StudentDetailsView from "./screens/studentDetailsView";
import AttendanceView from "./screens/attendanceView";
import ProfileView from "./screens/profileView";
import UserListView from "./screens/userListView";
import UserEditView from "./screens/userEditView";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/user/:userId/edit" component={UserEditView} />
          <Route path="/userList" component={UserListView} />
          <Route path="/profile" component={ProfileView} />
          <Route path="/attendance" component={AttendanceView} />
          <Route path="/analysis" component={AnalysisView} />
          <Route path="/addStudent" component={AddStudentView} />
          <Route path="/student/edit/:id" component={AddStudentView} exact />
          <Route path="/student/:id" component={StudentDetailsView} exact />
          <Route path="/login" component={LoginView} exact />
          <Route path="/register" component={RegisterView} exact />
          <Route path="/search/:keyword" component={HomeView} exact />
          <Route path="/page/:pageNumber" component={HomeView} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeView}
            exact
          />
          <Route path="/" component={HomeView} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
