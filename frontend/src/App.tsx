import "./App.css";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./pages/Login";

function App() {
  const queryClient = new QueryClient();
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={""}>
          <Login />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
