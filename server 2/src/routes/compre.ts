import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import { resolve, extname } from "path";
import { randomUUID } from "crypto";
import fs from "fs/promises";
ffmpeg.setFfmpegPath(ffmpegPath.path);
import hbjs from "handbrake-js";

export async function compre(job: any) {
  try {
    const [c, d] = job.path.split("uploads/");
    const random = randomUUID();

    fs.stat(`${resolve("uploads", d)}`).then((stats) => {
      console.log(stats);
    });

    const t = hbjs
      .spawn({
        input: `${resolve("uploads", d)}`,
        output: `${resolve(
          "uploads",
          "b6362a9b-0627-4cc7-b493-1f9297093d0e.mp4"
        )}`,
      })
      .on("error", (err) => {
        console.error("Compression error:", err);
      })
      .on("progress", (progress) => {
        console.log(`Compressing: ${progress.percentComplete}%`);
      })
      .on("complete", () => {
        console.log("Compression completed successfully.");
      });
  } catch (error) {
    console.log("error catch");

    console.log(error);
  }
}
