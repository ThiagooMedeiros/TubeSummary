import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    console.log("realizando download: ", videoId)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        if (seconds > 60) {
          throw new Error("A duração do vídeo é maior do que 60 segundos")
        }
      })
      .on("end", () => {
        console.log("Download Finalizado.")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "Não foi possível realizar o download do vídeo. Detalhes:",
          error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
