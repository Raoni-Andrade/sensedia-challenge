export const getUsers = jest.fn(() =>
  Promise.resolve([
    {
      id: "088a302c-5c9e-4c66-b01b-7a2cc8d48d94",
      name: "User_47080dcb-afff-45be-8ec0-341ff030fb70",
      email: "user_47080dcb-afff-45be-8ec0-341ff030fb70@example.com",
      created_at: "2024-06-17T19:35:00.067657-03:00",
      updated_at: "2024-06-17T19:35:00.067657-03:00"
    },
    {
      id: "b518c273-6337-407c-9cf9-8613e359fffb",
      name: "User_ef451051-a0c8-47aa-bf8f-2e053c0c5eff",
      email: "user_ef451051-a0c8-47aa-bf8f-2e053c0c5eff@example.com",
      created_at: "2024-06-17T19:35:00.072204-03:00",
      updated_at: "2024-06-17T19:35:00.072204-03:00"
    },
    {
      id: "0df9f400-dab7-468e-a418-65c0db452b73",
      name: "User_7cbd4393-7381-4896-bef0-aeac1fe4a77f",
      email: "user_7cbd4393-7381-4896-bef0-aeac1fe4a77f@example.com",
      created_at: "2024-06-17T19:35:00.073732-03:00",
      updated_at: "2024-06-17T19:35:00.073732-03:00"
    },
    {
      id: "9c6e2090-add2-4d0e-ac15-49fb5542ed01",
      name: "User_3c37aed9-72f1-4556-a2c5-e90381c0585e",
      email: "user_3c37aed9-72f1-4556-a2c5-e90381c0585e@example.com",
      created_at: "2024-06-17T19:35:00.075182-03:00",
      updated_at: "2024-06-17T19:35:00.075182-03:00"
    },
    {
      id: "ff2fcca4-7a00-4bf8-aaa8-67d6dc629f2d",
      name: "User_f1963cee-0a22-472d-a231-40cace790262",
      email: "user_f1963cee-0a22-472d-a231-40cace790262@example.com",
      created_at: "2024-06-17T19:35:00.076552-03:00",
      updated_at: "2024-06-17T19:35:00.076552-03:00"
    },
    {
      id: "25ed1b96-d3b6-41f5-ba24-16c07e9ac84c",
      name: "User_8338ef61-50ac-4aa2-8c93-68473bd5e922",
      email: "user_8338ef61-50ac-4aa2-8c93-68473bd5e922@example.com",
      created_at: "2024-06-17T19:35:00.078003-03:00",
      updated_at: "2024-06-17T19:35:00.078003-03:00"
    },
    {
      id: "19f86697-01b3-4731-9d6d-2bf212bb3aae",
      name: "User_cec130b3-577e-418d-a623-144ba19cde4c",
      email: "user_cec130b3-577e-418d-a623-144ba19cde4c@example.com",
      created_at: "2024-06-17T19:35:00.079394-03:00",
      updated_at: "2024-06-17T19:35:00.079394-03:00"
    },
    {
      id: "ee2a2fcd-abf9-4233-b963-f5bc0ef945e0",
      name: "User_ef634315-df85-4405-b11e-25831365216c",
      email: "user_ef634315-df85-4405-b11e-25831365216c@example.com",
      created_at: "2024-06-17T19:35:00.08064-03:00",
      updated_at: "2024-06-17T19:35:00.08064-03:00"
    },
    {
      id: "e033c7dd-7e66-42a0-b5ec-519710689bc7",
      name: "User_50a946f7-5f6a-48d6-94bc-643b7b284e69",
      email: "user_50a946f7-5f6a-48d6-94bc-643b7b284e69@example.com",
      created_at: "2024-06-17T19:35:00.081805-03:00",
      updated_at: "2024-06-17T19:35:00.081805-03:00"
    },
    {
      id: "c1b8a4a0-d3fd-4ee1-8c45-35d42702b390",
      name: "User_1ca358b5-7c28-497a-8e49-445b43e9f144",
      email: "user_1ca358b5-7c28-497a-8e49-445b43e9f144@example.com",
      created_at: "2024-06-17T19:35:00.083133-03:00",
      updated_at: "2024-06-17T19:35:00.083133-03:00"
    },
  ])
);

export const getAlbumsByUserId = jest.fn(() =>
  Promise.resolve([{ id: "1", title: "Album 1" }, { id: "2", title: "Album 2" }])
);

export const getPostsByUserId = jest.fn(() =>
  Promise.resolve([{ id: "1", title: "Post 1" }, { id: "2", title: "Post 2" }])
);
