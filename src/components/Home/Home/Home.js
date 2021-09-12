import React from "react";
import Header from "../Header/Header";
import UserData from "../UserData/UserData";
import UserForm from "../UserForm/UserForm";

const Home = () => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Header />
      <UserForm />
      <UserData />
    </div>
  );
};

export default Home;
