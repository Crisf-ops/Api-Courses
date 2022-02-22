import { Application, Request, Response } from "express";

import CoursesData from "../../data/courses.json";
import { Courses } from "../../model/courseModel";

export const loadApiEndpoints = (app: Application): void => {
  app.get("/api/getCurses", (req: Request, res: Response) => {
    return res.status(200).send(CoursesData);
  });

  app.post("api/postCurses", (req: Request, res: Response) => {
    const itemId = CoursesData.data.map((res) => res.id);
    const newId = itemId.length > 0 ? Math.max.apply(Math, itemId) + 1 : 1;

    const newCourse = new Courses(
      newId,
      req.body.title,
      req.body.category,
      req.body.description,
      req.body.link,
      req.body.teachers
    );
    CoursesData.data.push(newCourse);
    res.status(201).json(newCourse);
  });

  app.put("api/putCurses/:id", (req: Request, res: Response) => {
    const itemCourse = CoursesData.data.find((item) => {
      return item.id === parseInt(req.params.id);
    });

    if (itemCourse) {
      const course = new Courses(
        itemCourse.id,
        typeof req.body.title != "undefined"
          ? req.body.title
          : itemCourse.title,
        typeof req.body.category != "undefined"
          ? req.body.category
          : itemCourse.category,
        typeof req.body.description != "undefined"
          ? req.body.description
          : itemCourse.description,
        typeof req.body.link != "undefined" ? req.body.link : itemCourse.link,
        typeof req.body.teachers != "undefined"
          ? req.body.teachers
          : itemCourse.teachers
      );

      const targetIndex = CoursesData.data.indexOf(itemCourse);
      CoursesData.data.splice(targetIndex, 1, course);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });

  app.delete("api/deleteCurses/:id", (req: Request, res: Response) => {
    const course = CoursesData.data.find((item) => {
      return item.id === parseInt(req.params.id);
    });

    if (course) {
      const targetIndex = CoursesData.data.indexOf(course);
      CoursesData.data.splice(targetIndex, 1);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};
