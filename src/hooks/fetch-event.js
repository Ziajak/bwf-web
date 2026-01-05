import { useState, useEffect, useCallback } from "react";
import { getEvent } from "../services/event-services";

export function useFetchEvent(token, eventId) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // 🔥 FUNKCJA DO (RE)FETCH
  const fetchEvent = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const data = await getEvent(token, eventId);
      setEvent(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [token, eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  // 🔥 ZWRACAMY fetchEvent
  return [event, loading, error, fetchEvent];
}
