import React from "react";

import { api } from "core";

export function PlaceHolder(_props: {}) {
  const { data, isLoading } = api.user.list.useQuery({
    query: {
      currentPage: 1,
    },
  });

  const { data: each } = api.user.get.useQuery({
    id: "64b2deead7cfb00f4dfe8375",
  });

  const { mutate: create } = api.user.create.useMutation();

  const { mutate: update } = api.user.update.useMutation();

  if (isLoading) {
    return <h2>loading...</h2>;
  }

  const boo = data?.data?.result?.data[0]?.firstName;

  return (
    <div>
      <pre>{JSON.stringify(data?.data?.result?.data[0], null, 2)}</pre>
      <pre>{JSON.stringify(each?.data?.result, null, 2)}</pre>
      <button
        onClick={() => {
          create(
            {
              data: {
                firstName: "",
                lastName: "",
                password: "",
                username: "",
              },
            },
            {
              onSuccess: ({ data: { result } }) => {
                console.log(result);
              },
              onError: ({ message }) => {
                console.log(message);
              },
            }
          );

          update({
            id: "64b2deead7cfb00f4dfe8375",
            data: {
              firstName: "Kuddus",
              lastName: "Mia",
              username: each?.data?.result?.username,
              password: each?.data?.result?.password,
            },
          });
        }}
      >
        UPDATE USER
      </button>
    </div>
  );
}
