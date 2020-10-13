import axios, { AxiosResponse } from "axios";

const convertLinkToRawHasteBinLink = (hasteBinLink: string): string | null => {
  if (hasteBinLink.startsWith("https://hastebin.com/raw")) {
    return hasteBinLink.replace(
      "https://hastebin.com/raw",
      "https://hastebin-raw-api.vercel.app/api"
    );
  }
  if (hasteBinLink.startsWith("https://hastebin.com")) {
    return hasteBinLink.replace(
      "https://hastebin.com",
      "https://hastebin-raw-api.vercel.app/api"
    );
  }
  return null;
};

export const isHasteBinLink = (link: string): boolean => {
  return link.startsWith("https://hastebin.com");
};

export const getRawTextFromHasteBin = (
  hasteBinLink: string
): Promise<AxiosResponse<string>> => {
  const rawHasteBinLink = convertLinkToRawHasteBinLink(hasteBinLink);
  if (!rawHasteBinLink) {
    return Promise.reject("Not given a HasteBin link");
  }
  return axios.get(rawHasteBinLink);
};

export const postRawTextToHasteBin = async (
  contents: string
): Promise<AxiosResponse<string>> => {
  return axios.post("https://hastebin-raw-api.vercel.app/api", contents, {
    headers: { "Content-Type": "text/plain" },
  });
};
