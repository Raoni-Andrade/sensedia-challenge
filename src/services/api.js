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

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/users/create`, userData);
    console.log(response.data.user);
    return response.data.user;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

export const getUserByUsername = async (username) => {
  try {
    const users = await getUsers();
    return users.find(user => user.name === username);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
};

export const getUserData = async () => {
  return {
    username: 'User_47080dcb-afff-45be-8ec0-341ff030fb70',
  };
};