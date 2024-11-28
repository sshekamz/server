import { UrlModel } from "../model/shortUrl";
import express from "express";

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { fullUrl } = req.body;
    const urlFound = await UrlModel.find({ fullUrl: fullUrl });
    if (urlFound.length > 0) {
      res.status(409).json({ message: "Url already exists", urlFound });
    } else {
      const shortUrl = await UrlModel.create({ fullUrl });

      res.status(201).json({ messagge: "shortUrl Created" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
export const getAllUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrls = await UrlModel.find();
    if (shortUrls.length <= 0) {
      res.status(404).json({ message: "No Urls found" });
    } else [res.status(200).json({ message: "Urls found", shortUrls })];
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrl = await UrlModel.findOne({ shortUrl: req.params.id });
    console.log(shortUrl)
    if (!shortUrl) {
      res.status(404).json({ message: "Url not found" });
    } else {
        shortUrl.clicks++;
        await shortUrl.save();
        res.redirect(shortUrl.fullUrl);
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong in getting URl" });
  }
};
export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrl = await UrlModel.findByIdAndDelete({_id:req.params.id});
    if(shortUrl){
        res.status(200).json({message:"Url deleted successfully"})
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong in getting URl" });
  }
};
