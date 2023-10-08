import styled from "styled-components";

import EventItem from "./EventItem";
import { EventType } from "@/helpers/types";

const Ul = styled.ul`
  max-width: 50rem;
  margin: var(--size-xl) auto;

  @media (max-width: 1024px) {
    max-width: 40rem;
  }
  @media (max-width: 640px) {
    margin: var(--size-4xl) var(--size-lg);
  }
`;

interface PropsType {
  events: EventType[];
}
function EvetsList({ events }: PropsType) {
  return (
    <Ul>
      {events.map((event: EventType) => (
        <EventItem event={event} key={event.id} />
      ))}
    </Ul>
  );
}

export default EvetsList;
