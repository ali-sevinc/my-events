import { FormEvent, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import styled from "styled-components";

import Button from "../ui/Button";

export const Container = styled.div`
  max-width: 40rem;
  margin: var(--size-2xl) auto;
  background-color: var(--color-indigo-800);
  color: var(--color-gray-200);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--size-2xl);
  padding: var(--size-3xl) var(--size-2xl);

  @media (max-width: 640px) {
    margin: var(--size-2xl) var(--size-xl);
  }
`;
export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--size-2xl);
`;
export const Control = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
  label {
    width: 12rem;
  }

  input {
    width: 100%;
    color: var(--color-indigo-800);
  }
`;

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !email.includes("@") || !password || password.length < 5) {
      return;
    }
    setIsLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    if (!res?.error) {
      router.replace("/");
    }
    setIsLoading(false);
  }

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Control>
          <label htmlFor="email">Email</label>
          <input
            disabled={isLoading}
            ref={emailRef}
            id="email"
            type="email"
            required
            placeholder="example@example.com"
          />
        </Control>
        <Control>
          <label htmlFor="password">Password</label>
          <input
            disabled={isLoading}
            ref={passwordRef}
            id="password"
            type="password"
            required
          />
        </Control>
        <Button disabled={isLoading}>
          {isLoading ? "Loging..." : "Login"}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
