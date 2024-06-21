import axios from 'axios';
import {
  getUsers,
  getAlbums,
  getAlbumsByUserId,
  getPosts,
  getPostsByUserId,
  createUser,
  deleteUser,
  getUserByUsername,
  getUserData,
} from '../services/api';

jest.mock('axios');

describe('API functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getUsers should return an array of users', async () => {
    const users = [{ id: 1, name: 'João' }, { id: 2, name: 'Maria' }];
    axios.get.mockResolvedValueOnce({ data: { users } });

    const result = await getUsers();

    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/v1/users');
    expect(result).toEqual(users);
  });

  test('getAlbums should return an array of albums', async () => {
    const albums = [{ id: 1, title: 'Album 1' }, { id: 2, title: 'Album 2' }];
    axios.get.mockResolvedValueOnce({ data: { albums } });

    const result = await getAlbums();

    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/v1/albums');
    expect(result).toEqual(albums);
  });
  
  test('getAlbumsByUserId should return an array of albums for a specific user', async () => {
    const userId = 1;
    const albums = [{ id: 1, title: 'Album 1' }, { id: 2, title: 'Album 2' }];
    axios.get.mockResolvedValueOnce({ data: { albums } });
    const result = await getAlbumsByUserId(userId);
    expect(axios.get).toHaveBeenCalledWith(`http://localhost:8080/api/v1/users/${userId}/albums`);
    expect(result).toEqual(albums);
  });
  
  test('createUser should create a new user', async () => {
    const userData = { name: 'Ray Boston', email: 'rayboston@example.com' };
    const createdUser = { id: 1, name: 'Ray Boston', email: 'rayboston@example.com' };
    axios.post.mockResolvedValueOnce({ data: { user: createdUser } });
    const result = await createUser(userData);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/v1/users/create', userData);
    expect(result).toEqual(createdUser);
  });
  
  test('deleteUser should delete a user', async () => {
    const userId = 1;
    const message = 'User deleted successfully';
    axios.delete.mockResolvedValueOnce({ data: { message } });
    const result = await deleteUser(userId);
    expect(axios.delete).toHaveBeenCalledWith(`http://localhost:8080/api/v1/users/${userId}`);
    expect(result).toEqual(message);
  });
  
  test('getUserData should return user data', async () => {
    const userData = { username: 'User_47080dcb-afff-45be-8ec0-341ff030fb70' };
    const result = await getUserData();
    expect(result).toEqual(userData);
  });

});

