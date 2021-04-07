import axios from "axios";

const articleApi = axios.create({
  baseURL: "https://northcoders-news-article-api.herokuapp.com/api",
});

export const getArticles = async (topic) => {
  const { data } = await articleApi.get("/articles", {
    params: { topic: topic, sort_by: "votes" },
  });
  return data.articles;
};

export const getTopics = () => {
  return articleApi.get("/topics").then((res) => {
    return res.data.topics;
  });
};

export const getArticleById = (id) => {
  return articleApi.get(`/articles/${id}`).then((res) => {
    return res.data.article;
  });
};

export const getCommentsByid = (id) => {
  return articleApi.get(`/articles/${id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const addLike = (requestBody, id) => {
  return articleApi.patch(`articles/${id}`, requestBody).then((res) => {
    return res.data.article;
  });
};
