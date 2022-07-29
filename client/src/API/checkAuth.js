export default async function checkAuth() {
  try {
    const res = await fetch('http://localhost:5000/checkAuth', {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return res.status === 200;
  } catch (error) {
    console.log(error);
  }
}
