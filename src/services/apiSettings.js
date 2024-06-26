import supabase from './supabase';

export async function getSettings() {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error while getting settings info', error);
    throw new Error(error.message || 'Settings could not be loaded');
  }
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  try {
    const { data, error } = await supabase
      .from('settings')
      .update(newSetting)
      // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
      .eq('id', 1)
      .single();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error while updating settings info', error);
    throw new Error(error.message || 'Settings could not be updated');
  }
}
