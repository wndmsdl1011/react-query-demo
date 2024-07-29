import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const ReactQueryPage = () => {
  const fetchPost = () => {
    return axios.get("http://localhost:3000/posts");
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPost,
    retry: 1,
    select: (data) => {
      return data.data;
    },
    gcTime: 5000,
  });
  console.log("data", data, isLoading);
  console.log("error", isError, error);

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div>{data.map(((item) => <div>{item.title}</div>))}</div>
  );
};

export default ReactQueryPage;
