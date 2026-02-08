import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ToolsPage from "./pages/ToolsPage";
import ToolDetailPage from "./pages/ToolDetailPage";
import PromptsPage from "./pages/PromptsPage";
import DocsPage from "./pages/DocsPage";
import DocDetailPage from "./pages/DocDetailPage";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
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
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/:slug" element={<ToolDetailPage />} />
          <Route path="/prompts" element={<PromptsPage />}>
            <Route path=":slug" element={<PromptDetailPage />} />
          </Route>
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/:slug" element={<DocDetailPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
