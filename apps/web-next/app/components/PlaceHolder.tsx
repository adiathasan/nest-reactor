import React from "react";
import { api } from "@/core";
import { useQuery } from "@tanstack/react-query";

export function PlaceHolder(_props: {}) {
  const { data, isLoading } = useQuery<{}>(["todos"], () => {
    return fetch("http://localhost:5000/api/v1/user/list").then((res) =>
      res.json()
    );
  });

  api.user.list.useQuery({
    page: 1,
    limit: 10,
  });

  api.user.create.useMutation();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
