import { EventType } from "@/helpers/types";
import EventsList from "./EvetsList";

interface PropsType {
  events: EventType[];
}

function Events({ events }: PropsType) {
  return <EventsList events={events} />;
}

export default Events;
