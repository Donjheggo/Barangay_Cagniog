"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetAllPuroks() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("puroks").select("*");

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function GetPuroks(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("puroks")
      .select("*")
      .order("name", { ascending: true })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("name", `%${searchQuery}%`)
      : await query;

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function CreatePurok(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("puroks")
      .insert({
        name: formData.get("name"),
      })
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/puroks");
    revalidatePath("/dashboard/puroks");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetPurokById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("puroks")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return false;
    }
    return data;
  } catch (error) {
    return false;
  }
}

export async function UpdatePurok(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("puroks")
      .update({
        name: formData.get("name"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/puroks");
    revalidatePath("/dashboard/puroks");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeletePurok(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("puroks").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/puroks");
    revalidatePath("/dashboard/puroks");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalPuroks() {
  try {
    const supabase = createClient();
    const { error, data } = await supabase.from("puroks").select("*");

    if (error) {
      console.error(error);
      return 0;
    }
    return data.length || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
