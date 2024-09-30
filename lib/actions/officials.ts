"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetOfficials(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("officials")
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

export async function CreateOfficial(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("officials")
      .insert({
        name: formData.get("name"),
        position: formData.get("position"),
      })
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/officials");
    revalidatePath("/dashboard/officials");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetOfficialById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("officials")
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

export async function UpdateOfficial(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("officials")
      .update({
        name: formData.get("name"),
        position: formData.get("position"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/officials");
    revalidatePath("/dashboard/officials");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteOfficial(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("officials").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/officials");
    revalidatePath("/dashboard/officials");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalOfficial() {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("officials").select("*");

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