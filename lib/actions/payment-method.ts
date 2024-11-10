"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetGcashNumber() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("gcash_number").select("*");

    if (error) {
      return { error: error.message };
    }

    return data[0] || 0;
  } catch (error) {
    return { error: error };
  }
}

export async function CreateGcashNumber(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("gcash_number")
      .insert([
        {
          number: formData.get("number"),
        },
      ])
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/dashboard/gcash");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetGcashById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("gcash_number")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error.message);
      return false;
    }

    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function UpdateGcashNumber(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("gcash_number")
      .update({
        number: formData.get("number"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/dashboard/gcash");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}
