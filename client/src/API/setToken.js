export default async function setToken(idToken) {
  try {
    const res = await fetch('http://localhost:5000/sessionLogin', {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
