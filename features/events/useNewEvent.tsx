import { EventType } from "@/helpers/types";

function useNewEvent() {
  async function addNewEvent(body: EventType) {
    const res = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let error: string | null = null;
    if (!res.ok) {
      const resData = await res.json();
      error = resData.message || "Ops.. Something went wrong.";
    }
    return error;
  }

  return addNewEvent;
}

export default useNewEvent;
