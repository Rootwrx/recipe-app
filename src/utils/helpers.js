import { TIMEOUT_SEC } from "./config";

const timeout = (s) =>
  new Promise((_, reject) =>
    setTimeout(
      () =>
        reject(new Error(`Request took too long! Timeout after ${s} seconds`)),
      s * 1000
    )
  );

  const Ajax = async (url, uploadData = undefined) => {
    try {
      const fetchPro = uploadData
      ? fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      })
      : fetch(url);

      const res = await Promise.race([timeout(TIMEOUT_SEC), fetchPro]);
      const data = await res.json();
      if (!res.ok) throw new Error(`${data.message} ${res.status}`);
      return data;
    } catch (err) {
      throw err;
    }
  };


const getUrlSearchParam = (query) => {
  const url = new URL(window.location.href);

  if (query) {
    url.searchParams.set("search", query);
    window.history.pushState({}, "", url.href);
    return;
  }
  return url.searchParams.get("search");
};
export { getJson, getUrlSearchParam };
