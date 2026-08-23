import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client"
import ".//styles/index.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'

const queryClient = new QueryClient();

  ReactDOM.createRoot(document.getElementById("root")).render(

    <QueryClientProvider client={queryClient}>    
    <App />
    </QueryClientProvider>
 

      );
 

