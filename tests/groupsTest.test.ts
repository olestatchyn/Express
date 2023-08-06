import request from 'supertest';
import app from '../server';
import Group from '../models/group';

const groups = [
  {
    id: '1',
    name: 'THEBEST',
    permissions: 'WRITE',
  },
  {
    id: '2',
    name: 'THEWORST',
    permissions: 'DELETE',
  },
  {
    id: '3',
    name: '-------',
    permissions: 'READ',
  },
];

describe('GET /groups', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should return all groups', async () => {
    Group.findAll = jest.fn().mockResolvedValue(groups);

    const response = await request(app).get('/groups/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(groups);
    });
});

// describe('GET /groups/:id', () => {

//   afterEach(() => {
//     jest.clearAllMocks();
//   });
  
//   it('should return the group if found', async () => {
//     const groupId = '1';

//     const response = await request(app).get(`/groups/${groupId}`);
//     expect(response.status).toBe(200);
//     expect(response.body[0]).toEqual(groups[0]);
//   });

//   it('should return message if the group is not found', async () => {
//     const groupId = '555';

//     const response = await request(app).get(`/groups/${groupId}`);
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({});
//     expect(response.text).toBe(`Group with the ID ${groupId} not found`);
//   });
// });

// describe('POST /groups', () => {

//   afterEach(() => {
//     jest.clearAllMocks();
//   });
  
//   it('should create a group', async () => {
//     (Group.findAll as jest.Mock).mockResolvedValueOnce(groups);
//     const newGroup = {
//       name: 'Test Group----------------------',
//       permissions: 'WRITE',
//     };

//     const response = await request(app).post('/groups').send(newGroup);

//     expect(response.status).toBe(200);
//     expect(response.text).toBe('New group added');
//   });

//   it('should return a message of invalid request', async () => {
//     (Group.findAll as jest.Mock).mockResolvedValueOnce(groups);
//     const newGroup = {

//     };
//     const response = await request(app).post('/groups').send(newGroup);
//     expect(response.status).toBe(200);
//     expect(response.text).toBe('Invalid request');
//   });
// });

// describe('PATCH /groups/:id', () => {

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should update group', async () => {
//     const groupIdToUpdate = '1';
//     const updatedGroupData = {
//       name: 'Updated Group',
//       permissions: 'WRITE',
//     };

//     const response = await request(app)
//       .patch(`/groups/${groupIdToUpdate}`)
//       .send(updatedGroupData);

//     expect(response.status).toBe(200);
//     expect(response.text).toBe(`Group with the ID ${groupIdToUpdate} was updated`);
//   });

//   it('should return a message of invalid request', async () => {
//     const groupIdToUpdate = '1';
//     const updatedGroupData = {
//       abcd: 'abcd',
//     };

//     const response = await request(app)
//       .patch(`/groups/${groupIdToUpdate}`)
//       .send(updatedGroupData);

//     expect(response.status).toBe(200);
//     expect(response.text).toBe('Invalid request');
//   });
// });

// describe('DELETE /groups/:id', () => {

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should delete group', async () => {
//     const groupIdToDelete = '1';
//     const response = await request(app).delete(`/groups/${groupIdToDelete}`)

//     expect(response.status).toBe(200);
//     expect(response.text).toBe(`Group with the ID ${groupIdToDelete} was destroyed`);
//   });

//   it('should return message if the group is not found', async () => {
//     const groupIdToDelete = '555';
//     const response = await request(app).delete(`/groups/${groupIdToDelete}`)

//     expect(response.status).toBe(200);
//     expect(response.text).toBe(`Group with the ID ${groupIdToDelete} not found`);
//   });
// });