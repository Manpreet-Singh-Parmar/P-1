import { useCallback, useEffect, useRef, useState } from "react";
import { checkHealth } from "../services/api";

export type BackendStatus = "checking" | "online" | "offline";

/** Polls GET /api/health so the workspace can show backend connectivity. */
export function useBackendHealth(intervalMs = 30000): BackendStatus {
  const [status, setStatus] = useState<BackendStatus>("checking");
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const probe = useCallback(async () => {
    try {
      await checkHealth();
      if (mounted.current) setStatus("online");
    } catch {
      if (mounted.current) setStatus("offline");
    }
  }, []);

  useEffect(() => {
    void probe();
    const timer = window.setInterval(() => void probe(), intervalMs);
    return () => window.clearInterval(timer);
  }, [probe, intervalMs]);

  return status;
}
