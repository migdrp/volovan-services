///<reference path="../types/types.d.ts" />


import { UploadApiResponse, UploadStream, v2 as cloudinary } from 'cloudinary';
import { createReadStream } from 'streamifier';
import { Logger } from '.';
import QRCode from 'qrcode'


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
      const folder = `Volovan Productions/Tickets/${process.env.NODE_ENV === 'production' ? eventName : `dev/${eventName}`}`;
      log.debug('Images saving in folder : ', folder)
      const uploadStream = cloudinary.uploader.upload_stream({
        folder: `Volovan Productions/Tickets/${process.env.NODE_ENV === 'production' ? eventName : `dev/${eventName}`}`
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

