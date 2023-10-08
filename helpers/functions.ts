import { compare } from "bcryptjs";

export function getSlug(title: string) {
  const slug = title.toLowerCase().replaceAll(" ", "-");
  const urlSlug = encodeURIComponent(slug);
  return urlSlug;
}

export function changeAddress(address: string) {
  const readableAddress = address.replaceAll(", ", " ");
  return readableAddress;
}

export function changeDate(date: string) {
  const readDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return readDate;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
