import { Application } from "express";
import multer from 'multer';
import cors from 'cors';
import express from 'express';

export const appConfig = (app: Application) => {
    app.use(cors());
    app.use(express.urlencoded({extended: true}))
    app.use(express.json());
    app.use(multer().none());
}