import supabase from "./supabase";

export async function getCabins() {
  try {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error getting cabins data", error);
    throw new Error(error.message || "Cabins data is not available");
  }
}

export async function deleteCabin(id) {
  try {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
      // Explicitly throw an error to be caught below
      throw error;
    }
    return data;
  } catch (err) {
    // Log the actual error and rethrow it to ensure it can be caught appropriately by the caller
    console.error("Error deleting cabin:", err);
    throw new Error(err.message || "Cabins could not be deleted!");
  }
}

export async function createCabin(newCabin) {
  console.log(newCabin);
  try {
    const { data, error } = await supabase.from("cabins").insert([newCabin]);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error inserting INTO cabins", error);
    throw new Error(error.message || "new cabins could not be inserted");
  }
}
