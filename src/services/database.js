import axios from "axios";

export const login = (usuario, senha) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/login`, {
    usuario,
    senha
  })
}

export const listagem = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/lista/produtos`)
}

export const detalhes = (id, token) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/admin/produto?id=${id}`,
    {
      headers: {
        Authorization: token
      }
    }
  )
}

export const adicionar = (produto, token) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/admin/produtos`,
    produto,
    {
      headers: {
        Authorization: token
      }
    }
  )
}

export const editar = (produto, token) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/admin/produtos`,
    produto,
    {
      headers: {
        Authorization: token
      }
    }
  )
}

export const apagar = (id, token) => {
  return axios.delete(
    `${process.env.REACT_APP_API_URL}/admin/produtos`,
    {
      params: {
        id
      },
      headers: {
        Authorization: token
      }
    }
  )
}