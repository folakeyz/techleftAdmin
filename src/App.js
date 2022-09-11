import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Login,
  Companies,
  ViewCompany,
  CompanyEmployee,
  CompanyBranch,
  CompanyDepartment,
  CompanyClient,
  Adminstrator,
  TrialAccount,
  Users,
} from "./screens";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" eaxct element={<Login />} />
        <Route path="/app/dashboard" eaxct element={<Dashboard />} />
        <Route path="/app/companies" eaxct element={<Companies />} />
        <Route path="/app/companies/:id" eaxct element={<ViewCompany />} />
        <Route
          path="/app/company/employee/:id"
          eaxct
          element={<CompanyEmployee />}
        />
        <Route
          path="/app/company/branch/:id"
          eaxct
          element={<CompanyBranch />}
        />
        <Route
          path="/app/company/department/:id"
          eaxct
          element={<CompanyDepartment />}
        />
        <Route
          path="/app/company/client/:id"
          eaxct
          element={<CompanyClient />}
        />
        <Route path="/app/admin" eaxct element={<Adminstrator />} />
        <Route path="/app/trial" eaxct element={<TrialAccount />} />
        <Route path="/app/users" eaxct element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
