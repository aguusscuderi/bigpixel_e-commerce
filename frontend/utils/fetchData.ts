import { config } from '../config/index'

// const baseUrl = process.env.BASE_URL;
const baseUrl = config.SERVER_ROOT

// export const getAuth = async (url, header) => {
//   const res = await fetch(`${baseUrl}/api/${url}`, {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         //'x-access-token': header.accessToken,
//         'x-refresh-token': header.refreshToken
//     }, 
//   })
//   const data = await res.json()
//   return data
// }

// export const getData = async (url:string, token?: string) => {
//   const res = await fetch(`${baseUrl}/api/${url}`, {
//     method: 'GET',
//     headers: {
//         'Authorization': token
//     }, 
//   })
//   const data = await res.json()
//   return data
// }

export const postData = async (url: string, post: any, token?: string) => {
  const headers: HeadersInit = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Bearer ' + token);

  const res = await fetch(`${baseUrl}/api/${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(post)
  })

  const data = await res.json()
  return data
}



// export const putData = async (url, post, token) => {
//   const res = await fetch(`${baseUrl}/api/${url}`, {
//       method: 'PUT',
//       headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//       },
//       body: JSON.stringify(post)
//   })

//   const data = await res.json()
//   return data
// }

// export const patchData = async (url, post, token) => {
//   const res = await fetch(`${baseUrl}/api/${url}`, {
//       method: 'PATCH',
//       headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//       },
//       body: JSON.stringify(post)
//   })

//   const data = await res.json()
//   return data
// }


// export const deleteData = async (url, token) => {
//   const res = await fetch(`${baseUrl}/api/${url}`, {
//       method: 'DELETE',
//       headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//       }
//   })

//   const data = await res.json()
//   return data
// }
