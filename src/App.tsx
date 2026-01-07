import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ToolsPage from "./pages/ToolsPage";
import PromptsPage from "./pages/PromptsPage";
import BlogPage from "./pages/BlogPage";
import NotFound from "./pages/NotFound";
import { ToolDetailModal } from "./components/ToolDetailModal";
import { PromptDetailPage } from "./components/PromptDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools" element={<ToolsPage />}>
            <Route path=":slug" element={<ToolDetailModal />} />
          </Route>
          <Route path="/prompts" element={<PromptsPage />}>
            <Route path=":slug" element={<PromptDetailPage />} />
          </Route>
          <Route path="/blog" element={<BlogPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
