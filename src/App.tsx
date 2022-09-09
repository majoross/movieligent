import "./App.css";
import HomePage from "./pages/home.page";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <div className="App" data-testid="app-testid">
        <HomePage></HomePage>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
