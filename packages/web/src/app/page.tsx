"use client";

import { z, ZodError } from "zod";
import { http } from "@/libs/http";
import { motion } from "motion/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Page() {
  const query = useQueryClient();

  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const message = useQuery({
    queryKey: ["message"],
    queryFn: async () => {
      return (await http.get<string>("/message")).data;
    }
  });

  const { mutate: update } = useMutation({
    mutationFn: async (message: string) => {
      return await http.post<string>("/message", { message });
    },

    onSuccess: ({ data }) => {
      setInput("");
      query.setQueryData(["message"], data);
    }
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name === "message") {
      setError("");
      setInput(value);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (input === message.data) {
      return setInput("");
    }

    const schema = z
      .string()
      .min(1, { message: "Message cannot be empty" })
      .max(10, { message: "Message cannot be longer than 10 characters" });

    try {
      schema.parse(input);
    } catch (err) {
      if (err instanceof ZodError) {
        return setError(err.errors[0].message);
      }
    }

    update(input);
  };

  if (message.isLoading) {
    return null;
  }

  return (
    <motion.div
      className="px-8 py-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-center text-6xl font-medium">{message.data}</h1>
      <form
        onSubmit={onSubmit}
        className="mx-auto flex max-w-lg flex-col gap-4 p-4"
      >
        <input
          value={input}
          name="message"
          autoComplete="off"
          onChange={onChange}
          className="mt-4 rounded-lg border border-gray-300 bg-neutral-300 p-2 text-center text-3xl font-medium text-neutral-900 focus:outline"
        />
        {error && <p className="text-center text-red-500">{error}</p>}
      </form>
    </motion.div>
  );
}
