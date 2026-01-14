import { MoodleUsersZodSchemas } from "@/schemas/moodle/users";
import z from "zod";

export function safeJsonParse(message: string, fallback = { error: "Internal Server Error" }) {
  try {
    return JSON.parse(message);
  } catch {
    return fallback.error
      ? { error: message || fallback.error }
      : fallback;
  }
}

export function safeJsonStringify(message: string, fallback = { error: "Internal Server Error" }) {
  try {
    return JSON.stringify(message);
  } catch {
    return fallback.error
      ? { error: message || fallback.error }
      : fallback;
  }
}

export const createUserTransformer = (data: z.infer<typeof MoodleUsersZodSchemas.CoreUserCreateUsers>) => {
  const mapped: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        mapped[`users[0][${key}][${nestedKey}]`.toLowerCase()] = nestedValue;
      }
    } else {
      mapped[`users[0][${key === "phone" ? "phone1" : key}]`.toLowerCase()] = value;
    }
  }
  return mapped;
}