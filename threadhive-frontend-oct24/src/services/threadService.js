import { fetchAPI } from "../api/apiClient";
import { THREAD_API } from "../config/apiConfig";

export async function fetchRecentThreads() {
  // Your Code Here
  const res=await fetchAPI(THREAD_API.GET_ALL,{
    method: "GET"
  });
  return res.data;
}

export async function fetchThreadById(threadId) {
  // Your Code Here
  const res=await fetchAPI(THREAD_API.GET_BY_ID(threadId),{
    method: "GET"
  });
  return res.data;
}

export const createThread = async (data) => {
  // Your Code Here
  const res=await fetchAPI(THREAD_API.CREATE,{
    method:"POST",
    body:JSON.stringify(data)
  });
  return res.data;
};

export async function upvoteThread(threadId) {
  // Your Code Here
  const res=await fetchAPI(THREAD_API.UPVOTE(threadId),{
    method: "POST"
  });
  return res.data;
}

export async function downvoteThread(threadId) {
  // Your Code Here
  const res=await fetchAPI(THREAD_API.DOWNVOTE(threadId),{
    method: "POST"
  });
  return res.data;
}
