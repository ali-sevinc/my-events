import { FormEvent, useState, ChangeEvent } from "react";
import { useRouter } from "next/router";

import styled from "styled-components";

import { Container, Form } from "../auth/Login";
import useNewEvent from "./useNewEvent";
import Button from "../ui/Button";

const Control = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
  label {
    width: 12rem;
  }
  input,
  textarea {
    width: 100%;
    color: var(--color-indigo-800);
  }
`;

function NewEvent() {
  const [values, setValues] = useState({
    title: "",
    image: "",
    description: "",
    address: "",
    date: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const addNewEvent = useNewEvent();

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValues((prev) => ({ ...prev, [e.target?.name]: e.target?.value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const body = { ...values, id: crypto.randomUUID() };
    setIsLoading(true);
    const error = await addNewEvent(body);
    if (error) {
      console.log(error);
    } else {
      router.replace("/events");
    }
    setIsLoading(false);
  }

  return (
    <Container>
      <h2>New Event</h2>
      <Form onSubmit={handleSubmit}>
        <Control>
          <label>Title</label>
          <input
            disabled={isLoading}
            value={values.title}
            onChange={handleChange}
            type="text"
            required
            name="title"
          />
        </Control>

        <Control>
          <label>Image</label>
          <input
            disabled={isLoading}
            value={values.image}
            onChange={handleChange}
            type="url"
            required
            name="image"
          />
        </Control>

        <Control>
          <label>Description</label>
          <textarea
            disabled={isLoading}
            onChange={handleChange}
            value={values.description}
            required
            rows={5}
            name="description"
          />
        </Control>

        <Control>
          <label>Address</label>
          <input
            disabled={isLoading}
            onChange={handleChange}
            value={values.address}
            type="text"
            required
            name="address"
          />
        </Control>

        <Control>
          <label>Date</label>
          <input
            disabled={isLoading}
            onChange={handleChange}
            value={values.date}
            type="date"
            required
            name="date"
          />
        </Control>

        <Button>{isLoading ? "Adding..." : "Add"}</Button>
      </Form>
    </Container>
  );
}

export default NewEvent;
