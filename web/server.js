import axios from "axios" //conecta o front com o back

export const server = axios.create({
  baseURL: "http://localhost:3333", //parte do endereço q se repete pra tudo
})
