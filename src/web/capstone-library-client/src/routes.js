import { useRoutes } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import Home from "./views/Home/Home";

export default function Route() {
    return useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: "*",
                    element: (
                      <h4 className="body-content" style={{ borderBottom: "none" }}>
                        Trang không tồn tại! 404 not found
                      </h4>
                    ),
                  },
            ]
        }
    ])
}