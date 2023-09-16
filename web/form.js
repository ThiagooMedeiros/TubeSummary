import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")

const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault() //tira a atualização da pag
  content.classList.add("placeholder")

  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Esse vídeo não parece ser um short.")
  }

  const [_, params] = videoURL.split("/shorts/") //divide o texto em duas partes 0 e 1
  const [shortID] = params.split("?si")

  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + shortID) //obriga esperar pq a função é async

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result, //segunda requisição
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
