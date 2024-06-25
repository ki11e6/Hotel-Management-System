import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  try {
    const { data, error } = await supabase.from('cabins').select('*');
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error getting cabins data', error);
    throw new Error(error.message || 'Cabins data is not available');
  }
}

export async function deleteCabin(id) {
  try {
    const { data, error } = await supabase.from('cabins').delete().eq('id', id);
    if (error) {
      // Explicitly throw an error to be caught below
      throw error;
    }
    return data;
  } catch (err) {
    // Log the actual error and rethrow it to ensure it can be caught appropriately by the caller
    console.error('Error deleting cabin:', err);
    throw new Error(err.message || 'Cabins could not be deleted!');
  }
}

export async function createEditCabin(newCabin, id) {
  //https://nnkvyrvvnsajaqqpftru.supabase.co/storage/v1/object/public/cabins/cabin-001.jpg
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  try {
    let query = supabase.from('cabins');
    //create new Cabin
    if (!id) {
      query = query.insert([{ ...newCabin, image: imagePath }]);
    }
    //edit existing cabin
    if (id) {
      query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
    }

    const { data, error } = await query.select();

    if (error) throw error;

    //upload image

    if (!hasImagePath) {
      const { error: storageError } = await supabase.storage
        .from('cabins')
        .upload(imageName, newCabin.image);

      if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id);
        throw new Error(
          'Cabin image could not be uploaded and the cabin was not created'
        );
      }
    }

    return data;
  } catch (error) {
    console.error('Error inserting INTO cabins', error);
    throw new Error(error.message || 'new cabins could not be inserted');
  }
}
