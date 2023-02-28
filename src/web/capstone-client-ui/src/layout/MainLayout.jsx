import React from "react";
import "./mainLayout.css";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
export default function MainLayout() {
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  );
}
