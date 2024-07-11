import "./App.scss"
import {Route, Routes} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import {ProtectedRoute} from "./context/protectRouter";
import {Secret} from "./context/Secret";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import VerifyEmailPlaceholderPage from "./pages/VerifyEmailPlaceholder/vefifyMailPlaceholderPage";
import {SnackbarProvider} from "notistack";
import VerifiedEmail from "./pages/VerifiedEmail/VerifiedEmail";
import DemoSocket from "./pages/demosocket/demo";

function App() {

    return (
        <AuthProvider>
            <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
            <Routes>
                <Route path="/" element={
                    // <NoHeaderLayout>
                    //      <Home/>
                    // </NoHeaderLayout>
                    <DemoSocket/>
                    } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/holder" element={<VerifyEmailPlaceholderPage />} />
                <Route path="/verifyEmail" element={<VerifiedEmail />} />
                <Route
                    path="/secret"
                    element={
                        <ProtectedRoute>
                            <Secret />
                        </ProtectedRoute>
                    }
                />
            </Routes>
                </SnackbarProvider>
        </AuthProvider>
    );
}

export default App;
