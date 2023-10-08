import styled from "styled-components";

const Container = styled.div`
  margin-top: var(--size-2xl);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Load = styled.div`
  border-width: var(--size-sm);
  border-style: solid;
  background: transparent;
  border-color: var(--color-indigo-800) var(--color-indigo-800)
    var(--color-indigo-800) transparent;
  width: var(--size-4xl);
  height: var(--size-4xl);
  border-radius: 50%;
  position: relative;
  animation: spin 2s infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Loader() {
  return (
    <Container>
      <Load />
    </Container>
  );
}
