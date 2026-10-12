import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import InvestigatePage from "./pages/InvestigatePage";
import ReplayPage from "./pages/ReplayPage";
import ConnectedReportsPage from "./pages/ConnectedReportsPage";
import type { Language } from "./types";
import styles from "./App.module.css";

export default function App() {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <div className={styles.shell}>
      <AppHeader language={language} onLanguageChange={setLanguage} />
      <main className={styles.main} id="main">
        <Routes>
          <Route path="/" element={<InvestigatePage language={language} />} />
          <Route path="/replay" element={<ReplayPage />} />
          <Route path="/reports" element={<ConnectedReportsPage />} />
          <Route path="*" element={<InvestigatePage language={language} />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  );
}
