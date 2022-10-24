import { Router } from "express";
import * as R from "ramda";
import { nanoid } from "nanoid";

const router = Router();

const randomId = nanoid;

// MODEL
let db = {
  users: [{ id: randomId() }, { id: randomId() }],
};

// HELPERS
const getUser = (users, userId) => users.find(({ id }) => id === userId);
const addUser = (users, user) => [...users, user];
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
    console.log(user);
    db.users = addUser(db.users, user);
    res.status(201).json(user.id);
  });

router
  .route("/users/:id")
  .get((req, res) => {
    const { id } = req.params;
    const user = getUser(db.users, Number(id));
    console.log(user);
    res.json(user);
  })
  .delete((req, res) => {
    const { id } = req.params;
    db.users = deleteUser(db.users, Number(id));
    res.json(id);
  });
// .patch()

export default router;
