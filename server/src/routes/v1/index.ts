import express, { type Router } from 'express';
import { tasks } from './task.js';

export const v1: Router = express.Router();

v1.use('/tasks', tasks);
