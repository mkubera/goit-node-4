import { Router } from "express";
import * as R from "ramda";
import { nanoid } from "nanoid";

const router = Router();

const randomId = nanoid;

// MODEL
let db = {
  users: [
    { id: randomId(), name: "Hello world" },
    { id: randomId(), name: "Hello earth" },
  ],
};
console.log(db.users);

// HELPERS
const getUser = (users, userId) => users.find(({ id }) => id === userId);
const addUser = (users, user) => [...users, user];
const patchUser = (users, userId, newProps) =>
  users.map((u) => (u.id === userId ? { ...u, ...newProps } : u));
const deleteUser = (users, userId) => users.filter(({ id }) => id !== userId);

// ROUTES
router
  .route("/users")
  .get((req, res) => {
    const { limit } = req.query;
    const users = R.take(limit)(db.users);
    res.json(users);
  })
  .post((req, res) => {
    const user = { ...req.body, id: randomId() };
    db.users = addUser(db.users, user);
    res.status(201).json(user.id);
  });

router
  .route("/users/:id")
  .get((req, res) => {
    const { id } = req.params;
    const user = getUser(db.users, id);
    res.json(user);
  })
  .patch((req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.users = patchUser(db.users, id, { name });
    res.json(id);
  })
  .delete((req, res) => {
    const { id } = req.params;
    db.users = deleteUser(db.users, id);
    res.json(id);
  });

router.get("/users/:id/status", (req, res) => {
  const dummyUserStatus = "everything is ok!";
  res.json({ userId: Number(req.params.id), status: dummyUserStatus });
});
export default router;
