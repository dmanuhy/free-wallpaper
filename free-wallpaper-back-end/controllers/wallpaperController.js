const db = require("../models");
const User = require("../models/user");
const Album = require("../models/album");
const { WallpaperService } = require("../services");
const cloudinary = require("cloudinary").v2;
const nodemailer = require("nodemailer");
const getWallpapers = async (req, res) => {
  const page = req.query.page ? req.query.page : "1";
  const order = req.query.order ? req.query.order : "createdAt";
  const priority = req.query.priority ? req.query.priority : "DESC";

  try {
    const serviceResponse = await WallpaperService.getAllWallpaperService(page, order, priority);
    return res.status(200).json(serviceResponse);
  } catch (error) {
    console.log(error);
  }
};

const Wallpaper = require("../models/wallpaper");
const Tag = require("../models/tag");
async function CreateNewWallpaper(req, res, next) {
  try {
    const files = req.files;
    const { fromAlbum, createdBy } = req.body;

    const savedWallpapers = await Promise.all(
      files.map(async (file) => {
        const newWallpaper = new Wallpaper({
          imageUrl: file.path,
          fromAlbum,
          publicId: file.filename,
          createdBy,
          likes: 0,
          comments: [],
        });
        return await newWallpaper.save();
      })
    );
    const wallpaperIds = savedWallpapers.map((wallpaper) => wallpaper._id);
    await Album.findByIdAndUpdate(fromAlbum, { $push: { wallpapers: { $each: wallpaperIds } } });
    return res.status(201).json({ message: "Tạo thành công", wallpapers: savedWallpapers });
  } catch (error) {
    next(error);
  }
}

const deleteOneImage = async (req, res, next) => {
  try {
    const { wid } = req.params;


    const wallpaper = await Wallpaper.findById(wid);
    if (!wallpaper) {
      return res.status(404).json({ message: "Wallpaper not found" });
    }
    await Wallpaper.deleteOne({ _id: wid });
    await cloudinary.uploader.destroy(wallpaper.publicId);
    await Album.findByIdAndUpdate(wallpaper.fromAlbum, { $pull: { wallpapers: wid } });

    res.status(200).json({ message: "Wallpaper deleted successfully" });

  } catch (error) {

    next(error);
  }
};

const deleteManyImageAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing albumId in query parameters" });
    }

    // Tìm các ảnh trong album có id là `id`
    const wallpapers = await Wallpaper.find({ fromAlbum: id });

    // Lấy ra publicId của các ảnh
    const publicIds = wallpapers.map((wallpaper) => wallpaper.publicId);

    // Xóa từng ảnh khỏi Cloudinary
    const deletePromises = publicIds.map((publicId) => cloudinary.uploader.destroy(publicId));
    await Promise.all(deletePromises);

    // Xóa tất cả ảnh khỏi MongoDB
    await Wallpaper.deleteMany({ fromAlbum: id });

    // Trả về phản hồi thành công
    return res.status(200).json({ message: "Deleted images from album successfully" });
  } catch (error) {
    console.error(`Failed to delete images with public_ids`, error);
    return res.status(500).json({ error: "Failed to delete images from album", details: error.message });
  }
};

