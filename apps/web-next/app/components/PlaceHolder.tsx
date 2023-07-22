import React from "react";
import { api } from "@/core";

export function PlaceHolder(_props: {}) {
  const { data } = api.user.list.useQuery({
    query: {
      currentPage: 1,
      age: 18,
    },
  });

  return <pre>{JSON.stringify(data?.data?.result?.data[0], null, 2)}</pre>;
}
