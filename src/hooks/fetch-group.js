import {useState, useEffect, useCallback} from "react";
import { getGroup } from "../services/group-services";
import {getEvent} from "../services/event-services";

export function useFetchGroup(groupId){

    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchGroup = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const data = await getGroup(groupId);
      setGroup(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    fetchGroup();
  }, [fetchGroup]);

  return [group, loading, error, fetchGroup];
}


