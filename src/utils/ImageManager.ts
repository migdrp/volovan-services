///<reference path="../types/types.d.ts" />


import { UploadApiResponse, UploadStream, v2 as cloudinary } from 'cloudinary';
import { PassThrough } from 'stream';
import { createReadStream } from 'streamifier';
import { Logger } from '.';
import QRCode from 'qrcode'
import fs from 'fs';


const log = new Logger('Image Manager Util');


export class ImageManager {


  static getImageCloud() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true
    });

    return cloudinary;
  }


  static async uploadQrTicketImage(eventName: string, ticketId: string): Promise<UploadApiResponse> {

    return new Promise(async (resolve, reject) => {
      const cloudinary = ImageManager.getImageCloud();

      const qr = await ImageManager.generateQR(ticketId);

      const uploadStream = cloudinary.uploader.upload_stream({
        folder: `Volovan Productions/Tickets/${eventName}`
      }, (error, result) => {
        if (error) {
          reject(new Error(error.message));
        } else {
          resolve(result);
        }
      });

      createReadStream(qr).pipe(uploadStream);
    });
  }


  static async generateQR(text: string) {
    try {
      let code = await QRCode.toBuffer(text)
      return code;
    } catch (err) {
      throw err;
    }
  }





}

