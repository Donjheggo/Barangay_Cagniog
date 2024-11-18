"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetResidents(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("residents")
      .select(`*, purok_id (name)`)
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

export async function CreateResident(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("residents")
      .insert({
        name: formData.get("name"),
        purok_id: formData.get("purok_id"),
        gender: formData.get("gender"),
        birthdate: formData.get("birthdate"),
        years_of_residency: formData.get("years_of_residency"),
        religion: formData.get("religion"),
        income: formData.get("income"),
        place_of_birth: formData.get("birthdate"),
      })
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/appointments");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetResidentById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("residents")
      .select(`*, purok_id(id,name)`)
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

export async function UpdateResident(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("residents")
      .update({
        name: formData.get("name"),
        purok_id: formData.get("purok_id"),
        gender: formData.get("gender"),
        birthdate: formData.get("birthdate"),
        years_of_residency: formData.get("years_of_residency"),
        religion: formData.get("religion"),
        income: formData.get("income"),
        place_of_birth: formData.get("birthdate"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/residents");
    revalidatePath("/dashboard/residents");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteResident(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("residents").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/residents");
    revalidatePath("/dashboard/residents");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalResidents() {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("residents").select("*");

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

export async function GetAllResidents() {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("residents").select("*");

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