const getWallpapersByAuthor = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = req.query.page ? req.query.page : "1";
    const order = req.query.order ? req.query.order : "updatedAt";
    const priority = req.query.priority ? req.query.priority : "DESC";
    try {
      const serviceResponse = await WallpaperService.getAllWallpaperByAuthorService(userId, page, order, priority);
      return res.status(200).json(serviceResponse);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

const getWallpapersByAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const page = req.query.page ? req.query.page : "1";
    const order = req.query.order ? req.query.order : "updatedAt";
    const priority = req.query.priority ? req.query.priority : "DESC";
    try {
      const serviceResponse = await WallpaperService.getAllWallpaperByAlbumService(albumId, page, order, priority);
      return res.status(200).json(serviceResponse);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

const getWallpaperByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(422).json({
        message: "Id not found",
      });
    } else {
      const serviceResponse = await WallpaperService.getWallpaperByIDService(id);
      return res.status(200).json(serviceResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

const addWallpaperComment = async (req, res) => {
  try {
    const { wallpaperID, commentID, body, userID } = req.body;
    if (!wallpaperID || !body || !userID) {
      return res.status(422).json({
        status: res.statusCode,
        message: "Cannot access data",
      });
    } else {
      const serviceResponse = await WallpaperService.addWallpaperCommentService(req.body);
      return res.status(200).json(serviceResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

//Like ảnh
const likeWallpaper = async (req, res) => {
  try {
    const wallpaperId = req.params.id;
    const wallpaper = await Wallpaper.findById(wallpaperId);

    if (!wallpaper) {
      return res.status(404).json({ message: "Wallpaper not found" });
    }

    wallpaper.likes += 1;
    await wallpaper.save();

    res.status(200).json({ message: "Wallpaper liked successfully", likes: wallpaper.likes });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const reportWallpaper = async (req, res) => {
  try {
    const reason = req.body.reason;
    const wallpaperId = req.params.id;
    const userId = req.user._id;

    if (!wallpaperId || !reason || !userId) {
      return res.status(422).json({
        status: res.statusCode,
        message: "Not enough information",
      });
    } else {
      const data = {
        reason,
        userId,
        wallpaperId,
      };
      const serviceResponse = await WallpaperService.reportWallpaperService(data);
      return res.status(200).json(serviceResponse);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const getWallpaperByKey = async (req, res) => {

  const { key } = req.params;
  if (!key) {
    return res.status(404).json({
      message: "Not found data"
    });
  }

  try {
    const serviceResponse = await WallpaperService.getWallpaperByKeyService(key)
    return res.status(200).json(serviceResponse);
  } catch (error) {
    console.log(error);
  }
};

const shareWallpaper = async (req, res) => {
  try {
    const { wallpaperID, email } = req.body;

    const wallpaper = await Wallpaper.findById(wallpaperID);
    if (!wallpaper) {
      return res.status(404).json({ message: 'Album not found' });
    }

    // Check if user exists

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "minhvhhe170320@fpt.edu.vn",
        // pass: "bbzjwgtpfpwpuovb",
        // user: testAccount.user,
        pass: "rbwj eril yswz hxzw",
      },
    });
    const info = await transporter.sendMail({
      from: `"FreeWallPapper 👻" <minhvhhe170320@fpt.edu.vn>`, // sender address
      to: email, // list of receivers

      subject: "Check Out This New Wallpapper on FreeWallPapper!", // Subject line
      text: `Hello,
Your friend  has shared a photo with you on FreeWallPapper!
Click the link below to view the detail photo:
http://localhost:3000/wallpaper/${wallpaperID}

Best regards,
The FreeWallPapper Team

P.S. If you did not expect to receive this email, please ignore it.

© 2024 FreeWallPapper. All rights reserved.`, // plain text body
      html: `<p>Hello,</p>
                   <p>Your friend <strong></strong> has shared a photo album with you on FreeWallPapper!</p>
                   <p>Click the link below to view the Photo:</p>
                   <p><a href="http://localhost:3000/wallpaper/${wallpaperID}">View Phooto</a></p>
                   <p><img src="${wallpaper.imageUrl}" alt="Wallpaper Image" style="width:100%;max-width:600px;"></p>
                   <p>Best regards,<br>The FreeWallPapper Team</p>
                   <p>P.S. If you did not expect to receive this email, please ignore it.</p>
                   <p>© 2024 FreeWallPapper. All rights reserved.</p>`, // html body
    });
    res.status(200).json(wallpaper);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
const EditTagWallpaper = async (req, res) => {
  const { id } = req.params;
  const { tags, des } = req.body;

  try {
    const existingTags = await Tag.find({ name: { $in: tags } }).exec();

    // Get the names of the existing tags
    const existingTagNames = existingTags.map(tag => tag.name);

    // Filter out tags that already exist
    const newTags = tags.filter(tag => !existingTagNames.includes(tag));

    // Create new tag documents
    const newTagDocs = newTags.map(tag => ({ name: tag }));

    // Insert new tags into the database
    if (newTagDocs.length > 0) {
      await Tag.insertMany(newTagDocs);
    }
    const updatedWallpaper = await Wallpaper.findByIdAndUpdate(
      id,
      { $set: { tags: tags, description: des } },
    );

    if (!updatedWallpaper) {
      return res.status(404).send('Wallpaper not found');
    }

    res.json(updatedWallpaper);
  } catch (error) {
    res.status(500).send('Server error');
  }

};

module.exports = {
  getWallpapers,
  CreateNewWallpaper,
  getWallpapersByAuthor,
  getWallpapersByAlbum,
  getWallpaperByID,
  deleteManyImageAlbum,
  addWallpaperComment,
  likeWallpaper,
  reportWallpaper,
  getWallpaperByKey,
  shareWallpaper,
  deleteOneImage,
  EditTagWallpaper
};
