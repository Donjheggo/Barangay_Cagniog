"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetAppointments(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("appointments")
      .select(`*, user_id(email), resident_id(name), service_id(name)`)
      .order("created_at", { ascending: false })
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

export async function CreateAppointment(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("appointments")
      .insert({
        user_id: formData.get("user_id"),
        resident_id: formData.get("resident_id"),
        service_id: formData.get("service_id"),
        date: formData.get("date"),
        payment_method: formData.get("payment_method"),
        gcash_reference_number: formData.get("gcash_reference_number"),
        status: "PENDING",
      })
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/appointments");
    revalidatePath("/dashboard/appointments");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalAppointments() {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("appointments").select("*");

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

export async function GetAppointmentById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("appointments")
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

export async function UpdateAppointment(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("appointments")
      .update({
        status: formData.get("status"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/appointments");
    revalidatePath("/dashboard/appointments");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetMyAppointments(user_id: string) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("appointments")
      .select(`*, resident_id(name), service_id(*)`)
      .eq("user_id", user_id);

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

export async function DeleteAppointment(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("appointments").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/appointments");
    revalidatePath("/dashboard/appointments");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}
