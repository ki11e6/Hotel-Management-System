import supabase from './supabase';
export const emailLogin = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing in', error);
    throw new Error(error.message || 'Invalid username or password!');
  }
};

export const googleLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
    console.log('google data', data);
    return data;
  } catch (error) {
    console.error('Error auth signing in', error);
    throw new Error(error.message || 'Google Auth login failed!');
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session.session) return null;

    const { data, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    return data?.user;
  } catch (error) {
    console.error('Error getting current user', error);
    throw new Error(error.message || 'Could not get current user');
  }
};
