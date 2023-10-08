import { useRouter } from "next/router";

import styled from "styled-components";

import Button from "../ui/Button";

const Container = styled.div`
  max-width: 40rem;
  margin: var(--size-4xl) auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--size-4xl);
  color: var(--color-indigo-800);
  p {
    font-size: var(--size-xl);
  }
  button {
    background-color: var(--color-indigo-200);
  }
`;

function Land() {
  const router = useRouter();
  return (
    <Container>
      <h1>Welcome to NextEvents</h1>
      <p>
        Aliquam rhoncus ex eu lectus suscipit, nec pretium lorem viverra.
        Pellentesque nec consectetur nisl. Nulla aliquet purus nec libero congue
        elementum. Donec sed cursus metus, sit amet tristique purus.
      </p>
      <Button onClick={() => router.push("/events")}>
        Discover all events
      </Button>
    </Container>
  );
}

export default Land;
