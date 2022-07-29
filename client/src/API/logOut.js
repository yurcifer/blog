export default async function logOut() {
  try {
    const res = await fetch('http://localhost:5000/sessionLogout', {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}