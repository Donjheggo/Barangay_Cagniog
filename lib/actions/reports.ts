"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetReports(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("reports")
      .select(`*, user_id (email), resident_id(*)`)
      .order("created_at", { ascending: true })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("message", `%${searchQuery}%`)
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

export async function CreateReport(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("reports")
      .insert({
        user_id: formData.get("user_id"),
        reason: formData.get("reason"),
        resident_id: formData.get("resident_id"),
      })
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/reports");
    revalidatePath("/dashboard/reports");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetReportById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("reports")
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

export async function UpdateReport(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("reports")
      .update({
        status: formData.get("status"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/reports");
    revalidatePath("/dashboard/reports");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteReport(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("reports").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/reports");
    revalidatePath("/dashboard/reports");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalReports() {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("reports").select("*");

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

export async function GetMyReports(user_id: string) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("reports")
      .select(`*, resident_id(*)`)
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

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
