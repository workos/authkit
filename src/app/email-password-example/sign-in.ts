'use server';

export async function signIn(formData: FormData) {
  console.log(Object.fromEntries(formData.entries()));
}
