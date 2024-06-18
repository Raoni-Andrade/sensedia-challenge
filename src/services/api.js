import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/users`);
    return response.data.users;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return null;
  }
};

export const getAlbums = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/albums`);
    const allAlbums = response.data.albums;
    return allAlbums;
  } catch (error) {
    console.error('Erro ao buscar álbuns:', error);
    return null;
  }
};

export const getAlbumsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/users/${userId}/albums`);
    return response.data.albums;
  } catch (error) {
    console.error(`Erro ao buscar álbuns do usuário ${userId}:`, error);
    return null;
  }
};

export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/posts`);
    const allPosts = response.data.albums;
    return allPosts;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return null;
  }
};

export const getPostsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/users/${userId}/posts`);
    const allPosts = response.data.posts;
    return allPosts;
  } catch (error) {
    console.error(`Erro ao buscar posts do usuário ${userId}:`, error);
    return null;
  }
};
