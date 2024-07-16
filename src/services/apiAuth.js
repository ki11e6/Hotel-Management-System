import supabase, { supabaseUrl } from './supabase';
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

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error logging out', error);
    throw new Error(error.message || 'Could not log out');
  }
};

export const signup = async ({ fullName, email, password }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          fullName,
          avatar: '',
        },
      },
    });
    if (error) throw error;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error signing in', error);
    throw new Error(error.message || 'Invalid username or password!');
  }
};

//avatar url:https://nnkvyrvvnsajaqqpftru.supabase.co/storage/v1/object/public/avatars/default_user.jpg

export const updateCurrentUser = async ({ password, fullName, avatar }) => {
  try {
    let updateData;
    if (password) updateData = { password };
    if (fullName) updateData = { data: { fullName } };
    const { data, error } = await supabase.auth.updateUser(updateData);
    if (error) throw error;
    if (!avatar) return data;
    //upload avatar
    const fileName = `avatar-${data.user.id}-${Math.random()}`;
    const { error: storageError } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatar);
    if (storageError) throw storageError;
    //update avatar
    const { data: updatedUser, error: updatedError } =
      await supabase.auth.updateUser({
        data: {
          avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
        },
      });
    if (updatedError) throw updatedError;
    return updatedUser;
  } catch (error) {
    console.error('Error updating user', error);
    throw new Error(error.message || 'Could not update user');
  }
};
