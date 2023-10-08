import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

import styled from "styled-components";

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--size-2xl) var(--size-4xl);
  background-color: var(--color-indigo-800);
  color: var(--color-gray-200);
  ul {
    display: flex;
    width: 40%;
    gap: var(--size-3xl);
  }
  button {
    background-color: transparent;
    border: none;
  }
  nav a,
  nav button {
    &:hover {
      color: var(--color-gray-400);
      text-decoration: underline;
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Logo = styled.p`
  font-size: var(--size-3xl);
  font-weight: bold;
`;

function MainHeader() {
  const { data: session, status } = useSession();

  function handleLogout() {
    signOut();
  }

  return (
    <Container>
      <Logo>
        <Link href="/">NextEvents</Link>
      </Logo>
      <nav>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>
          {session && (
            <li>
              <Link href="/events/new-event">New</Link>
            </li>
          )}
          {!session && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </Container>
  );
}

export default MainHeader;
