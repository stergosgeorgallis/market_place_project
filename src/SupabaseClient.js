import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY,
);


export async function getAllSmartphones() {
    const { data, error } = await supabase
      .from("smartphones")
      .select("*");
  
    console.log(data);
    if (error) throw error;
    return data;
  }

  export async function getAllAccessories() {
    const { data, error } = await supabase
      .from("accessories_air")
      .select("*");
  
    console.log(data);
    if (error) throw error;
    return data;
  }
  
  export async function updateHoard(tableName, uuid) {
    const { data, error } = await supabase
      .from(tableName)
      .update({ hoard: supabase.rpc('decrement') })
      .eq("uuid", uuid)
      .select();
  
    console.log("Updated hoard successfully:", data);
    if (error) throw error;
    return data[0];
  }