// utils/supabaseHelper.js
import supabase from "./supabaseClient";

export const fetchDataFromSupabase = async (
  table,
  filters = {},
  columns = "*"
) => {
  try {
    let query = supabase.from(table).select(columns);

    // Apply filters dynamically
    Object.keys(filters).forEach((key) => {
      const { operator, value } = filters[key];
      if (query[operator]) {
        query = query[operator](key, value);
      }
    });

    const { data, error, loading } = await query;
    if (error) {
      console.error(`Error fetching data from ${table}:`, error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error in fetchDataFromSupabase:", error);
    throw error;
  }
};
